import crypto from 'node:crypto';
import express, { type NextFunction, type Request, type Response } from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createServer as createViteServer } from 'vite';
import { z } from 'zod';
import { PUBLIC_ARTICLE_SLUGS, PUBLIC_WORK_SLUGS } from './src/data/sitemapSlugs.ts';
import { getGeminiClient } from './src/lib/gemini.ts';
import { newsletterSchema, projectInquirySchema, sanitizePlainText } from './src/lib/validation.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const isProduction = process.env.NODE_ENV === 'production';
const PORT = 3000;

interface RateEntry {
  count: number;
  resetAt: number;
}

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
    const ip =
      (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() ||
      req.socket.remoteAddress ||
      'unknown';
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
  const cspDirectives = [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' https://apis.google.com https://www.gstatic.com https://maps.googleapis.com https://maps.gstatic.com",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' https://fonts.gstatic.com data:",
    "img-src 'self' data: blob: https://*.googleusercontent.com https://*.firebasestorage.app https://firebasestorage.googleapis.com https://maps.googleapis.com https://maps.gstatic.com https://*.ggpht.com",
    "connect-src 'self' https://*.googleapis.com https://*.firebaseio.com https://*.firebaseapp.com https://*.gstatic.com https://firestore.googleapis.com https://identitytoolkit.googleapis.com https://securetoken.googleapis.com https://maps.googleapis.com https://places.googleapis.com wss:",
    "frame-src 'self' https://*.firebaseapp.com https://accounts.google.com",
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

function resolveNotificationWebhook(): string | null {
  const raw = (process.env.INQUIRY_WEBHOOK_URL || '').trim();
  if (!raw) return null;
  try {
    const parsed = new URL(raw);
    return parsed.protocol === 'https:' ? parsed.toString() : null;
  } catch {
    return null;
  }
}

async function startServer() {
  const app = express();
  app.set('trust proxy', 1);
  app.disable('x-powered-by');
  app.use(securityHeadersMiddleware);
  app.use('/api', sameOriginApiGuard);
  app.use(express.json({ limit: '64kb' }));

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
    return next(err);
  });

  app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', service: 'exponential-media-africa' });
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

  // Server-side validation, sanitization, rate limiting & reference generation for Smart Project Inquiries
  app.post(
    '/api/inquiries/validate',
    createRateLimiter(10 * 60 * 1000, 8),
    (req, res) => {
      const parsed = projectInquirySchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({
          error: parsed.error.issues[0]?.message || 'Invalid inquiry submission.',
        });
      }

      const data = parsed.data;
      if (data.websiteHoneypot && data.websiteHoneypot.length > 0) {
        return res.status(400).json({ error: 'Submission rejected.' });
      }

      const year = new Date().getFullYear();
      const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
      const bytes = crypto.randomBytes(6);
      const suffix = Array.from(bytes)
        .map((b) => chars[b % chars.length])
        .join('');
      const referenceCode = `EMA-${year}-${suffix}`;

      const sanitizedPayload = {
        referenceCode,
        fullName: sanitizePlainText(data.fullName),
        businessEmail: sanitizePlainText(data.businessEmail).toLowerCase(),
        companyName: sanitizePlainText(data.companyName),
        phone: sanitizePlainText(data.phone),
        industry: sanitizePlainText(data.industry),
        requiredServices: data.requiredServices.map(sanitizePlainText),
        estimatedBudget: sanitizePlainText(data.estimatedBudget),
        projectTimeline: sanitizePlainText(data.projectTimeline),
        projectDescription: sanitizePlainText(data.projectDescription),
        consentAccepted: true,
        inquiryStatus: 'new' as const,
      };

      const notificationWebhook = resolveNotificationWebhook();
      if (notificationWebhook) {
        fetch(notificationWebhook, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          signal: AbortSignal.timeout(8000),
          body: JSON.stringify({
            event: 'new_project_inquiry',
            referenceCode,
            companyName: sanitizedPayload.companyName,
            industry: sanitizedPayload.industry,
            servicesCount: sanitizedPayload.requiredServices.length,
          }),
        }).catch(() => {
          // Do not fail user submission or leak internal notification errors
        });
      }

      return res.status(200).json({
        valid: true,
        sanitizedPayload,
        emailNotificationConfigured: Boolean(notificationWebhook),
      });
    }
  );

  // Server-side validation, hashing & token generation for Newsletter Subscriptions
  app.post(
    '/api/newsletter/validate',
    createRateLimiter(10 * 60 * 1000, 12),
    (req, res) => {
      const parsed = newsletterSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({
          error: parsed.error.issues[0]?.message || 'Invalid newsletter request.',
        });
      }

      if (parsed.data.websiteHoneypot && parsed.data.websiteHoneypot.length > 0) {
        return res.status(400).json({ error: 'Submission rejected.' });
      }

      const normalizedEmail = sanitizePlainText(parsed.data.email).toLowerCase();
      const subscriberHash = crypto
        .createHash('sha256')
        .update(normalizedEmail)
        .digest('hex');
      const unsubscribeToken = crypto.randomBytes(24).toString('hex');

      return res.status(200).json({
        valid: true,
        subscriberHash,
        email: normalizedEmail,
        unsubscribeToken,
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
