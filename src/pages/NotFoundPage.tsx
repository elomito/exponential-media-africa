import React from 'react';
import { ArrowLeft, ArrowRight, Compass } from 'lucide-react';
import { SeoHead } from '../components/SeoHead';
import { useLanguage } from '../context/LanguageContext';

interface NotFoundPageProps {
  path: string;
  onNavigate: (path: string) => void;
  onOpenInquiry: () => void;
}

export function NotFoundPage({ path, onNavigate, onOpenInquiry }: NotFoundPageProps) {
  const { t } = useLanguage();

  return (
    <div className="bg-[#B81118] text-white min-h-[75vh] flex items-center">
      <SeoHead
        title={t.seo.notFoundTitle}
        description={t.seo.notFoundDescription}
        path={path || '/404'}
        noIndex
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24 w-full">
        <div className="py-8 space-y-6">
          <div className="inline-flex items-center gap-2 text-base font-bold text-white/90">
            <Compass className="w-5 h-5 text-white" aria-hidden="true" />
            <span>{t.notFound.badge}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-display font-bold tracking-tight [text-wrap:balance]">
            {t.notFound.heading}
          </h1>

          <p className="text-base sm:text-lg text-white/90 max-w-xl leading-relaxed">
            {t.notFound.body}
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              type="button"
              onClick={() => onNavigate('/')}
              className="inline-flex items-center gap-2 px-5 py-3 text-sm font-bold bg-white hover:bg-white/90 text-[#9E0E15] rounded-lg transition-colors"
            >
              <ArrowLeft className="w-4 h-4" aria-hidden="true" />
              <span>{t.notFound.returnHome}</span>
            </button>
            <button
              type="button"
              onClick={() => onNavigate('/work')}
              className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold border border-white/40 text-white hover:bg-white/10 rounded-lg transition-colors"
            >
              <span>{t.notFound.viewWork}</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={onOpenInquiry}
              className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-white hover:opacity-80 transition-opacity"
            >
              <span>{t.notFound.contactTeam}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
