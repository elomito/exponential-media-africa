import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { isKnownAppRoute, isStaticAssetRequest, normalizeRoutePath } from './routing.ts';
import { PUBLIC_ARTICLE_SLUGS, PUBLIC_SERVICE_SLUGS, PUBLIC_WORK_SLUGS } from '../data/sitemapSlugs.ts';

test('normalizeRoutePath trims trailing slashes, strips query/hash, and lowercases paths', () => {
  assert.equal(normalizeRoutePath('/'), '/');
  assert.equal(normalizeRoutePath('/services/social-media-management/'), '/services/social-media-management');
  assert.equal(normalizeRoutePath('/Services/Social-Media-Management?ref=mobile#top'), '/services/social-media-management');
  assert.equal(normalizeRoutePath('//about//'), '/about');
});

test('isKnownAppRoute matches all public, service, work, and insight routes case-insensitively', () => {
  const staticRoutes = new Set([
    '/',
    '/about',
    '/ecosystem',
    '/services',
    '/work',
    '/insights',
    '/faq',
    '/team',
    '/contact',
    '/privacy-policy',
    '/terms',
    '/admin',
  ]);

  assert.equal(isKnownAppRoute('/services/social-media-management', staticRoutes), true);
  assert.equal(isKnownAppRoute('/Services/Social-Media-Management/', staticRoutes), true);
  for (const slug of PUBLIC_SERVICE_SLUGS) {
    assert.equal(isKnownAppRoute(`/services/${slug}`, staticRoutes), true);
  }
  for (const slug of PUBLIC_WORK_SLUGS) {
    assert.equal(isKnownAppRoute(`/work/${slug}`, staticRoutes), true);
  }
  for (const slug of PUBLIC_ARTICLE_SLUGS) {
    assert.equal(isKnownAppRoute(`/insights/${slug}`, staticRoutes), true);
  }
  assert.equal(isKnownAppRoute('/services/', staticRoutes), true);
  assert.equal(isKnownAppRoute('/non-existent-page', staticRoutes), false);
});

test('isStaticAssetRequest identifies asset paths without false positives on page routes', () => {
  assert.equal(isStaticAssetRequest('/assets/profile/work/toyworld-social-showcase.jpg'), true);
  assert.equal(isStaticAssetRequest('/assets/profile/brand/exp-logo-dark.png'), true);
  assert.equal(isStaticAssetRequest('/robots.txt'), true);
  assert.equal(isStaticAssetRequest('/services/social-media-management'), false);
  assert.equal(isStaticAssetRequest('/services/content-creation-and-marketing'), false);
});

test('vercel.json configures SPA rewrites without capturing routes or static assets', () => {
  const root = process.cwd();
  const vercelConfig = JSON.parse(fs.readFileSync(path.join(root, 'vercel.json'), 'utf8')) as {
    rewrites?: Array<{ source: string; destination: string }>;
  };
  assert.ok(Array.isArray(vercelConfig.rewrites) && vercelConfig.rewrites.length >= 1);
  const spaRule = vercelConfig.rewrites.find((r) => r.destination === '/index.html');
  assert.ok(spaRule, 'vercel.json must rewrite SPA routes to /index.html');

  const sourceRegex = new RegExp(`^${spaRule.source}$`);
  assert.equal(sourceRegex.test('/services/social-media-management'), true);
  assert.equal(sourceRegex.test('/work/cinnamon-energies-complete-brand-identity'), true);
  assert.equal(sourceRegex.test('/about'), true);
  assert.equal(sourceRegex.test('/api/health'), false);
  assert.equal(sourceRegex.test('/assets/profile/work/toyworld-social-showcase.jpg'), false);
});
