import { useEffect } from 'react';
import { OFFICIAL_BRAND_ASSETS, VERIFIED_CONTACT } from '../data/seedData';
import { formatSeoDescription, formatSeoTitle, SITE_NAME } from '../lib/seo';
import { isSafeHttpOrLocalUrl } from '../lib/validation';

export type PageSchemaType =
  | 'WebPage'
  | 'AboutPage'
  | 'CollectionPage'
  | 'ContactPage'
  | 'Service'
  | 'FAQPage';

interface SeoHeadProps {
  title: string;
  description: string;
  path: string;
  keywords?: string;
  imageUrl?: string;
  imageAlt?: string;
  noIndex?: boolean;
  breadcrumbName?: string;
  parentBreadcrumb?: { name: string; path: string };
  schemaType?: PageSchemaType;
  faqItems?: Array<{ question: string; answer: string }>;
  articleSchema?: {
    headline: string;
    description: string;
    authorName: string;
    datePublished: string;
    imageUrl?: string;
  };
}

function resolveAbsoluteUrl(origin: string, rawPathOrUrl: string): string {
  const trimmed = rawPathOrUrl.trim();
  if (!isSafeHttpOrLocalUrl(trimmed)) return `${origin}/`;
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  if (trimmed.startsWith('/')) return `${origin}${trimmed}`;
  return `${origin}/${trimmed}`;
}

function safeJsonLdStringify(payload: unknown): string {
  return JSON.stringify(payload).replace(/</g, '\\u003c');
}

export function SeoHead({
  title,
  description,
  path,
  keywords,
  imageUrl,
  imageAlt,
  noIndex = false,
  breadcrumbName,
  parentBreadcrumb,
  schemaType = 'WebPage',
  faqItems,
  articleSchema,
}: SeoHeadProps) {
  const faqKey = faqItems ? JSON.stringify(faqItems) : '';
  const articleKey = articleSchema ? JSON.stringify(articleSchema) : '';
  const parentKey = parentBreadcrumb ? `${parentBreadcrumb.name}|${parentBreadcrumb.path}` : '';

  useEffect(() => {
    const cleanTitle = formatSeoTitle(title);
    const cleanDescription = formatSeoDescription(description);
    document.title = cleanTitle;

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
    const defaultOgImage = `${origin}${OFFICIAL_BRAND_ASSETS.logoUrl}`;
    const resolvedImage = imageUrl
      ? resolveAbsoluteUrl(origin, imageUrl)
      : articleSchema?.imageUrl
      ? resolveAbsoluteUrl(origin, articleSchema.imageUrl)
      : defaultOgImage;
    const resolvedImageAlt = imageAlt || cleanTitle;
    const htmlLang = document.documentElement.lang === 'sw' ? 'sw' : 'en';
    const ogLocale = htmlLang === 'sw' ? 'sw_KE' : 'en_KE';

    updateMeta('meta[name="description"]', 'name', 'description', cleanDescription);
    if (keywords && keywords.trim()) {
      updateMeta('meta[name="keywords"]', 'name', 'keywords', keywords.trim());
    }
    updateMeta(
      'meta[name="robots"]',
      'name',
      'robots',
      noIndex
        ? 'noindex, nofollow'
        : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
    );
    updateMeta('meta[property="og:type"]', 'property', 'og:type', articleSchema ? 'article' : 'website');
    updateMeta('meta[property="og:site_name"]', 'property', 'og:site_name', SITE_NAME);
    updateMeta('meta[property="og:locale"]', 'property', 'og:locale', ogLocale);
    updateMeta('meta[property="og:title"]', 'property', 'og:title', cleanTitle);
    updateMeta('meta[property="og:description"]', 'property', 'og:description', cleanDescription);
    updateMeta('meta[property="og:url"]', 'property', 'og:url', canonicalUrl);
    updateMeta('meta[property="og:image"]', 'property', 'og:image', resolvedImage);
    updateMeta('meta[property="og:image:alt"]', 'property', 'og:image:alt', resolvedImageAlt);
    updateMeta('meta[name="twitter:card"]', 'name', 'twitter:card', 'summary_large_image');
    updateMeta('meta[name="twitter:title"]', 'name', 'twitter:title', cleanTitle);
    updateMeta('meta[name="twitter:description"]', 'name', 'twitter:description', cleanDescription);
    updateMeta('meta[name="twitter:image"]', 'name', 'twitter:image', resolvedImage);
    updateMeta('meta[name="twitter:image:alt"]', 'name', 'twitter:image:alt', resolvedImageAlt);

    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = canonicalUrl;

    const existingWebPageLd = document.getElementById('dynamic-webpage-jsonld');
    if (existingWebPageLd) existingWebPageLd.remove();

    if (!noIndex) {
      const wpScript = document.createElement('script');
      wpScript.id = 'dynamic-webpage-jsonld';
      wpScript.type = 'application/ld+json';
      wpScript.textContent = safeJsonLdStringify({
        '@context': 'https://schema.org',
        '@type': schemaType,
        name: cleanTitle,
        description: cleanDescription,
        url: canonicalUrl,
        inLanguage: htmlLang,
        isPartOf: {
          '@type': 'WebSite',
          name: SITE_NAME,
          url: `${origin}/`,
        },
      });
      document.head.appendChild(wpScript);
    }

    const existingFaqLd = document.getElementById('dynamic-faq-jsonld');
    if (existingFaqLd) existingFaqLd.remove();

    if (!noIndex && faqItems && faqItems.length > 0) {
      const faqScript = document.createElement('script');
      faqScript.id = 'dynamic-faq-jsonld';
      faqScript.type = 'application/ld+json';
      faqScript.textContent = safeJsonLdStringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqItems.map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.answer,
          },
        })),
      });
      document.head.appendChild(faqScript);
    }

    const existingArticleLd = document.getElementById('dynamic-article-jsonld');
    if (existingArticleLd) existingArticleLd.remove();

    if (articleSchema) {
      const script = document.createElement('script');
      script.id = 'dynamic-article-jsonld';
      script.type = 'application/ld+json';
      const articleImg = articleSchema.imageUrl
        ? resolveAbsoluteUrl(origin, articleSchema.imageUrl)
        : resolvedImage;
      script.textContent = safeJsonLdStringify({
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: articleSchema.headline,
        description: formatSeoDescription(articleSchema.description),
        datePublished: articleSchema.datePublished,
        image: articleImg,
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
        cleanTitle.replace(/\s+[—–-]\s+(Exponential Marketing Agency|EMA)$/, '').trim();
      const itemListElement = [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: `${origin}/`,
        },
      ];
      if (parentBreadcrumb) {
        itemListElement.push({
          '@type': 'ListItem',
          position: 2,
          name: parentBreadcrumb.name,
          item: resolveAbsoluteUrl(origin, parentBreadcrumb.path),
        });
      }
      itemListElement.push({
        '@type': 'ListItem',
        position: itemListElement.length + 1,
        name: label,
        item: canonicalUrl,
      });
      bcScript.textContent = safeJsonLdStringify({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement,
      });
      document.head.appendChild(bcScript);
    }
  }, [
    title,
    description,
    path,
    keywords,
    imageUrl,
    imageAlt,
    noIndex,
    breadcrumbName,
    parentKey,
    schemaType,
    faqKey,
    articleKey,
    articleSchema,
    faqItems,
    parentBreadcrumb,
  ]);

  return null;
}
