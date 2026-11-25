import React from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight, Check } from 'lucide-react';
import { HeroBackdrop } from '../components/HeroBackdrop';
import { OptimizedImage } from '../components/OptimizedImage';
import { Reveal } from '../components/ScrollReveal';
import { SeoHead } from '../components/SeoHead';
import { useCms } from '../context/CmsContext';
import { useLanguage } from '../context/LanguageContext';
import { getArticleCardImageUrl } from '../data/cardImages';
import { parseArticleSections } from '../lib/motion';
import { CORE_SIX_SERVICES, getServiceSlug } from '../lib/portfolio';

interface ArticlePageProps {
  slug: string;
  onNavigate: (path: string) => void;
}

export function ArticlePage({ slug, onNavigate }: ArticlePageProps) {
  const { articles } = useCms();
  const { t, localizeArticle, localizeServiceBySlug } = useLanguage();
  const rawArticle = articles.find((a) => a.slug === slug);
  const article = rawArticle ? localizeArticle(rawArticle) : undefined;

  if (!article) {
    return (
      <div className="bg-[#B81118] text-white">
        <div className="max-w-4xl mx-auto px-4 py-28 text-center">
          <SeoHead
            title={`${t.article.notFoundTitle} — Exponential Marketing Agency`}
            description={t.article.notFoundBody}
            path={`/insights/${slug}`}
            noIndex
          />
          <h1 className="text-3xl font-display font-bold mb-4">{t.article.notFoundTitle}</h1>
          <p className="text-base sm:text-lg text-white/90 leading-relaxed mb-8">
            {t.article.notFoundBody}
          </p>
          <button
            type="button"
            onClick={() => onNavigate('/insights')}
            className="px-5 py-2.5 text-sm font-semibold bg-white hover:bg-white/90 text-[#9E0E15] rounded-lg"
          >
            {t.article.backToInsights}
          </button>
        </div>
      </div>
    );
  }

  const related = articles.filter((a) => a.slug !== article.slug).slice(0, 3);
  const blocks = parseArticleSections(article.body);
  const toSectionId = (headingText: string, index: number) =>
    `section-${index}-${headingText
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')}`;
  const tableOfContents = blocks
    .map((b, idx) =>
      b.type === 'heading' && b.text
        ? { id: toSectionId(b.text, idx), label: b.text }
        : null
    )
    .filter((entry): entry is { id: string; label: string } => entry !== null);

  return (
    <div>
      <SeoHead
        title={`${article.title} — Exponential Marketing Agency`}
        description={article.excerpt}
        path={`/insights/${article.slug}`}
        imageUrl={article.imageUrl}
        imageAlt={article.title}
        parentBreadcrumb={{ name: t.nav.insights, path: '/insights' }}
        breadcrumbName={article.title}
        articleSchema={{
          headline: article.title,
          description: article.excerpt,
          authorName: article.authorName,
          datePublished: article.publishedDate,
          imageUrl: article.imageUrl,
        }}
      />

      <section className="relative min-h-[min(580px,calc(100svh-4.5rem))] flex items-end bg-[#9E0E15] overflow-hidden text-white border-b border-white/15">
        <HeroBackdrop
          imageUrl={article.imageUrl}
          alt={article.title}
        />
        <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 pb-12 sm:pb-16 lg:pb-20">
          <button
            type="button"
            onClick={() => onNavigate('/insights')}
            className="inline-flex items-center gap-2 text-sm font-semibold text-white/90 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{t.article.backToInsights}</span>
          </button>

          <div className="hero-pop flex flex-wrap items-center gap-2.5 text-sm text-white/90 mb-4">
            <span className="text-white font-bold">{article.category}</span>
            <span aria-hidden="true">·</span>
            <time dateTime={article.publishedDate}>{article.publishedDate}</time>
            <span aria-hidden="true">·</span>
            <span>{article.readTime}</span>
            <span aria-hidden="true">·</span>
            <span>
              {t.article.byLabel} {article.authorName} ({article.authorRole})
            </span>
          </div>

          <h1 className="hero-slide-left text-3xl sm:text-5xl lg:text-6xl font-display font-bold tracking-[-0.04em] leading-[1.03] [text-wrap:balance] max-w-5xl mb-6">
            {article.title}
          </h1>

          <p className="hero-slide-down-delay-1 text-base sm:text-lg text-white/95 leading-relaxed max-w-3xl">
            {article.excerpt}
          </p>
        </div>
      </section>

      <section className="bg-[#B81118] text-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <aside className="lg:col-span-4 lg:sticky lg:top-24 space-y-8">
            <Reveal variant="slide-left">
              <div className="overflow-hidden rounded-xl border border-white/20 aspect-[4/3] mb-6">
                <OptimizedImage
                  src={article.imageUrl}
                  alt={article.title}
                  width={900}
                  height={675}
                  containerClassName="w-full h-full"
                  className="w-full h-full object-cover"
                />
              </div>
              {tableOfContents.length > 0 && (
                <nav aria-label="Article sections" className="space-y-3">
                  <h2 className="text-lg font-display font-bold uppercase text-white">
                    {t.article.inThisDispatch}
                  </h2>
                  <ul className="space-y-2.5 text-base text-white/85">
                    {tableOfContents.map((entry, idx) => (
                      <li key={entry.id} className="font-medium leading-snug">
                        <a
                          href={`#${entry.id}`}
                          className="hover:text-white transition-colors inline-block"
                        >
                          0{idx + 1}. {entry.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              )}
            </Reveal>
          </aside>

          <article className="lg:col-span-8 space-y-6">
            {blocks.map((block, index) => {
              if (block.type === 'heading') {
                const headingId = toSectionId(block.text || 'section', index);
                return (
                  <Reveal key={index} variant="slide-left">
                    <h2
                      id={headingId}
                      className="scroll-mt-24 pt-4 text-2xl sm:text-3xl font-display font-bold uppercase tracking-tight text-white leading-snug"
                    >
                      {block.text}
                    </h2>
                  </Reveal>
                );
              }

              if (block.type === 'list' && block.items) {
                return (
                  <Reveal key={index} variant="slide-down" delayMs={50}>
                    <ul className="space-y-3 py-2">
                      {block.items.map((item, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-3 text-base sm:text-lg text-white/95 leading-relaxed"
                        >
                          <Check
                            className="w-5 h-5 text-white shrink-0 mt-1"
                            aria-hidden="true"
                          />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </Reveal>
                );
              }

              return (
                <Reveal key={index} variant={index % 2 === 0 ? 'slide-left' : 'slide-down'}>
                  <p className="text-base sm:text-lg text-white/95 leading-relaxed">
                    {block.text}
                  </p>
                </Reveal>
              );
            })}
          </article>
        </div>
      </section>

      <section className="bg-white text-[#2A1214] py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <Reveal variant="slide-left" className="max-w-3xl space-y-3">
              <h2 className="text-2xl sm:text-4xl font-display font-bold tracking-tight leading-[1.08] uppercase text-[#B81118]">
                {t.article.exploreServicesHeading}
              </h2>
              <p className="text-base sm:text-lg text-[#4A2527] leading-relaxed">
                {t.article.exploreServicesBody}
              </p>
            </Reveal>
            <Reveal variant="slide-down" delayMs={80}>
              <button
                type="button"
                onClick={() => onNavigate('/contact')}
                className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-bold bg-[#ED1B24] hover:bg-[#B81118] text-white rounded-md transition-colors whitespace-nowrap shrink-0"
              >
                <span>{t.article.startBrief}</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {CORE_SIX_SERVICES.map((srv, idx) => {
              const sSlug = getServiceSlug(srv);
              return (
                <Reveal
                  key={srv}
                  variant={idx % 2 === 0 ? 'slide-left' : 'slide-down'}
                  delayMs={idx * 55}
                >
                  <button
                    type="button"
                    onClick={() => onNavigate(`/services/${sSlug}`)}
                    className="text-left group flex items-center justify-between gap-3 py-2 text-lg sm:text-xl font-display font-bold text-[#B81118] hover:text-[#ED1B24] transition-colors w-full"
                  >
                    <span>{localizeServiceBySlug(sSlug, srv)}</span>
                    <ArrowUpRight className="w-4 h-4 shrink-0" aria-hidden="true" />
                  </button>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-[#B81118] text-white py-16 md:py-24 border-b border-white/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {related.length > 0 ? (
            <>
              <Reveal variant="slide-left" className="mb-10">
                <h2 className="text-2xl sm:text-4xl font-display font-bold tracking-tight leading-[1.08] uppercase text-white">
                  {t.article.relatedInsights}
                </h2>
              </Reveal>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {related.map((rawItem, idx) => {
                  const item = localizeArticle(rawItem);
                  return (
                    <Reveal
                      key={item.id}
                      variant={idx % 2 === 0 ? 'slide-left' : 'slide-down'}
                      delayMs={idx * 70}
                    >
                      <button
                        type="button"
                        onClick={() => onNavigate(`/insights/${item.slug}`)}
                        className="text-left group flex flex-col justify-between gap-4 transition-transform duration-300 hover:-translate-y-1"
                      >
                        <div>
                          <div className="aspect-[16/10] w-full overflow-hidden mb-4">
                            <OptimizedImage
                              src={getArticleCardImageUrl(item)}
                              alt={item.title}
                              width={720}
                              height={450}
                              containerClassName="w-full h-full"
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                          </div>
                          <div className="text-sm font-bold text-white/85 mb-2">
                            {item.category} · {item.publishedDate}
                          </div>
                          <h3 className="text-xl font-display font-bold text-white group-hover:text-white/85 transition-colors mb-2">
                            {item.title}
                          </h3>
                          <p className="text-base sm:text-lg text-white/90 leading-relaxed">
                            {item.excerpt}
                          </p>
                        </div>
                        <span className="inline-flex items-center gap-1 text-sm font-bold text-white">
                          {t.article.readFullArticle} <ArrowUpRight className="w-4 h-4 text-white" />
                        </span>
                      </button>
                    </Reveal>
                  );
                })}
              </div>
            </>
          ) : (
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <h2 className="text-2xl sm:text-4xl font-display font-bold tracking-tight leading-[1.08] uppercase text-white">
                {t.article.backToInsights}
              </h2>
              <button
                type="button"
                onClick={() => onNavigate('/insights')}
                className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-bold bg-white hover:bg-white/90 text-[#9E0E15] rounded-md transition-colors whitespace-nowrap shrink-0"
              >
                <ArrowLeft className="w-4 h-4" aria-hidden="true" />
                <span>{t.article.backToInsights}</span>
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
