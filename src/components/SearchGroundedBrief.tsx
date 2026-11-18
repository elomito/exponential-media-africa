import React, { useState } from 'react';
import { ExternalLink, Globe, Loader2, Search } from 'lucide-react';

interface GroundedSource {
  title: string;
  uri: string;
}

interface ResearchResult {
  answer: string;
  sources: GroundedSource[];
}

const SUGGESTED_TOPICS = [
  'Digital marketing and social commerce trends in Kenya 2026',
  'Corporate podcasting and video storytelling growth in East Africa',
  'Experiential brand activation strategies in Nairobi retail',
];

export function SearchGroundedBrief() {
  const [topic, setTopic] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<ResearchResult | null>(null);

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
      setResult({
        answer: json.answer || '',
        sources: Array.isArray(json.sources) ? json.sources : [],
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
    <section
      aria-label="Live Search-Grounded Market Research"
      className="p-6 sm:p-8 bg-[#141418] border border-white/15 rounded-2xl space-y-6"
    >
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="max-w-2xl space-y-2">
          <div className="inline-flex items-center gap-2 text-xs font-bold tracking-wide text-[#FF1A1F]">
            <Globe className="w-4 h-4 text-[#FF1A1F]" aria-hidden="true" />
            <span>Live Industry Intelligence · Grounded with Google Search</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight">
            Research current East African media &amp; marketing trends
          </h2>
          <p className="text-sm text-neutral-300 leading-relaxed">
            Query live industry context across Kenyan marketing, production, and creative education with verifiable web source citations.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search
            className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2"
            aria-hidden="true"
          />
          <label htmlFor="search-grounded-query" className="sr-only">
            Market or creative industry topic
          </label>
          <input
            id="search-grounded-query"
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="e.g., Influencer marketing regulation and creator rates in Kenya..."
            maxLength={300}
            className="w-full pl-10 pr-4 py-3 text-sm bg-[#0B0B0D] border border-white/15 rounded-xl text-white placeholder:text-neutral-500 focus:border-[#ED2126] focus:outline-none"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold bg-[#ED2126] hover:bg-[#D1191E] disabled:opacity-60 text-white rounded-xl transition-colors whitespace-nowrap shrink-0"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
              <span>Researching...</span>
            </>
          ) : (
            <span>Research Topic</span>
          )}
        </button>
      </form>

      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs text-neutral-400">Try:</span>
        {SUGGESTED_TOPICS.map((suggestion) => (
          <button
            key={suggestion}
            type="button"
            disabled={loading}
            onClick={() => {
              setTopic(suggestion);
              runResearch(suggestion);
            }}
            className="text-xs px-3 py-1.5 rounded-lg bg-[#0B0B0D] border border-white/10 hover:border-[#ED2126]/60 text-neutral-300 hover:text-white transition-colors text-left"
          >
            {suggestion}
          </button>
        ))}
      </div>

      {error && (
        <div
          role="alert"
          className="p-4 rounded-xl bg-rose-950/50 border border-rose-500/40 text-xs text-rose-200"
        >
          {error}
        </div>
      )}

      {result && (
        <div className="p-6 rounded-xl bg-[#0B0B0D] border border-white/10 space-y-5">
          <div className="space-y-3 text-sm text-neutral-200 leading-relaxed whitespace-pre-line">
            {result.answer}
          </div>

          {result.sources.length > 0 && (
            <div className="pt-4 border-t border-white/10 space-y-2.5">
              <div className="text-xs font-semibold text-neutral-400">
                Verified Google Search Sources
              </div>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {result.sources.map((src) => (
                  <li key={src.uri}>
                    <a
                      href={src.uri}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between gap-2 px-3 py-2 rounded-lg bg-[#141418] border border-white/10 hover:border-[#ED2126]/60 text-xs font-semibold text-[#FF1A1F] hover:text-white transition-colors"
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
    </section>
  );
}
