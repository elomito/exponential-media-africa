import React, { useMemo, useState } from 'react';
import { ArrowUpRight, Search } from 'lucide-react';
import { OptimizedImage } from '../components/OptimizedImage';
import { SearchGroundedBrief } from '../components/SearchGroundedBrief';
import { SeoHead } from '../components/SeoHead';
import { useCms } from '../context/CmsContext';
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
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'All' | ArticleCategory>('All');

  const featuredArticle = useMemo(
    () => articles.find((a) => a.featured) || articles[0],
    [articles]
  );

  const filteredArticles = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return articles.filter((a) => {
      const matchesCat = selectedCategory === 'All' || a.category === selectedCategory;
      const matchesQuery =
        !q ||
        a.title.toLowerCase().includes(q) ||
        a.excerpt.toLowerCase().includes(q) ||
        a.authorName.toLowerCase().includes(q);
      return matchesCat && matchesQuery;
    });
  }, [articles, selectedCategory, searchQuery]);

  return (
    <div className="bg-[#0B0B0D] text-white">
      <SeoHead
        title="Insights — Exponential Media Africa"
        description="Industry articles, marketing insights, creative trends, company updates, and educational perspectives from Exponential Media Africa in Nairobi."
        path="/insights"
      />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 lg:pt-20 pb-10 sm:pb-14 border-b border-white/10">
        <p className="inline-flex items-center gap-2.5 text-xs font-semibold tracking-[0.14em] uppercase text-[#FF1A1F] mb-4">
          <span className="w-5 h-0.5 bg-[#ED2126]" aria-hidden="true" />
          <span>Insights &amp; Publications</span>
        </p>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold tracking-tight max-w-4xl leading-[1.04] [text-wrap:balance] mb-6 sm:mb-8">
          Perspectives on African brands, studios, and growth.
        </h1>

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div
            role="group"
            aria-label="Filter articles by category"
            className="flex flex-wrap gap-1.5 p-1.5 bg-[#141418] border border-white/10 rounded-xl"
          >
            {(['All', ...ARTICLE_CATEGORIES] as const).map((cat) => (
              <button
                key={cat}
                type="button"
                aria-pressed={selectedCategory === cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-2 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-[#ED2126] text-white font-semibold'
                    : 'text-neutral-300 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full lg:w-80">
            <Search
              className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2"
              aria-hidden="true"
            />
            <label htmlFor="insights-search" className="sr-only">
              Search insights articles
            </label>
            <input
              id="insights-search"
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search articles, topics, authors..."
              className="w-full pl-10 pr-4 py-2.5 text-sm bg-[#141418] border border-white/15 rounded-xl text-white placeholder:text-neutral-500 focus:border-[#ED2126] focus:outline-none"
            />
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 space-y-16">
        <SearchGroundedBrief />

        {/* Featured Spotlight */}
        {featuredArticle && selectedCategory === 'All' && !searchQuery && (
          <article className="grid grid-cols-1 lg:grid-cols-12 gap-0 border-y border-white/20 overflow-hidden items-stretch">
            <div className="lg:col-span-7 aspect-[4/3] lg:aspect-auto lg:min-h-[420px]">
              <OptimizedImage
                src={featuredArticle.imageUrl}
                alt={featuredArticle.title}
                width={960}
                height={640}
                priority
                containerClassName="w-full h-full"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="lg:col-span-5 py-7 sm:py-10 lg:pl-10 flex flex-col justify-between">
              <div>
                <div className="flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-[0.12em] text-neutral-400 mb-5">
                  <span className="text-[#FF1A1F] font-semibold">Featured</span>
                  <span aria-hidden="true">·</span>
                  <span>{featuredArticle.category}</span>
                  <span aria-hidden="true">·</span>
                  <time dateTime={featuredArticle.publishedDate}>
                    {featuredArticle.publishedDate}
                  </time>
                  <span aria-hidden="true">·</span>
                  <span>{featuredArticle.readTime}</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-[-0.035em] leading-[1.04] mb-5">
                  {featuredArticle.title}
                </h2>
                <p className="text-base sm:text-lg text-neutral-300 leading-relaxed mb-7">
                  {featuredArticle.excerpt}
                </p>
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-white/10">
                <div className="text-xs text-neutral-400">
                  <span className="text-neutral-200 font-medium">{featuredArticle.authorName}</span>
                  {' · '}
                  <span>{featuredArticle.authorRole}</span>
                </div>
                <button
                  type="button"
                  onClick={() => onNavigate(`/insights/${featuredArticle.slug}`)}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#FF1A1F] hover:text-white transition-colors"
                >
                  <span>Read Article</span>
                  <ArrowUpRight className="w-4 h-4 text-[#ED2126]" />
                </button>
              </div>
            </div>
          </article>
        )}

        {/* Article Grid */}
        {filteredArticles.length === 0 ? (
          <div className="p-12 text-center bg-[#141418] border border-white/10 rounded-2xl">
            <p className="text-sm text-neutral-300 mb-4">
              No articles matched your current filter or search term.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}
              className="px-4 py-2 text-xs font-semibold bg-[#ED2126] text-white rounded-lg"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="divide-y divide-white/15 border-y border-white/15">
            {filteredArticles.map((article, index) => (
              <article
                key={article.id}
                className="group"
              >
                <button
                  type="button"
                  onClick={() => onNavigate(`/insights/${article.slug}`)}
                  className="text-left w-full flex flex-col sm:flex-row gap-5 sm:gap-8 py-6 sm:py-8"
                >
                  <div className="aspect-[16/10] w-full sm:w-[34%] sm:shrink-0 overflow-hidden bg-[#141418]">
                    <OptimizedImage
                      src={article.imageUrl}
                      alt={article.title}
                      width={720}
                      height={480}
                      containerClassName="w-full h-full"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.025] motion-reduce:transform-none"
                    />
                  </div>
                  <div className="flex-1 flex flex-col justify-center">
                    <div>
                      <div className="flex flex-wrap items-center gap-2 text-[10px] uppercase tracking-[0.12em] text-neutral-400 mb-3">
                        <span className="font-mono text-neutral-500">{String(index + 1).padStart(2, '0')}</span>
                        <span aria-hidden="true">/</span>
                        <span className="text-[#FF1A1F] font-semibold">{article.category}</span>
                        <span aria-hidden="true">·</span>
                        <time dateTime={article.publishedDate}>{article.publishedDate}</time>
                        <span aria-hidden="true">·</span>
                        <span>{article.readTime}</span>
                      </div>
                      <h3 className="text-xl sm:text-2xl font-display font-bold text-white tracking-tight mb-3 group-hover:text-[#FF1A1F] transition-colors">
                        {article.title}
                      </h3>
                      <p className="text-sm text-neutral-300 leading-relaxed line-clamp-3">
                        {article.excerpt}
                      </p>
                    </div>
                    <div className="pt-4 mt-5 flex items-center justify-between text-xs text-neutral-400">
                      <span>{article.authorName} · {article.authorRole}</span>
                      <ArrowUpRight className="w-4 h-4 text-[#ED2126]" />
                    </div>
                  </div>
                </button>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
