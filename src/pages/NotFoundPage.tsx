import React from 'react';
import { ArrowLeft, ArrowRight, Compass } from 'lucide-react';
import { SeoHead } from '../components/SeoHead';

interface NotFoundPageProps {
  path: string;
  onNavigate: (path: string) => void;
  onOpenInquiry: () => void;
}

export function NotFoundPage({ path, onNavigate, onOpenInquiry }: NotFoundPageProps) {
  return (
    <div className="bg-[#0B0B0D] text-white min-h-[75vh] flex items-center">
      <SeoHead
        title="Page Not Found — Exponential Media Africa"
        description="The requested page could not be found on Exponential Media Africa."
        path={path || '/404'}
        noIndex
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24 w-full">
        <div className="p-8 sm:p-12 bg-[#141418] border border-white/10 border-t-4 border-t-[#ED2126] rounded-2xl space-y-6">
          <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#FF1A1F]">
            <Compass className="w-4 h-4 text-[#ED2126]" aria-hidden="true" />
            <span>404 · PAGE NOT FOUND</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-display font-bold tracking-tight [text-wrap:balance]">
            That page does not exist or may have moved.
          </h1>

          <p className="text-base text-neutral-300 max-w-xl leading-relaxed">
            Explore our verified services, campaign portfolio, and Nairobi contact details using the links below.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              type="button"
              onClick={() => onNavigate('/')}
              className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold bg-[#ED2126] hover:bg-[#D1191E] text-white rounded-lg transition-colors"
            >
              <ArrowLeft className="w-4 h-4" aria-hidden="true" />
              <span>Return to Home</span>
            </button>
            <button
              type="button"
              onClick={() => onNavigate('/work')}
              className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold border border-white/20 text-white hover:bg-white/10 rounded-lg transition-colors"
            >
              <span>View Our Work</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={onOpenInquiry}
              className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-[#FF1A1F] hover:text-white transition-colors"
            >
              <span>Contact Our Team</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
