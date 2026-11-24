import { sanitizePlainText } from './validation.ts';

export const SITE_NAME = 'Exponential Marketing Agency';

/**
 * Formats a concise, unique document title (typically 40-65 chars)
 * without duplicating the agency brand suffix.
 */
export function formatSeoTitle(pageTitle: string, brandSuffix = SITE_NAME): string {
  const clean = sanitizePlainText(pageTitle).replace(/\s+/g, ' ').trim();
  if (!clean) return brandSuffix;
  if (clean.toLowerCase().includes('exponential')) {
    return clean.length <= 72 ? clean : `${clean.slice(0, 69).trimEnd()}…`;
  }
  const combined = `${clean} — ${brandSuffix}`;
  if (combined.length <= 68) return combined;
  const shortCombined = `${clean} — EMA`;
  if (shortCombined.length <= 68) return shortCombined;
  const maxPrefix = Math.max(20, 68 - 6);
  return `${clean.slice(0, maxPrefix).trimEnd()}… — EMA`;
}

/**
 * Normalizes a meta description to an SEO-friendly 120-160 char summary
 * clipped cleanly at a word boundary when needed.
 */
export function formatSeoDescription(rawDescription: string, fallback = ''): string {
  const clean = sanitizePlainText(rawDescription || fallback)
    .replace(/\s+/g, ' ')
    .trim();
  if (!clean) return fallback;
  if (clean.length <= 160) return clean;
  const sliced = clean.slice(0, 157);
  const lastSpace = sliced.lastIndexOf(' ');
  const clipped = lastSpace > 100 ? sliced.slice(0, lastSpace) : sliced;
  return `${clipped.replace(/[,:;.\s-]+$/, '')}.`;
}
