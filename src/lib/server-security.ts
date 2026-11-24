import type { NextFunction, Request, RequestHandler, Response } from 'express';
import { HOSTNAME_PATTERN, hasUnsafeJsonPayload } from './validation.ts';

interface RateEntry {
  count: number;
  resetAt: number;
}

const MAX_RATE_BUCKET_SIZE = 10_000;
const rateBuckets = new Map<string, RateEntry>();

const cleanupTimer = setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of rateBuckets) {
    if (now > entry.resetAt) {
      rateBuckets.delete(key);
    }
  }
}, 5 * 60 * 1000);
cleanupTimer.unref();

export function createRateLimiter(windowMs: number, maxRequests: number): RequestHandler {
  return (req: Request, res: Response, next: NextFunction) => {
    const ip = req.ip || req.socket.remoteAddress || 'unknown';
    const key = `${req.baseUrl}${req.path}:${ip}`;
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
      res.setHeader(
        'Retry-After',
        String(Math.max(1, Math.ceil((existing.resetAt - now) / 1000)))
      );
      return res.status(429).json({
        error: 'Too many requests. Please wait a moment before trying again.',
      });
    }

    existing.count += 1;
    return next();
  };
}

export function createSameOriginApiGuard(isProduction: boolean): RequestHandler {
  return (req: Request, res: Response, next: NextFunction) => {
    if (req.method === 'GET' || req.method === 'HEAD' || req.method === 'OPTIONS') {
      return next();
    }
    const origin = req.headers.origin;
    if (!origin) {
      return next();
    }
    try {
      const parsedOrigin = new URL(origin);
      const originHost = parsedOrigin.host.toLowerCase();
      const reqHost = (req.get('host') || '').toLowerCase();
      let appHost = '';
      if (process.env.APP_URL) {
        try {
          appHost = new URL(process.env.APP_URL).host.toLowerCase();
        } catch {
          appHost = '';
        }
      }
      const allowLocalDevOrigin =
        !isProduction &&
        (originHost.startsWith('localhost:') || originHost.startsWith('127.0.0.1:'));

      if (
        (reqHost && originHost === reqHost) ||
        (appHost && originHost === appHost) ||
        allowLocalDevOrigin
      ) {
        return next();
      }
      return res.status(403).json({ error: 'Cross-origin request rejected.' });
    } catch {
      return res.status(403).json({ error: 'Invalid request origin.' });
    }
  };
}

export function jsonBodySecurityGuard(req: Request, res: Response, next: NextFunction) {
  if (req.body && typeof req.body === 'object' && hasUnsafeJsonPayload(req.body)) {
    return res.status(400).json({ error: 'Request payload contains disallowed fields or nesting.' });
  }
  return next();
}

export function malformedJsonErrorHandler(
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) {
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
  if (
    err &&
    typeof err === 'object' &&
    'type' in err &&
    (err as { type?: string }).type === 'entity.too.large'
  ) {
    if (req.path.startsWith('/api')) {
      return res.status(413).json({ error: 'Request payload is too large.' });
    }
    return res.status(413).send('Payload Too Large');
  }
  return next(err);
}

export function createSecurityHeadersMiddleware(isProduction: boolean): RequestHandler {
  return (_req: Request, res: Response, next: NextFunction) => {
    const emulatorOrigins =
      process.env.VITE_FIREBASE_USE_EMULATORS === 'true' || process.env.FIREBASE_AUTH_EMULATOR_HOST
        ? ' http://127.0.0.1:9099 http://localhost:9099 http://127.0.0.1:8080 http://localhost:8080 ws://127.0.0.1:8080 ws://localhost:8080'
        : '';
    const scriptPolicy = isProduction
      ? "'self' 'sha256-tihRjB5J0ZbdbE9QUjVBiIZU8I9EC1BLRmX6XeC1B0E=' https://apis.google.com https://www.gstatic.com https://www.google.com/recaptcha/ https://maps.googleapis.com https://maps.gstatic.com"
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
    res.setHeader('X-XSS-Protection', '0');
    res.setHeader('X-Permitted-Cross-Domain-Policies', 'none');
    res.setHeader('Origin-Agent-Cluster', '?1');
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    res.setHeader('Cross-Origin-Opener-Policy', 'same-origin-allow-popups');
    res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
    if (isProduction) {
      res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
    }
    res.removeHeader('X-Powered-By');
    next();
  };
}

export function resolveSafeBaseUrl(req: Request): string {
  const configuredAppUrl = process.env.APP_URL?.trim();
  if (configuredAppUrl) {
    try {
      const parsed = new URL(configuredAppUrl);
      if (parsed.protocol === 'https:' || parsed.protocol === 'http:') {
        return parsed.origin;
      }
    } catch {
      /* ignore invalid APP_URL */
    }
  }
  const rawHost = (req.get('host') || '').trim();
  const safeHost = HOSTNAME_PATTERN.test(rawHost) ? rawHost : 'exponentialmedia.africa';
  const safeProto = req.protocol === 'https' ? 'https' : 'http';
  return `${safeProto}://${safeHost}`;
}

export function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}
