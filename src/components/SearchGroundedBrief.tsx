import React, { useState } from 'react';
import { ExternalLink, Loader2, Search } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { isSafeExternalHttpUrl, sanitizePlainText } from '../lib/validation';

interface GroundedSource {
  title: string;
  uri: string;
}

interface ResearchResult {
  answer: string;
  sources: GroundedSource[];
}

interface SearchGroundedBriefProps {
  surface?: 'red' | 'light';
}

export function SearchGroundedBrief({ surface = 'red' }: SearchGroundedBriefProps) {
  const { t } = useLanguage();
  const [topic, setTopic] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<ResearchResult | null>(null);

  const isLight = surface === 'light';

  const runResearch = async (queryText: string) => {
    const trimmed = queryText.trim();
    if (trimmed.length < 4) {
      setError('Please enter at least 4 characters to run a Search-grounded research brief.');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/insights/research', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: trimmed }),
      });
      const json = await res.json();
      if (!res.ok) {
        setError(json.error || 'Unable to complete live Search-grounded research.');
        return;
      }
      const safeSources = Array.isArray(json.sources)
        ? json.sources
            .filter(
              (src: unknown): src is GroundedSource =>
                Boolean(src) &&
                typeof src === 'object' &&
                typeof (src as GroundedSource).uri === 'string' &&
                isSafeExternalHttpUrl((src as GroundedSource).uri)
            )
            .map((src: GroundedSource) => ({
              uri: src.uri.trim(),
              title: sanitizePlainText(src.title || '') || src.uri.trim(),
            }))
        : [];
      setResult({
        answer: typeof json.answer === 'string' ? json.answer : '',
        sources: safeSources,
      });
    } catch {
      setError('Network error while running live Search research. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    runResearch(topic);
  };

  return (
    <div aria-label={t.research.heading} className="py-4 space-y-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="max-w-3xl space-y-3">
          <h2
            className={`text-2xl sm:text-4xl font-display font-bold tracking-tight leading-[1.08] uppercase [text-wrap:balance] ${
              isLight ? 'text-[#B81118]' : 'text-white'
            }`}
          >
            {t.research.heading}
          </h2>
          <p
            className={`text-base sm:text-lg leading-relaxed ${
              isLight ? 'text-[#4A2527]' : 'text-white/95'
            }`}
          >
            {t.research.subtitle}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search
            className={`w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 ${
              isLight ? 'text-[#B81118]' : 'text-[#5C3A3C]'
            }`}
            aria-hidden="true"
          />
          <label htmlFor="search-grounded-query" className="sr-only">
            {t.research.heading}
          </label>
          <input
            id="search-grounded-query"
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder={t.research.placeholder}
            maxLength={300}
            className={`w-full pl-10 pr-4 py-3 text-sm bg-white rounded-lg text-[#1A0809] placeholder:text-[#5C3A3C]/70 focus:outline-none ${
              isLight ? 'border border-[#B81118]/30 focus:border-[#ED1B24]' : 'border border-white'
            }`}
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className={`inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-bold disabled:opacity-60 rounded-lg transition-colors whitespace-nowrap shrink-0 ${
            isLight
              ? 'bg-[#ED1B24] hover:bg-[#B81118] text-white'
              : 'bg-white hover:bg-white/90 text-[#B81118]'
          }`}
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
              <span>{t.research.researching}</span>
            </>
          ) : (
            <span>{t.research.researchBtn}</span>
          )}
        </button>
      </form>

      <div className="flex flex-wrap items-center gap-3">
        <span className={`text-sm font-semibold ${isLight ? 'text-[#B81118]' : 'text-white/80'}`}>
          {t.research.tryLabel}
        </span>
        {t.research.topics.map((suggestion) => (
          <button
            key={suggestion}
            type="button"
            disabled={loading}
            onClick={() => {
              setTopic(suggestion);
              runResearch(suggestion);
            }}
            className={`text-sm transition-colors text-left ${
              isLight ? 'text-[#4A2527] hover:text-[#B81118]' : 'text-white/90 hover:text-white'
            }`}
          >
            {suggestion}
          </button>
        ))}
      </div>

      {error && (
        <div
          role="alert"
          className={`p-4 rounded-lg text-sm font-semibold ${
            isLight ? 'bg-[#B81118]/10 text-[#9E0E15]' : 'bg-white text-[#9E0E15]'
          }`}
        >
          {error}
        </div>
      )}

      {result && (
        <div className="pt-4 space-y-5">
          <div
            className={`space-y-3 text-base sm:text-lg leading-relaxed whitespace-pre-line ${
              isLight ? 'text-[#2A1214]' : 'text-white/95'
            }`}
          >
            {result.answer}
          </div>

          {result.sources.length > 0 && (
            <div className="pt-2 space-y-2.5">
              <div
                className={`text-sm font-semibold ${isLight ? 'text-[#B81118]' : 'text-white/85'}`}
              >
                {t.research.sourcesLabel}
              </div>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {result.sources.map((src) => (
                  <li key={src.uri}>
                    <a
                      href={src.uri}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center justify-between gap-2 py-1.5 text-sm font-semibold hover:opacity-80 transition-opacity ${
                        isLight ? 'text-[#B81118]' : 'text-white'
                      }`}
                    >
                      <span className="truncate">{src.title || src.uri}</span>
                      <ExternalLink className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
