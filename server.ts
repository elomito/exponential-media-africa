import crypto from 'node:crypto';
import fs from 'node:fs';
import express, { type NextFunction, type Request, type RequestHandler, type Response } from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createServer as createViteServer } from 'vite';
import { z } from 'zod';
import { PUBLIC_ARTICLE_SLUGS, PUBLIC_WORK_SLUGS } from './src/data/sitemapSlugs.ts';
import { VERIFIED_CONTACT } from './src/data/seedData.ts';
import { getGeminiClient } from './src/lib/gemini.ts';
import { AuthorizationError, isRoleRecord, mayProvisionRole, mayRemoveActiveAdmin, resolveVerifiedPrincipal, roleAllows, type AppRole, type VerifiedPrincipal } from './src/lib/admin-auth.ts';
import { projectInquirySchema, sanitizePlainText } from './src/lib/validation.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const firebaseConfig = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'firebase-applet-config.json'), 'utf8')
) as { projectId: string; firestoreDatabaseId: string };
// Local emulator runs may override the demo project namespace; production keeps the configured values.
const firebaseProjectId = process.env.FIREBASE_PROJECT_ID?.trim() || firebaseConfig.projectId;
const firestoreDatabaseId = process.env.FIREBASE_FIRESTORE_DATABASE_ID?.trim() || firebaseConfig.firestoreDatabaseId;
const isProduction = process.env.NODE_ENV === 'production';
const PORT = 3000;
const INQUIRY_IDEMPOTENCY_TTL_MS = 7 * 24 * 60 * 60 * 1000;

const EMULATOR_PROJECT_ID = 'demo-exponential-local';
const EMULATOR_DATABASE_ID = '(default)';
const EMULATOR_AUTH_HOST = '127.0.0.1:9099';
const EMULATOR_FIRESTORE_HOST = '127.0.0.1:8080';
const emulatorMode =
  process.env.FIREBASE_EMULATOR_MODE === 'true' ||
  Boolean(process.env.FIREBASE_AUTH_EMULATOR_HOST) ||
  Boolean(process.env.FIRESTORE_EMULATOR_HOST) ||
  process.env.VITE_FIREBASE_USE_EMULATORS === 'true';

function assertEmulatorIsolation() {
  if (!emulatorMode) return;
  const expectedEnv: Array<[string, string | undefined, string]> = [
    ['FIREBASE_PROJECT_ID', process.env.FIREBASE_PROJECT_ID?.trim(), EMULATOR_PROJECT_ID],
    ['FIREBASE_FIRESTORE_DATABASE_ID', process.env.FIREBASE_FIRESTORE_DATABASE_ID?.trim(), EMULATOR_DATABASE_ID],
    ['FIREBASE_AUTH_EMULATOR_HOST', process.env.FIREBASE_AUTH_EMULATOR_HOST, EMULATOR_AUTH_HOST],
    ['FIRESTORE_EMULATOR_HOST', process.env.FIRESTORE_EMULATOR_HOST, EMULATOR_FIRESTORE_HOST],
    ['GCLOUD_PROJECT', process.env.GCLOUD_PROJECT, EMULATOR_PROJECT_ID],
    ['VITE_FIREBASE_USE_EMULATORS', process.env.VITE_FIREBASE_USE_EMULATORS, 'true'],
    ['VITE_FIREBASE_PROJECT_ID', process.env.VITE_FIREBASE_PROJECT_ID, EMULATOR_PROJECT_ID],
    ['VITE_FIREBASE_DATABASE_ID', process.env.VITE_FIREBASE_DATABASE_ID, EMULATOR_DATABASE_ID],
    ['VITE_FIREBASE_AUTH_EMULATOR_URL', process.env.VITE_FIREBASE_AUTH_EMULATOR_URL, `http://${EMULATOR_AUTH_HOST}`],
    ['VITE_FIREBASE_FIRESTORE_EMULATOR_HOST', process.env.VITE_FIREBASE_FIRESTORE_EMULATOR_HOST, '127.0.0.1'],
    ['VITE_FIREBASE_FIRESTORE_EMULATOR_PORT', process.env.VITE_FIREBASE_FIRESTORE_EMULATOR_PORT, '8080'],
  ];
  const problems = expectedEnv
    .filter(([, actual, expected]) => actual !== expected)
    .map(([name, actual, expected]) => `${name} must be "${expected}" but was "${actual ?? '(unset)'}"`);
  if (firebaseProjectId !== EMULATOR_PROJECT_ID) {
    problems.push(`resolved project ID must be "${EMULATOR_PROJECT_ID}" but was "${firebaseProjectId}"`);
  }
  if (firestoreDatabaseId !== EMULATOR_DATABASE_ID) {
    problems.push(`resolved Firestore database ID must be "${EMULATOR_DATABASE_ID}" but was "${firestoreDatabaseId}"`);
  }
  if (problems.length > 0) {
    throw new Error(`Refusing to start in emulator mode with unsafe Firebase configuration:\n- ${problems.join('\n- ')}`);
  }
  console.log(
    `[emulator] project=${firebaseProjectId} database=${firestoreDatabaseId} ` +
      `auth=${process.env.FIREBASE_AUTH_EMULATOR_HOST} firestore=${process.env.FIRESTORE_EMULATOR_HOST} ` +
      `viteProject=${process.env.VITE_FIREBASE_PROJECT_ID} viteDatabase=${process.env.VITE_FIREBASE_DATABASE_ID} ` +
      `viteEmulators=${process.env.VITE_FIREBASE_USE_EMULATORS}`,
  );
}

