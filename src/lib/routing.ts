const ASSET_FILE_PATTERN = /\.(?:png|jpe?g|webp|gif|svg|ico|css|js|mjs|map|woff2?|ttf|eot|json|xml|txt)$/i;

export function normalizeRoutePath(rawPath: string): string {
  const withoutQueryOrHash = (rawPath || '/').split(/[?#]/)[0] || '/';
  const collapsed = withoutQueryOrHash.replace(/\/{2,}/g, '/');
  const trimmed = collapsed.length > 1 && collapsed.endsWith('/') ? collapsed.slice(0, -1) : collapsed;
  return trimmed.toLowerCase() || '/';
}

export function isStaticAssetRequest(rawPath: string): boolean {
  const normalized = normalizeRoutePath(rawPath);
  return normalized.startsWith('/assets/') || ASSET_FILE_PATTERN.test(normalized);
}

export function isKnownAppRoute(
  rawPath: string,
  knownStaticRoutes: ReadonlySet<string>
): boolean {
  const normalized = normalizeRoutePath(rawPath);
  if (knownStaticRoutes.has(normalized)) return true;
  if (normalized.startsWith('/services/') && normalized.length > '/services/'.length) return true;
  if (normalized.startsWith('/work/') && normalized.length > '/work/'.length) return true;
  if (normalized.startsWith('/insights/') && normalized.length > '/insights/'.length) return true;
  return false;
}
