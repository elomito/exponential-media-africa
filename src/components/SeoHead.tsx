import { useEffect } from 'react';
import { OFFICIAL_BRAND_ASSETS, VERIFIED_CONTACT } from '../data/seedData';

interface SeoHeadProps {
  title: string;
  description: string;
  path: string;
  noIndex?: boolean;
  breadcrumbName?: string;
  articleSchema?: {
    headline: string;
    description: string;
    authorName: string;
    datePublished: string;
    imageUrl?: string;
  };
}

export function SeoHead({
  title,
  description,
  path,
  noIndex = false,
  breadcrumbName,
  articleSchema,
}: SeoHeadProps) {
  useEffect(() => {
    document.title = title;

    const updateMeta = (
      selector: string,
      attr: 'name' | 'property',
      key: string,
      value: string
    ) => {
      let el = document.querySelector(selector) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, key);
        document.head.appendChild(el);
      }
      el.content = value;
    };

    const origin = window.location.origin;
    const normalizedPath = path.startsWith('/') ? path : `/${path}`;
    const canonicalUrl = `${origin}${normalizedPath}`;
    const defaultOgImage = `${origin}${OFFICIAL_BRAND_ASSETS.darkLockupUrl}`;

    updateMeta('meta[name="description"]', 'name', 'description', description);
    updateMeta(
      'meta[name="robots"]',
      'name',
      'robots',
      noIndex ? 'noindex, nofollow' : 'index, follow'
    );
    updateMeta('meta[property="og:title"]', 'property', 'og:title', title);
    updateMeta('meta[property="og:description"]', 'property', 'og:description', description);
    updateMeta('meta[property="og:url"]', 'property', 'og:url', canonicalUrl);
    updateMeta('meta[property="og:image"]', 'property', 'og:image', defaultOgImage);
    updateMeta('meta[name="twitter:title"]', 'name', 'twitter:title', title);
    updateMeta('meta[name="twitter:description"]', 'name', 'twitter:description', description);
    updateMeta('meta[name="twitter:image"]', 'name', 'twitter:image', defaultOgImage);

    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = canonicalUrl;

    const existingArticleLd = document.getElementById('dynamic-article-jsonld');
    if (existingArticleLd) existingArticleLd.remove();

    if (articleSchema) {
      const script = document.createElement('script');
      script.id = 'dynamic-article-jsonld';
      script.type = 'application/ld+json';
      const resolvedImage = articleSchema.imageUrl?.startsWith('http')
        ? articleSchema.imageUrl
        : articleSchema.imageUrl
        ? `${origin}${articleSchema.imageUrl}`
        : defaultOgImage;
      script.textContent = JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: articleSchema.headline,
        description: articleSchema.description,
        datePublished: articleSchema.datePublished,
        image: resolvedImage,
        author: {
          '@type': 'Organization',
          name: articleSchema.authorName,
        },
        publisher: {
          '@type': 'Organization',
          name: VERIFIED_CONTACT.companyName,
          logo: {
            '@type': 'ImageObject',
            url: `${origin}${OFFICIAL_BRAND_ASSETS.markUrl}`,
          },
        },
        mainEntityOfPage: canonicalUrl,
      });
      document.head.appendChild(script);
    }

    const existingBreadcrumbLd = document.getElementById('dynamic-breadcrumb-jsonld');
    if (existingBreadcrumbLd) existingBreadcrumbLd.remove();

    if (!noIndex && normalizedPath !== '/') {
      const bcScript = document.createElement('script');
      bcScript.id = 'dynamic-breadcrumb-jsonld';
      bcScript.type = 'application/ld+json';
      const label =
        breadcrumbName ||
        title.replace(/\s+[—–-]\s+Exponential Media Africa$/, '').trim();
      bcScript.textContent = JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: `${origin}/`,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: label,
            item: canonicalUrl,
          },
        ],
      });
      document.head.appendChild(bcScript);
    }
  }, [title, description, path, noIndex, breadcrumbName, articleSchema]);

  return null;
}