assertEmulatorIsolation();

interface RateEntry {
  count: number;
  resetAt: number;
}

type AuthenticatedRequest = Request & { verifiedPrincipal: VerifiedPrincipal };

const MAX_RATE_BUCKET_SIZE = 10_000;
const rateBuckets = new Map<string, RateEntry>();

// Periodically evict expired rate-limit entries to prevent unbounded memory growth
const cleanupTimer = setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of rateBuckets) {
    if (now > entry.resetAt) {
      rateBuckets.delete(key);
    }
  }
}, 5 * 60 * 1000);
cleanupTimer.unref();

function createRateLimiter(windowMs: number, maxRequests: number) {
  return (req: Request, res: Response, next: NextFunction) => {
    const ip = req.ip || req.socket.remoteAddress || 'unknown';
    const key = `${req.path}:${ip}`;
    const now = Date.now();
    const existing = rateBuckets.get(key);

    if (!existing || now > existing.resetAt) {
      if (rateBuckets.size >= MAX_RATE_BUCKET_SIZE) {
        for (const [oldKey, oldEntry] of rateBuckets) {
          if (now > oldEntry.resetAt) {
            rateBuckets.delete(oldKey);
          }
          if (rateBuckets.size < MAX_RATE_BUCKET_SIZE) break;
        }
        if (rateBuckets.size >= MAX_RATE_BUCKET_SIZE) {
          const oldestKey = rateBuckets.keys().next().value;
          if (oldestKey) rateBuckets.delete(oldestKey);
        }
      }
      rateBuckets.set(key, { count: 1, resetAt: now + windowMs });
      return next();
    }

    if (existing.count >= maxRequests) {
      res.setHeader('Retry-After', String(Math.max(1, Math.ceil((existing.resetAt - now) / 1000))));
      return res.status(429).json({
        error: 'Too many requests. Please wait a moment before trying again.',
      });
    }

    existing.count += 1;
    return next();
  };
}

function sameOriginApiGuard(req: Request, res: Response, next: NextFunction) {
  if (req.method === 'GET' || req.method === 'HEAD' || req.method === 'OPTIONS') {
    return next();
  }
  const origin = req.headers.origin;
  if (!origin) {
    return next();
  }
  try {
    const originHost = new URL(origin).host.toLowerCase();
    const reqHost = (req.get('host') || '').toLowerCase();
    let appHost = '';
    if (process.env.APP_URL) {
      try {
        appHost = new URL(process.env.APP_URL).host.toLowerCase();
      } catch {
        appHost = '';
      }
    }
    if (
      originHost === reqHost ||
      (appHost && originHost === appHost) ||
      originHost.startsWith('localhost:') ||
      originHost.startsWith('127.0.0.1:')
    ) {
      return next();
    }
    return res.status(403).json({ error: 'Cross-origin request rejected.' });
  } catch {
    return res.status(403).json({ error: 'Invalid request origin.' });
  }
}

function securityHeadersMiddleware(_req: Request, res: Response, next: NextFunction) {
  // Emulator runs must reach the local Auth/Firestore ports; production directives are unchanged.
  const emulatorOrigins =
    process.env.VITE_FIREBASE_USE_EMULATORS === 'true' || process.env.FIREBASE_AUTH_EMULATOR_HOST
      ? ' http://127.0.0.1:9099 http://localhost:9099 http://127.0.0.1:8080 http://localhost:8080 ws://127.0.0.1:8080 ws://localhost:8080'
      : '';
  // Vite injects an inline preamble and an HMR websocket in development only;
  // production keeps the hash-pinned, inline-free policy. A hash makes
  // 'unsafe-inline' inert, so the two forms must be exclusive.
  const scriptPolicy = isProduction
    ? "'self' 'sha256-gNL3A4G1b0XdmeXJhZR94Yj1NDSANE7XW/RrnVk0jVY=' https://apis.google.com https://www.gstatic.com https://www.google.com/recaptcha/ https://maps.googleapis.com https://maps.gstatic.com"
    : "'self' 'unsafe-inline' https://apis.google.com https://www.gstatic.com https://www.google.com/recaptcha/ https://maps.googleapis.com https://maps.gstatic.com";
  const devConnectOrigins = isProduction ? '' : ' ws://127.0.0.1:* ws://localhost:*';
  const emulatorFrameOrigins = emulatorOrigins
    ? ' http://127.0.0.1:9099 http://localhost:9099'
    : '';
  const cspDirectives = [
    "default-src 'self'",
    `script-src ${scriptPolicy}`,
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' https://fonts.gstatic.com data:",
    "img-src 'self' data: blob: https://*.googleusercontent.com https://*.firebasestorage.app https://firebasestorage.googleapis.com https://maps.googleapis.com https://maps.gstatic.com https://*.ggpht.com",
    `connect-src 'self' https://*.googleapis.com https://*.firebaseio.com https://*.firebaseapp.com https://*.gstatic.com https://www.google.com/recaptcha/ https://firestore.googleapis.com https://identitytoolkit.googleapis.com https://securetoken.googleapis.com https://maps.googleapis.com https://places.googleapis.com wss:${emulatorOrigins}${devConnectOrigins}`,
    `frame-src 'self' https://*.firebaseapp.com https://accounts.google.com https://www.google.com/recaptcha/${emulatorFrameOrigins}`,
    "frame-ancestors 'self' https://aistudio.google.com https://*.google.com https://*.googleusercontent.com",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
  ];

  res.setHeader('Content-Security-Policy', cspDirectives.join('; '));
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Cross-Origin-Opener-Policy', 'same-origin-allow-popups');
  res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  if (isProduction) {
    res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  }
  res.removeHeader('X-Powered-By');
  next();
}

