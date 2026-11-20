import React from 'react';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { OptimizedImage } from '../components/OptimizedImage';
import { SeoHead } from '../components/SeoHead';
import { useCms } from '../context/CmsContext';

interface ArticlePageProps {
  slug: string;
  onNavigate: (path: string) => void;
}

export function ArticlePage({ slug, onNavigate }: ArticlePageProps) {
  const { articles } = useCms();
  const article = articles.find((a) => a.slug === slug);

  if (!article) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-28 text-center text-white">
        <SeoHead
          title="Article Not Found — Exponential Media Africa"
          description="The requested article could not be found."
          path={`/insights/${slug}`}
          noIndex
        />
        <h1 className="text-3xl font-display font-bold mb-4">Article Not Found</h1>
        <p className="text-sm text-neutral-400 mb-8">
          This publication may have been archived or unpublished.
        </p>
        <button
          type="button"
          onClick={() => onNavigate('/insights')}
          className="px-5 py-2.5 text-sm font-semibold bg-[#ED2126] hover:bg-[#D1191E] text-white rounded-lg"
        >
          Back to Insights
        </button>
      </div>
    );
  }

  const related = articles.filter((a) => a.slug !== article.slug).slice(0, 2);
  const paragraphs = article.body
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <div className="bg-[#0B0B0D] text-white">
      <SeoHead
        title={`${article.title} — Exponential Media Africa`}
        description={article.excerpt}
        path={`/insights/${article.slug}`}
        breadcrumbName={article.title}
        articleSchema={{
          headline: article.title,
          description: article.excerpt,
          authorName: article.authorName,
          datePublished: article.publishedDate,
          imageUrl: article.imageUrl,
        }}
      />

      <article className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 lg:py-20">
        <button
          type="button"
          onClick={() => onNavigate('/insights')}
          className="inline-flex items-center gap-2 text-xs font-medium text-neutral-400 hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Insights</span>
        </button>

        <div className="flex flex-wrap items-center gap-2.5 text-xs text-neutral-400 mb-4">
          <span className="text-[#FF1A1F] font-semibold">{article.category}</span>
          <span aria-hidden="true">·</span>
          <time dateTime={article.publishedDate}>{article.publishedDate}</time>
          <span aria-hidden="true">·</span>
          <span>{article.readTime}</span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-6xl font-display font-bold tracking-[-0.04em] leading-[1.02] [text-wrap:balance] max-w-4xl mb-6">
          {article.title}
        </h1>

        <div className="pb-6 mb-7 border-b border-white/10 text-sm text-neutral-300">
          By <span className="font-semibold text-white">{article.authorName}</span>
          {' · '}
          <span className="text-neutral-400">{article.authorRole}</span>
        </div>

        <div className="overflow-hidden border-y border-white/10 mb-8 sm:mb-12 aspect-[16/9] max-h-[560px] bg-[#141418]">
          <OptimizedImage
            src={article.imageUrl}
            alt={article.title}
            width={1200}
            height={720}
            priority
            containerClassName="w-full h-full"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Safe XSS-proof paragraph rendering without dangerouslySetInnerHTML */}
        <div className="space-y-6 text-base sm:text-lg text-neutral-200 leading-relaxed max-w-[68ch]">
          <p className="text-xl text-neutral-100 font-medium leading-relaxed">
            {article.excerpt}
          </p>
          {paragraphs.map((para, i) => (
            <p key={i} className="text-neutral-300 leading-relaxed">
              {para}
            </p>
          ))}
        </div>

        {/* Related Articles */}
        {related.length > 0 && (
          <section className="mt-20 pt-12 border-t border-white/10">
            <h2 className="text-2xl font-display font-bold text-white mb-6">
              Related Insights
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {related.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onNavigate(`/insights/${item.slug}`)}
                  className="text-left p-6 bg-[#141418] border border-white/10 rounded-xl hover:border-white/25 transition-colors flex flex-col justify-between gap-4"
                >
                  <div>
                    <div className="text-xs font-semibold text-[#FF1A1F] mb-2">
                      {item.category} · {item.publishedDate}
                    </div>
                    <h3 className="text-base font-display font-bold text-white mb-2">
                      {item.title}
                    </h3>
                  </div>
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-neutral-300">
                    Read Article <ArrowUpRight className="w-3.5 h-3.5 text-[#ED2126]" />
                  </span>
                </button>
              ))}
            </div>
          </section>
        )}
      </article>
    </div>
  );
}
