import React, { useMemo, useState } from 'react';
import { ArrowUpRight, Search } from 'lucide-react';
import { OptimizedImage } from '../components/OptimizedImage';
import { Reveal } from '../components/ScrollReveal';
import { SearchGroundedBrief } from '../components/SearchGroundedBrief';
import { SeoHead } from '../components/SeoHead';
import { useCms } from '../context/CmsContext';
import { useLanguage } from '../context/LanguageContext';
import { PAGE_HERO_IMAGES } from '../data/pageHeroes';
import { getArticleCardImageUrl } from '../data/cardImages';
import type { ArticleCategory } from '../types/cms';

interface InsightsPageProps {
  onNavigate: (path: string) => void;
}

const ARTICLE_CATEGORIES: ArticleCategory[] = [
  'Industry Articles',
  'Marketing Insights',
  'Creative Trends',
  'Company Updates',
  'Educational Content',
];

export function InsightsPage({ onNavigate }: InsightsPageProps) {
  const { articles } = useCms();
  const { t, localizeArticle, localizeArticleCategory } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'All' | ArticleCategory>('All');

  const featuredArticle = useMemo(
    () => articles.find((a) => a.featured) || articles[0],
    [articles]
  );

  const filteredArticles = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return articles.filter((a) => {
      const loc = localizeArticle(a);
      const matchesCat = selectedCategory === 'All' || a.category === selectedCategory;
      const matchesQuery =
        !q ||
        a.title.toLowerCase().includes(q) ||
        loc.title.toLowerCase().includes(q) ||
        a.excerpt.toLowerCase().includes(q) ||
        loc.excerpt.toLowerCase().includes(q) ||
        a.body.toLowerCase().includes(q) ||
        loc.body.toLowerCase().includes(q) ||
        a.authorName.toLowerCase().includes(q);
      return matchesCat && matchesQuery;
    });
  }, [articles, selectedCategory, searchQuery, localizeArticle]);

  const rawSpotlight =
    featuredArticle && selectedCategory === 'All' && !searchQuery
      ? featuredArticle
      : filteredArticles[0];
  const spotlightArticle = rawSpotlight ? localizeArticle(rawSpotlight) : undefined;

  const feedArticles = useMemo(() => {
    if (!rawSpotlight) return filteredArticles;
    const remaining = filteredArticles.filter((a) => a.id !== rawSpotlight.id);
    return remaining.length > 0 ? remaining : filteredArticles;
  }, [filteredArticles, rawSpotlight]);

  const titleWords = t.insights.heroTitle.trim().split(/\s+/);
  const splitIdx = Math.max(1, titleWords.length - 2);
  const titleLead = titleWords.slice(0, splitIdx).join(' ');
  const titleAccent = titleWords.slice(splitIdx).join(' ');

  return (
    <div>
      <SeoHead
        title={t.seo.insightsTitle}
        description={t.seo.insightsDescription}
        path="/insights"
        imageUrl={PAGE_HERO_IMAGES.insights}
        imageAlt="Exponential Marketing Agency strategist with East African marketing analytics"
        schemaType="CollectionPage"
        breadcrumbName={t.nav.insights}
      />

      <section className="relative bg-[#EAECEF] text-[#141923] overflow-hidden border-b-4 border-[#B81118] min-h-[380px] sm:min-h-[440px] lg:min-h-[min(600px,calc(100svh-4.5rem))] flex items-center">
        <div className="lg:hidden absolute inset-0 pointer-events-none select-none hero-media-enter">
          <OptimizedImage
            src={PAGE_HERO_IMAGES.insights}
            alt="Exponential Marketing Agency strategist with growth analytics, pie chart, megaphone, lightbulb concept, and branded mug"
            priority
            width={1365}
            height={768}
            containerClassName="w-full h-full"
            className="w-full h-full object-cover object-[24%_top] -scale-x-100"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-r from-[#EFF1F4]/95 via-[#EAECEF]/84 via-60% to-[#EAECEF]/30"
          />
        </div>

        <div className="hidden lg:block absolute inset-0 pointer-events-none select-none hero-media-enter">
          <OptimizedImage
            src={PAGE_HERO_IMAGES.insights}
            alt="Exponential Marketing Agency strategist with growth analytics, pie chart, megaphone, lightbulb concept, and branded mug"
            priority
            width={1365}
            height={768}
            containerClassName="w-full h-full"
            className="w-full h-full object-cover object-top -scale-x-100"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-r from-[#EFF1F4]/92 via-[#EAECEF]/68 via-48% to-transparent to-65%"
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-14">
          <div className="max-w-[86%] sm:max-w-[70%] lg:max-w-none lg:w-[53%] xl:w-[51%]">
            <h1 className="text-[2.3rem] sm:text-5xl lg:text-[4.25rem] xl:text-[4.65rem] font-display font-bold tracking-[-0.04em] leading-[0.98] [text-wrap:balance] mb-4 sm:mb-6">
              <span className="hero-slide-left block text-[#141923]">{titleLead}</span>
              <span className="hero-slide-left-delay-1 block text-[#ED1B24]">{titleAccent}</span>
            </h1>
            <p className="hero-slide-left-delay-2 text-sm sm:text-lg text-[#2A1214] leading-relaxed max-w-xl">
              {t.insights.heroSubtitle}
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[#B81118] text-white py-14 md:py-18">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <Reveal variant="slide-down" className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div
              role="group"
              aria-label="Filter articles by category"
              className="flex flex-wrap gap-2"
            >
              {(['All', ...ARTICLE_CATEGORIES] as const).map((cat) => {
                const active = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    aria-pressed={active}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3.5 py-2 text-xs sm:text-sm rounded-lg transition-all whitespace-nowrap shrink-0 ${
                      active
                        ? 'bg-white text-[#9E0E15] font-bold shadow-sm'
                        : 'bg-white/15 hover:bg-white/25 text-white border border-white/25 font-semibold'
                    }`}
                  >
                    {localizeArticleCategory(cat)}
                  </button>
                );
              })}
            </div>

            <div className="relative w-full lg:w-80 shrink-0">
              <Search
                className="w-4 h-4 text-[#ED1B24] absolute left-3.5 top-1/2 -translate-y-1/2"
                aria-hidden="true"
              />
              <label htmlFor="insights-search" className="sr-only">
                {t.insights.searchPlaceholder}
              </label>
              <input
                id="insights-search"
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t.insights.searchPlaceholder}
                className="w-full pl-10 pr-4 py-2.5 text-sm bg-white border border-white rounded-lg text-[#141923] placeholder:text-[#5C3A3C]/70 focus:outline-none focus:ring-2 focus:ring-white/40 shadow-sm"
              />
            </div>
          </Reveal>

          {spotlightArticle ? (
            <article className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 overflow-hidden items-center">
              <Reveal variant="slide-left" className="lg:col-span-6 aspect-[4/3]">
                <OptimizedImage
                  src={getArticleCardImageUrl(spotlightArticle)}
                  alt={spotlightArticle.title}
                  width={960}
                  height={640}
                  priority
                  containerClassName="w-full h-full"
                  className="w-full h-full object-cover"
                />
              </Reveal>
              <Reveal variant="slide-down" delayMs={90} className="lg:col-span-6 flex flex-col justify-between space-y-6">
                <div>
                  <div className="flex flex-wrap items-center gap-2 text-sm text-white/85 mb-4">
                    <span className="text-white font-bold">{spotlightArticle.category}</span>
                    <span aria-hidden="true">·</span>
                    <time dateTime={spotlightArticle.publishedDate}>
                      {spotlightArticle.publishedDate}
                    </time>
                    <span aria-hidden="true">·</span>
                    <span>{spotlightArticle.readTime}</span>
                  </div>
                  <h2 className="text-2xl sm:text-4xl font-display font-bold text-white tracking-tight leading-[1.08] uppercase mb-5">
                    {spotlightArticle.title}
                  </h2>
                  <p className="text-base sm:text-lg text-white/95 leading-relaxed mb-7">
                    {spotlightArticle.excerpt}
                  </p>
                </div>
                <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                  <div className="text-sm text-white/85">
                    <span className="text-white font-semibold">
                      {spotlightArticle.authorName}
                    </span>
                    {' · '}
                    <span>{spotlightArticle.authorRole}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => onNavigate(`/insights/${spotlightArticle.slug}`)}
                    className="inline-flex items-center gap-2 px-5 py-3 text-sm font-bold bg-white hover:bg-white/90 text-[#9E0E15] rounded-md transition-all duration-300 hover:-translate-y-0.5 whitespace-nowrap shrink-0"
                  >
                    <span>{t.insights.readFullArticle}</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              </Reveal>
            </article>
          ) : (
            <div className="py-12 text-center">
              <p className="text-base sm:text-lg text-white/90 mb-4 leading-relaxed">
                {t.insights.noMatch}
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All');
                }}
                className="px-5 py-2.5 text-sm font-bold bg-white text-[#9E0E15] hover:bg-white/90 rounded-md"
              >
                {t.insights.resetFilters}
              </button>
            </div>
          )}
        </div>
      </section>

      <section className="bg-white text-[#2A1214] py-20 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <Reveal variant="slide-left">
            <h2 className="text-2xl sm:text-4xl font-display font-bold tracking-tight leading-[1.08] uppercase text-[#B81118]">
              {t.insights.latestDispatches}
            </h2>
          </Reveal>

          {feedArticles.length === 0 ? (
            <div className="py-8">
              <p className="text-base sm:text-lg text-[#4A2527] mb-4 leading-relaxed">
                {t.insights.noAdditional}
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All');
                }}
                className="px-4 py-2 text-sm font-bold bg-[#ED1B24] hover:bg-[#B81118] text-white rounded-md"
              >
                {t.insights.showAll}
              </button>
            </div>
          ) : (
            <div key={selectedCategory} className="route-enter grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 items-stretch">
              {feedArticles.map((rawArticle, idx) => {
                const article = localizeArticle(rawArticle);
                return (
                  <Reveal
                    key={article.id}
                    variant={idx % 2 === 0 ? 'slide-left' : 'slide-down'}
                    delayMs={idx * 70}
                    className="flex flex-col"
                  >
                    <article className="group flex flex-col flex-1 transition-transform duration-300 hover:-translate-y-1">
                      <button
                        type="button"
                        onClick={() => onNavigate(`/insights/${article.slug}`)}
                        className="text-left flex-1 flex flex-col"
                      >
                        <div className="aspect-[16/10] w-full overflow-hidden mb-5 bg-[#F4F5F7]">
                          <OptimizedImage
                            src={getArticleCardImageUrl(article)}
                            alt={article.title}
                            width={720}
                            height={450}
                            containerClassName="w-full h-full"
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03] motion-reduce:transform-none"
                          />
                        </div>
                        <div className="flex-1 flex flex-col justify-between">
                          <div>
                            <div className="flex flex-wrap items-center gap-2 text-sm text-[#4A2527] mb-3">
                              <span className="text-[#B81118] font-bold">{article.category}</span>
                              <span aria-hidden="true">·</span>
                              <time dateTime={article.publishedDate}>{article.publishedDate}</time>
                              <span aria-hidden="true">·</span>
                              <span>{article.readTime}</span>
                            </div>
                            <h3 className="text-xl sm:text-2xl font-display font-bold text-[#B81118] tracking-tight mb-3 group-hover:text-[#ED1B24] transition-colors">
                              {article.title}
                            </h3>
                            <p className="text-base sm:text-lg text-[#4A2527] leading-relaxed line-clamp-3">
                              {article.excerpt}
                            </p>
                          </div>
                          <div className="pt-4 mt-4 flex items-center justify-between text-sm font-bold text-[#B81118]">
                            <span>{t.insights.readFullArticle}</span>
                            <ArrowUpRight className="w-4 h-4 text-[#ED1B24] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                          </div>
                        </div>
                      </button>
                    </article>
                  </Reveal>
                );
              })}
            </div>
          )}
        </div>
      </section>

      <section className="bg-[#B81118] text-white py-20 md:py-24 border-b border-white/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal variant="slide-left">
            <SearchGroundedBrief surface="red" />
          </Reveal>
        </div>
      </section>
    </div>
  );
}