let adminServicesPromise: Promise<{
  auth: import('firebase-admin/auth').Auth;
  db: import('firebase-admin/firestore').Firestore;
  FieldValue: typeof import('firebase-admin/firestore').FieldValue;
} | null> | null = null;

async function getAdminServices() {
  if (!adminServicesPromise) {
    adminServicesPromise = (async () => {
      try {
        const [{ applicationDefault, getApps, initializeApp }, { getAuth }, { FieldValue, getFirestore }] =
          await Promise.all([import('firebase-admin/app'), import('firebase-admin/auth'), import('firebase-admin/firestore')]);
        const app =
          getApps()[0] ||
          initializeApp(
            emulatorMode
              ? { projectId: firebaseProjectId }
              : { credential: applicationDefault(), projectId: firebaseProjectId },
          );
        return {
          auth: getAuth(app),
          db: getFirestore(app, firestoreDatabaseId),
          FieldValue,
        };
      } catch {
        adminServicesPromise = null;
        return null;
      }
    })();
  }
  return adminServicesPromise;
}

async function resolvePrincipal(req: Request): Promise<VerifiedPrincipal> {
  const authorization = req.get('authorization') || '';
  const match = /^Bearer ([^\s]+)$/i.exec(authorization);
  if (!match) throw new AuthorizationError('Missing bearer token.', 401);
  const services = await getAdminServices();
  if (!services) throw new AuthorizationError('Admin services are unavailable.', 503);
  return resolveVerifiedPrincipal(
    services.auth,
    async (uid) => {
      const snapshot = await services.db.collection('users').doc(uid).get();
      return snapshot.exists ? snapshot.data() : null;
    },
    match[1],
  );
}

function requireRole(...allowedRoles: AppRole[]): RequestHandler {
  return async (req, res, next) => {
    try {
      const principal = await resolvePrincipal(req);
      if (!roleAllows(principal.role, allowedRoles)) {
        return res.status(403).json({ error: 'You are not authorized to perform this operation.' });
      }
      (req as AuthenticatedRequest).verifiedPrincipal = principal;
      return next();
    } catch (error) {
      const status = error instanceof AuthorizationError ? error.status : 503;
      return res.status(status === 401 || status === 403 ? status : 503).json({
        error: status === 401 ? 'A valid, active sign-in is required.' : status === 403 ? 'Account permissions could not be verified.' : 'Authorization is temporarily unavailable.',
      });
    }
  };
}

function getPrincipal(req: Request): VerifiedPrincipal {
  return (req as AuthenticatedRequest).verifiedPrincipal;
}

function isActiveAdminRecord(data: Record<string, unknown>): boolean {
  return data.active === true && (data.role === 'admin' || data.role === 'ADMIN');
}

async function getInquiryStore() {
  const services = await getAdminServices();
  return services ? { db: services.db, FieldValue: services.FieldValue } : null;
}

async function startServer() {
  const app = express();
  // Trust forwarded IP headers only when the deployment owner confirms one proxy hop.
  app.set('trust proxy', process.env.TRUST_PROXY_HOPS === '1' ? 1 : false);
  app.disable('x-powered-by');
  app.use(securityHeadersMiddleware);
  app.use('/api', sameOriginApiGuard);
  // Inquiry payloads are far smaller than this; keep a modest ceiling across JSON APIs.
  app.use(express.json({ limit: '16kb' }));

  // Sanitized error response for malformed JSON bodies
  app.use((err: unknown, req: Request, res: Response, next: NextFunction) => {
    if (
      err instanceof SyntaxError &&
      'status' in err &&
      (err as { status?: number }).status === 400
    ) {
      if (req.path.startsWith('/api')) {
        return res.status(400).json({ error: 'Invalid JSON request payload.' });
      }
      return res.status(400).send('Bad Request');
    }
    if (err && typeof err === 'object' && 'type' in err && (err as { type?: string }).type === 'entity.too.large') {
      if (req.path.startsWith('/api')) {
        return res.status(413).json({ error: 'Request payload is too large.' });
      }
      return res.status(413).send('Payload Too Large');
    }
    return next(err);
  });

  app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', service: 'exponential-media-africa' });
  });

  app.get('/api/auth/session', requireRole('public', 'editor', 'admin'), (req, res) => {
    const principal = getPrincipal(req);
    res.setHeader('Cache-Control', 'no-store');
    return res.json({ uid: principal.uid, role: principal.role });
  });

  const provisionRoleSchema = z.object({
    uid: z.string().min(1).max(128).regex(/^[A-Za-z0-9_-]+$/),
    role: z.enum(['editor', 'admin']),
  }).strict();
  const updateRoleSchema = z.object({
    role: z.enum(['editor', 'admin']).optional(),
    active: z.boolean().optional(),
  }).strict().refine((value) => value.role !== undefined || value.active !== undefined);
  const inquiryStatusSchema = z.object({
    inquiryStatus: z.enum(['new', 'reviewing', 'contacted', 'archived']),
  }).strict();

  app.post('/api/admin/roles', requireRole('admin'), async (req, res) => {
    const parsed = provisionRoleSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ error: 'A valid user ID and role are required.' });
    const principal = getPrincipal(req);
    if (!mayProvisionRole(principal, parsed.data.uid)) return res.status(409).json({ error: 'Administrators cannot provision their own account.' });
    const services = await getAdminServices();
    if (!services) return res.status(503).json({ error: 'Role management is temporarily unavailable.' });

    let targetAccount;
    try {
      targetAccount = await services.auth.getUser(parsed.data.uid);
    } catch (error) {
      const code = error && typeof error === 'object' && 'code' in error ? String((error as { code: unknown }).code) : '';
      return res.status(code === 'auth/user-not-found' ? 404 : 503).json({ error: code === 'auth/user-not-found' ? 'The Firebase account was not found.' : 'The account could not be verified.' });
    }
    if (targetAccount.disabled || !targetAccount.emailVerified || !targetAccount.email) {
      return res.status(400).json({ error: 'The target account must be enabled and have a verified email.' });
    }
    if (!z.string().email().max(160).safeParse(targetAccount.email).success) {
      return res.status(400).json({ error: 'The target account email is outside the supported role-record format.' });
    }
    if (parsed.data.role === 'admin' && !targetAccount.multiFactor?.enrolledFactors?.length) {
      return res.status(400).json({ error: 'Administrator accounts must enroll a Firebase multi-factor authentication method first.' });
    }

    const users = services.db.collection('users');
    const controlRef = services.db.collection('_admin_control').doc('active_admins');
    const targetRef = users.doc(parsed.data.uid);
    const auditRef = services.db.collection('audit_logs').doc();
    try {
      const result = await services.db.runTransaction(async (transaction) => {
        await transaction.get(controlRef);
        const usersSnapshot = await transaction.get(users);
        const actorSnapshot = usersSnapshot.docs.find((doc) => doc.id === principal.uid);
        const actorRoleRecord = actorSnapshot && isRoleRecord(actorSnapshot.id, actorSnapshot.data()) ? actorSnapshot.data() : null;
        if (!actorRoleRecord || !actorRoleRecord.active || actorRoleRecord.role !== 'admin') return { kind: 'forbidden' as const };

        const existingSnapshot = usersSnapshot.docs.find((doc) => doc.id === parsed.data.uid);
        if (existingSnapshot) return { kind: 'exists' as const };
        const activeAdminCount = usersSnapshot.docs.filter((doc) => isActiveAdminRecord(doc.data())).length;
        if (usersSnapshot.size > 450) return { kind: 'too_many' as const };

        const timestamp = services.FieldValue.serverTimestamp();
        transaction.create(targetRef, {
          uid: parsed.data.uid,
          email: targetAccount.email!.toLowerCase(),
          displayName: targetAccount.displayName?.trim().slice(0, 120) || targetAccount.email!.slice(0, 120),
          role: parsed.data.role,
          active: true,
          createdAt: timestamp,
          createdBy: principal.uid,
          updatedAt: timestamp,
          updatedBy: principal.uid,
        });
        transaction.set(controlRef, { activeAdminCount: activeAdminCount + (parsed.data.role === 'admin' ? 1 : 0), updatedAt: timestamp });
        transaction.create(auditRef, {
          actorUid: principal.uid,
          actorEmail: principal.email,
          actorRole: 'admin',
          action: 'PROVISION_ROLE',
          targetCollection: 'users',
          targetId: parsed.data.uid,
          outcome: 'success',
          summary: `Provisioned ${parsed.data.role} role.`,
          createdAt: timestamp,
        });
        return { kind: 'created' as const };
      });
      if (result.kind === 'forbidden') return res.status(403).json({ error: 'Administrator authorization changed. Sign in again and retry.' });
      if (result.kind === 'exists') return res.status(409).json({ error: 'A role record already exists for this account.' });
      if (result.kind === 'too_many') return res.status(503).json({ error: 'Role management requires an administrator review.' });
      return res.status(201).json({ success: true, uid: parsed.data.uid, role: parsed.data.role, active: true });
    } catch {
      return res.status(503).json({ error: 'Role provisioning did not complete. Please retry.' });
    }
  });

  app.patch('/api/admin/roles/:uid', requireRole('admin'), async (req, res) => {
    const parsed = updateRoleSchema.safeParse(req.body);
    const uid = req.params.uid;
    if (!parsed.success || !/^[A-Za-z0-9_-]{1,128}$/.test(uid)) return res.status(400).json({ error: 'A valid role update is required.' });
    const principal = getPrincipal(req);
    if (uid === principal.uid) return res.status(409).json({ error: 'Administrators cannot change their own role or active state.' });
    const services = await getAdminServices();
    if (!services) return res.status(503).json({ error: 'Role management is temporarily unavailable.' });

    let targetAccount;
    try {
      targetAccount = await services.auth.getUser(uid);
    } catch (error) {
      const code = error && typeof error === 'object' && 'code' in error ? String((error as { code: unknown }).code) : '';
      if (code === 'auth/user-not-found' && parsed.data.active === false) {
        targetAccount = null;
      } else {
        return res.status(code === 'auth/user-not-found' ? 404 : 503).json({ error: code === 'auth/user-not-found' ? 'The Firebase account was not found.' : 'The account could not be verified.' });
      }
    }
    if (parsed.data.active !== false && (!targetAccount || targetAccount.disabled || !targetAccount.emailVerified || !targetAccount.email || !z.string().email().max(160).safeParse(targetAccount.email).success)) {
      return res.status(400).json({ error: 'The target account must be enabled and have a verified email before activation.' });
    }
    if (parsed.data.active !== false && parsed.data.role === 'admin' && !targetAccount?.multiFactor?.enrolledFactors?.length) {
      return res.status(400).json({ error: 'Administrator accounts must enroll a Firebase multi-factor authentication method first.' });
    }

    const users = services.db.collection('users');
    const controlRef = services.db.collection('_admin_control').doc('active_admins');
    const targetRef = users.doc(uid);
    const auditRef = services.db.collection('audit_logs').doc();
    try {
      const result = await services.db.runTransaction(async (transaction) => {
        await transaction.get(controlRef);
        const usersSnapshot = await transaction.get(users);
        if (usersSnapshot.size > 450) return { kind: 'too_many' as const };
        const actorSnapshot = usersSnapshot.docs.find((doc) => doc.id === principal.uid);
        const actorRecord = actorSnapshot && isRoleRecord(actorSnapshot.id, actorSnapshot.data()) ? actorSnapshot.data() : null;
        if (!actorRecord || !actorRecord.active || actorRecord.role !== 'admin') return { kind: 'forbidden' as const };
        const targetSnapshot = usersSnapshot.docs.find((doc) => doc.id === uid);
        if (!targetSnapshot) return { kind: 'missing' as const };
        const current = isRoleRecord(uid, targetSnapshot.data()) ? targetSnapshot.data() : null;
        if (!current) return { kind: 'malformed' as const };

        const nextRole = parsed.data.role ?? current.role;
        const nextActive = parsed.data.active ?? current.active;
        if (nextActive && nextRole === 'admin' && !targetAccount?.multiFactor?.enrolledFactors?.length) return { kind: 'mfa_required' as const };
        if (nextRole === current.role && nextActive === current.active) return { kind: 'unchanged' as const, role: current.role, active: current.active };
        const activeAdminCount = usersSnapshot.docs.filter((doc) => isActiveAdminRecord(doc.data())).length;
        if (!mayRemoveActiveAdmin(activeAdminCount, current.role, current.active, nextRole, nextActive)) return { kind: 'last_admin' as const };

        const timestamp = services.FieldValue.serverTimestamp();
        transaction.update(targetRef, {
          role: nextRole,
          active: nextActive,
          email: (targetAccount?.email && targetAccount.email.length <= 160 ? targetAccount.email : current.email).toLowerCase(),
          displayName: targetAccount?.displayName?.trim().slice(0, 120) || targetAccount?.email?.slice(0, 120) || current.displayName,
          updatedAt: timestamp,
          updatedBy: principal.uid,
        });
        transaction.set(controlRef, {
          activeAdminCount: activeAdminCount + (nextRole === 'admin' && nextActive ? 1 : 0) - (current.role === 'admin' && current.active ? 1 : 0),
          updatedAt: timestamp,
        });
        transaction.create(auditRef, {
          actorUid: principal.uid,
          actorEmail: principal.email,
          actorRole: 'admin',
          action: nextActive ? 'UPDATE_ROLE' : 'DEACTIVATE_ROLE',
          targetCollection: 'users',
          targetId: uid,
          outcome: 'success',
          summary: `Set role to ${nextRole}; active=${nextActive}.`,
          createdAt: timestamp,
        });
        return { kind: 'updated' as const, role: nextRole, active: nextActive };
      });
      if (result.kind === 'forbidden') return res.status(403).json({ error: 'Administrator authorization changed. Sign in again and retry.' });
      if (result.kind === 'missing') return res.status(404).json({ error: 'No role record exists for this account.' });
      if (result.kind === 'malformed') return res.status(409).json({ error: 'The role record is invalid and requires owner recovery.' });
      if (result.kind === 'last_admin') return res.status(409).json({ error: 'The last active administrator cannot be deactivated or demoted.' });
      if (result.kind === 'mfa_required') return res.status(400).json({ error: 'Administrator accounts must enroll a Firebase multi-factor authentication method first.' });
      if (result.kind === 'too_many') return res.status(503).json({ error: 'Role management requires an administrator review.' });
      return res.json({ success: true, uid, role: result.role, active: result.active });
    } catch {
      return res.status(503).json({ error: 'Role update did not complete. Please retry.' });
    }
  });

  app.patch('/api/admin/inquiries/:inquiryId/status', requireRole('admin'), async (req, res) => {
    const inquiryId = req.params.inquiryId;
    const parsed = inquiryStatusSchema.safeParse(req.body);
    if (!/^[A-Za-z0-9_-]{1,128}$/.test(inquiryId) || !parsed.success) {
      return res.status(400).json({ error: 'A valid inquiry status update is required.' });
    }
    const principal = getPrincipal(req);
    const services = await getAdminServices();
    if (!services) return res.status(503).json({ error: 'Inquiry management is temporarily unavailable.' });
    const actorRef = services.db.collection('users').doc(principal.uid);
    const inquiryRef = services.db.collection('inquiries').doc(inquiryId);
    const auditRef = services.db.collection('audit_logs').doc();
    try {
      const result = await services.db.runTransaction(async (transaction) => {
        const [actorSnapshot, inquirySnapshot] = await Promise.all([transaction.get(actorRef), transaction.get(inquiryRef)]);
        const actorRecord = actorSnapshot.exists && isRoleRecord(principal.uid, actorSnapshot.data()) ? actorSnapshot.data() : null;
        if (!actorRecord || !actorRecord.active || actorRecord.role !== 'admin') return { kind: 'forbidden' as const };
        if (!inquirySnapshot.exists) return { kind: 'missing' as const };
        const previousStatus = inquirySnapshot.get('inquiryStatus');
        transaction.update(inquiryRef, { inquiryStatus: parsed.data.inquiryStatus });
        const timestamp = services.FieldValue.serverTimestamp();
        transaction.create(auditRef, {
          actorUid: principal.uid,
          actorEmail: principal.email,
          actorRole: 'admin',
          action: 'UPDATE_INQUIRY_STATUS',
          targetCollection: 'inquiries',
          targetId: inquiryId,
          outcome: 'success',
          summary: `Inquiry status changed from ${String(previousStatus)} to ${parsed.data.inquiryStatus}.`,
          createdAt: timestamp,
        });
        return { kind: 'updated' as const };
      });
      if (result.kind === 'forbidden') return res.status(403).json({ error: 'Administrator authorization changed. Sign in again and retry.' });
      if (result.kind === 'missing') return res.status(404).json({ error: 'Inquiry not found.' });
      return res.json({ success: true, inquiryId, inquiryStatus: parsed.data.inquiryStatus });
    } catch {
      return res.status(503).json({ error: 'Inquiry status update did not complete. Please retry.' });
    }
  });

  app.get('/api/maps/config', (_req, res) => {
    const apiKey =
      process.env.VITE_GOOGLE_MAPS_API_KEY || process.env.GOOGLE_MAPS_API_KEY || '';
    res.setHeader('Cache-Control', 'no-store');
    res.json({ apiKey });
  });

  const researchRequestSchema = z.object({
    query: z
      .string()
      .trim()
      .min(4, 'Please enter at least 4 characters to run live industry research.')
      .max(300, 'Research topic must be 300 characters or fewer.'),
  });

  // Server-side Search-Grounded industry brief via Gemini + Google Search
  app.post(
    '/api/insights/research',
    createRateLimiter(5 * 60 * 1000, 12),
    async (req, res) => {
      const parsed = researchRequestSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({
          error: parsed.error.issues[0]?.message || 'Invalid research topic.',
        });
      }

      const cleanQuery = sanitizePlainText(parsed.data.query);
      if (cleanQuery.length < 4) {
        return res.status(400).json({
          error: 'Please enter a valid research topic.',
        });
      }

      try {
        const ai = getGeminiClient();
        const timeoutPromise = new Promise<never>((_, reject) => {
          setTimeout(() => reject(new Error('RESEARCH_TIMEOUT')), 20_000);
        });
        const response = await Promise.race([
          ai.models.generateContent({
            model: 'gemini-4-hydrogen',
            contents: cleanQuery,
            config: {
              systemInstruction:
                'You are a senior media, creative agency, and marketing strategist for Exponential Media Africa in Nairobi, Kenya. Provide concise, factual, executive-ready research grounded in Google Search results, focusing on East African and Kenyan industry context where relevant. Do not invent citations or statistics.',
              tools: [{ googleSearch: {} }],
            },
          }),
          timeoutPromise,
        ]);

        const answer = (response.text || '').trim();
        const rawChunks =
          response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
        const seenUris = new Set<string>();
        const sources: Array<{ title: string; uri: string }> = [];

        for (const chunk of rawChunks) {
          const uri = chunk?.web?.uri;
          if (!uri) continue;
          try {
            const parsedUrl = new URL(uri);
            if (parsedUrl.protocol !== 'http:' && parsedUrl.protocol !== 'https:') {
              continue;
            }
            const normalizedUri = parsedUrl.toString();
            if (seenUris.has(normalizedUri)) continue;
            seenUris.add(normalizedUri);
            sources.push({
              title: sanitizePlainText(chunk.web?.title || parsedUrl.hostname),
              uri: normalizedUri,
            });
          } catch {
            // Skip invalid grounding URLs
          }
        }

        if (!answer) {
          return res.status(502).json({
            error: 'No research summary was returned for this query. Please refine your topic.',
          });
        }

        return res.status(200).json({ answer, sources });
      } catch (err) {
        const msg = err instanceof Error ? err.message : String(err);
        if (msg.includes('not configured')) {
          return res.status(503).json({
            error: 'Live research service is currently unavailable.',
          });
        }
        if (msg.includes('RESEARCH_TIMEOUT')) {
          return res.status(504).json({
            error: 'Live research request timed out. Please try a shorter query.',
          });
        }
        if (msg.includes('429') || msg.includes('RESOURCE_EXHAUSTED')) {
          return res.status(429).json({
            error: 'Research rate limit reached. Please wait a moment and try again.',
          });
        }
        return res.status(500).json({
          error: 'Unable to complete live Search-grounded research at this time.',
        });
      }
    }
  );

  const inquiryPayloadSchema = projectInquirySchema.strict();
  const idempotencyHeaderSchema = z.string().uuid();

  // Public inquiry submission persists only through this trusted server route.
  app.post(
    '/api/inquiries',
    createRateLimiter(10 * 60 * 1000, 6),
    async (req, res) => {
      const parsed = inquiryPayloadSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({
          error: parsed.error.issues[0]?.message || 'Invalid inquiry submission.',
        });
      }

      const data = parsed.data;
      if (data.websiteHoneypot && data.websiteHoneypot.length > 0) {
        return res.status(400).json({ error: 'Submission could not be accepted. Please check the form and try again.' });
      }

      const idempotencyKey = idempotencyHeaderSchema.safeParse(req.get('Idempotency-Key'));
      if (!idempotencyKey.success) {
        return res.status(400).json({ error: 'Please retry the form submission.' });
      }

      const normalizedInput = {
        fullName: sanitizePlainText(data.fullName),
        businessEmail: sanitizePlainText(data.businessEmail).toLowerCase(),
        companyName: sanitizePlainText(data.companyName),
        phone: sanitizePlainText(data.phone),
        industry: sanitizePlainText(data.industry),
        requiredServices: data.requiredServices.map(sanitizePlainText),
        estimatedBudget: sanitizePlainText(data.estimatedBudget),
        projectTimeline: sanitizePlainText(data.projectTimeline),
        projectDescription: sanitizePlainText(data.projectDescription),
        consentAccepted: true as const,
        websiteHoneypot: '',
      };

      const normalizedResult = inquiryPayloadSchema.safeParse(normalizedInput);
      if (!normalizedResult.success) {
        return res.status(400).json({
          error: normalizedResult.error.issues[0]?.message || 'Please check the submitted details.',
        });
      }
      const sanitizedPayload = {
        fullName: normalizedResult.data.fullName,
        businessEmail: normalizedResult.data.businessEmail,
        companyName: normalizedResult.data.companyName,
        phone: normalizedResult.data.phone,
        industry: normalizedResult.data.industry,
        requiredServices: normalizedResult.data.requiredServices,
        estimatedBudget: normalizedResult.data.estimatedBudget,
        projectTimeline: normalizedResult.data.projectTimeline,
        projectDescription: normalizedResult.data.projectDescription,
        consentAccepted: normalizedResult.data.consentAccepted,
        inquiryStatus: 'new' as const,
      };

      const store = await getInquiryStore();
      if (!store) {
        return res.status(503).json({
          error: `Online submission is temporarily unavailable. Your entries remain in this form; contact ${VERIFIED_CONTACT.email} or ${VERIFIED_CONTACT.primaryPhone}.`,
        });
      }

      // The client key is an idempotency token, not an authorization credential.
      // Key the payload digest so the private record does not contain a plain PII hash.
      const payloadHash = crypto
        .createHmac('sha256', idempotencyKey.data)
        .update(JSON.stringify(sanitizedPayload))
        .digest('hex');
      const idempotencyId = crypto.createHash('sha256').update(idempotencyKey.data).digest('hex');
      const idempotencyRef = store.db.collection('_inquiry_idempotency').doc(idempotencyId);
      const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';

      try {
        for (let attempt = 0; attempt < 3; attempt += 1) {
          const suffix = Array.from(crypto.randomBytes(12), (byte) => chars[byte % chars.length]).join('');
          const proposedReference = `EMA-${new Date().getFullYear()}-${suffix}`;
          const inquiryRef = store.db.collection('inquiries').doc();
          const referenceRef = store.db.collection('_inquiry_references').doc(proposedReference);

          const result = await store.db.runTransaction(async (transaction) => {
            const previous = await transaction.get(idempotencyRef);
            if (previous.exists) {
              const saved = previous.data();
              const expiresAt = saved?.expiresAt;
              const createdAt = saved?.createdAt;
              const expiresAtMillis =
                expiresAt && typeof expiresAt.toMillis === 'function'
                  ? expiresAt.toMillis()
                  : createdAt && typeof createdAt.toMillis === 'function'
                    ? createdAt.toMillis() + INQUIRY_IDEMPOTENCY_TTL_MS
                    : null;
              const expired = expiresAtMillis !== null && expiresAtMillis <= Date.now();
              if (!expired) {
                if (saved?.payloadHash !== payloadHash || typeof saved?.referenceCode !== 'string') {
                  return { kind: 'conflict' as const };
                }
                return { kind: 'saved' as const, referenceCode: saved.referenceCode, duplicate: true };
              }
            }

            const reference = await transaction.get(referenceRef);
            if (reference.exists) return { kind: 'collision' as const };

            const createdAt = store.FieldValue.serverTimestamp();
            transaction.create(inquiryRef, {
              ...sanitizedPayload,
              referenceCode: proposedReference,
              createdAt,
            });
            const idempotencyRecord = {
              payloadHash,
              referenceCode: proposedReference,
              createdAt,
              expiresAt: new Date(Date.now() + INQUIRY_IDEMPOTENCY_TTL_MS),
            };
            if (previous.exists) transaction.set(idempotencyRef, idempotencyRecord);
            else transaction.create(idempotencyRef, idempotencyRecord);
            transaction.create(referenceRef, {
              inquiryId: inquiryRef.id,
              createdAt,
            });
            return { kind: 'saved' as const, referenceCode: proposedReference, duplicate: false };
          });

          if (result.kind === 'conflict') {
            return res.status(409).json({ error: 'This submission key was already used for different form details. Please submit again.' });
          }
          if (result.kind === 'saved') {
            return res.status(result.duplicate ? 200 : 201).json({ success: true, referenceCode: result.referenceCode });
          }
        }
        return res.status(503).json({
          error: `We could not confirm that your inquiry was recorded. Your entries remain in this form; contact ${VERIFIED_CONTACT.email} or ${VERIFIED_CONTACT.primaryPhone}.`,
        });
      } catch {
        return res.status(503).json({
          error: `We could not confirm that your inquiry was recorded. Your entries remain in this form; contact ${VERIFIED_CONTACT.email} or ${VERIFIED_CONTACT.primaryPhone}.`,
        });
      }
    }
  );

  // Newsletter enrollment is disabled until confirmation, unsubscribe, and suppression are complete.
  app.post(
    '/api/newsletter/validate',
    createRateLimiter(10 * 60 * 1000, 12),
    (_req, res) => {
      return res.status(410).json({
        error: 'Newsletter enrollment is currently unavailable. No subscription was created.',
      });
    }
  );

  // SEO robots.txt
  app.get('/robots.txt', (req, res) => {
    const baseUrl = process.env.APP_URL || `${req.protocol}://${req.get('host')}`;
    res.type('text/plain');
    res.send(
      [
        'User-agent: *',
        'Allow: /',
        'Disallow: /admin',
        'Disallow: /api/',
        `Sitemap: ${baseUrl.replace(/\/$/, '')}/sitemap.xml`,
      ].join('\n')
    );
  });

  // Dynamic SEO sitemap.xml covering all verified public pages, work showcases, and insights
  const staticRoutes = [
    '/',
    '/about',
    '/ecosystem',
    '/services',
    '/work',
    '/insights',
    '/contact',
    '/privacy-policy',
    '/terms',
  ];

  const allPublicRoutes = [
    ...staticRoutes,
    ...PUBLIC_WORK_SLUGS.map((slug) => `/work/${slug}`),
    ...PUBLIC_ARTICLE_SLUGS.map((slug) => `/insights/${slug}`),
  ];

  app.get('/sitemap.xml', (req, res) => {
    const baseUrl = (process.env.APP_URL || `${req.protocol}://${req.get('host')}`).replace(/\/$/, '');
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPublicRoutes
  .map(
    (route) => `  <url>
    <loc>${baseUrl}${route}</loc>
    <changefreq>${route === '/' || route === '/insights' || route === '/work' ? 'weekly' : 'monthly'}</changefreq>
    <priority>${route === '/' ? '1.0' : route.startsWith('/work/') || route.startsWith('/insights/') ? '0.7' : '0.8'}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;
    res.type('application/xml');
    res.send(xml);
  });

  // Explicit 404 for unknown /api routes
  app.use('/api', (_req, res) => {
    res.status(404).json({ error: 'API endpoint not found.' });
  });

  if (!isProduction) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const validSpaRoutes = new Set([...allPublicRoutes, '/team', '/admin']);
    const distPath = path.resolve(__dirname, 'dist');
    app.use(
      express.static(distPath, {
        maxAge: '7d',
        setHeaders(res, filePath) {
          if (filePath.endsWith('.html')) {
            res.setHeader('Cache-Control', 'no-cache');
          }
        },
      })
    );
    app.get('*', (req, res) => {
      const normalized =
        req.path.length > 1 && req.path.endsWith('/') ? req.path.slice(0, -1) : req.path;
      const isKnownRoute =
        validSpaRoutes.has(normalized) ||
        normalized.startsWith('/work/') ||
        normalized.startsWith('/insights/');
      if (!isKnownRoute) {
        return res.status(404).sendFile(path.join(distPath, 'index.html'));
      }
      return res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Exponential Media Africa server listening on port ${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
