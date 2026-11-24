import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import {
  SW_ARTICLE_CATEGORIES,
  SW_ARTICLES,
  SW_CATEGORIES,
  SW_CORE_VALUES,
  SW_DIVISIONS,
  SW_IMPACT_LABELS,
  SW_PROJECTS,
  SW_SERVICE_DETAIL_EXTRAS,
  SW_SERVICE_SLUGS,
  SW_SERVICES,
  SW_TEAM_SLOTS,
  SW_TERRITORY_MARKETS,
} from '../data/swahiliContent';
import type { ServiceDetailRecord } from '../data/serviceDetails';
import { getUiStrings, normalizeLanguage, type Language, type UiStrings } from '../lib/i18n';
import { parseCountDisplay } from '../lib/motion';
import type {
  DivisionMeta,
  ImpactMetricConfig,
  InsightArticle,
  PortfolioCategory,
  PortfolioProject,
  ServiceItem,
} from '../types/cms';

const STORAGE_KEY = 'ema_language';

interface LanguageContextValue {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: UiStrings;
  localizeService: (srv: ServiceItem) => ServiceItem;
  localizeServiceTitle: (title: string) => string;
  localizeServiceBySlug: (slug: string, fallbackTitle: string) => string;
  localizeDivision: (div: DivisionMeta) => DivisionMeta;
  localizeProject: (project: PortfolioProject) => PortfolioProject;
  localizeArticle: (article: InsightArticle) => InsightArticle;
  localizeValue: <T extends { id: string; title: string; summary: string; detail: string }>(val: T) => T;
  localizeMarket: <T extends { country: string; role: string; notes: string }>(market: T) => T;
  localizeTeamSlot: <T extends { id: string; name: string; role: string; division: string; bio: string }>(
    member: T
  ) => T;
  localizeCategory: (category: 'All' | PortfolioCategory) => string;
  localizeArticleCategory: (category: string) => string;
  localizeImpactMetric: (metric: ImpactMetricConfig) => ImpactMetricConfig;
  localizeServiceDetail: (detail: ServiceDetailRecord) => ServiceDetailRecord;
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

function readInitialLanguage(): Language {
  if (typeof window === 'undefined') return 'en';
  try {
    return normalizeLanguage(window.localStorage.getItem(STORAGE_KEY));
  } catch {
    return 'en';
  }
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>(readInitialLanguage);

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = language;
    }
    try {
      window.localStorage.setItem(STORAGE_KEY, language);
    } catch {
      /* storage unavailable */
    }
  }, [language]);

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(normalizeLanguage(lang));
  }, []);

  const toggleLanguage = useCallback(() => {
    setLanguageState((prev) => (prev === 'en' ? 'sw' : 'en'));
  }, []);

  const value = useMemo<LanguageContextValue>(() => {
    const t = getUiStrings(language);
    const isSw = language === 'sw';

    return {
      language,
      setLanguage,
      toggleLanguage,
      t,
      localizeService: (srv) => {
        if (!isSw) return srv;
        const sw = SW_SERVICES[srv.title];
        return sw ? { ...srv, ...sw } : srv;
      },
      localizeServiceTitle: (title) => {
        if (!isSw) return title;
        return SW_SERVICES[title]?.title || title;
      },
      localizeServiceBySlug: (slug, fallbackTitle) => {
        if (!isSw) return fallbackTitle;
        return SW_SERVICE_SLUGS[slug] || SW_SERVICES[fallbackTitle]?.title || fallbackTitle;
      },
      localizeDivision: (div) => {
        if (!isSw) return div;
        const sw = SW_DIVISIONS[div.id];
        return sw ? { ...div, ...sw } : div;
      },
      localizeProject: (project) => {
        if (!isSw) return project;
        const sw = SW_PROJECTS[project.slug];
        const localizedCat =
          (SW_CATEGORIES[project.category] as PortfolioCategory | undefined) || project.category;
        return {
          ...project,
          title: sw?.title || project.title,
          summary: sw?.summary || project.summary,
          challenge: sw?.challenge || project.challenge,
          solution: sw?.solution || project.solution,
          deliverables: sw?.deliverables || project.deliverables,
          category: localizedCat,
        };
      },
      localizeArticle: (article) => {
        if (!isSw) return article;
        const sw = SW_ARTICLES[article.slug];
        return {
          ...article,
          title: sw?.title || article.title,
          excerpt: sw?.excerpt || article.excerpt,
          body: sw?.body || article.body,
          readTime: sw?.readTime || article.readTime,
          authorRole: sw?.authorRole || article.authorRole,
          category: (SW_ARTICLE_CATEGORIES[article.category] || article.category) as InsightArticle['category'],
        };
      },
      localizeValue: (val) => {
        if (!isSw) return val;
        const sw = SW_CORE_VALUES[val.id];
        return sw ? { ...val, ...sw } : val;
      },
      localizeMarket: (market) => {
        if (!isSw) return market;
        const sw = SW_TERRITORY_MARKETS[market.country];
        return sw ? { ...market, ...sw } : market;
      },
      localizeTeamSlot: (member) => {
        if (!isSw) return member;
        const sw = SW_TEAM_SLOTS[member.id];
        return sw ? { ...member, ...sw } : member;
      },
      localizeCategory: (category) => {
        if (!isSw) return category;
        return SW_CATEGORIES[category] || category;
      },
      localizeArticleCategory: (category) => {
        if (!isSw) return category;
        return SW_ARTICLE_CATEGORIES[category] || category;
      },
      localizeImpactMetric: (metric) => {
        if (!isSw) return metric;
        const sw = SW_IMPACT_LABELS[metric.id];
        if (!sw) return metric;
        const parsed = parseCountDisplay(metric.value);
        const localizedValue =
          parsed.target !== null
            ? `${sw.prefix || ''}${parsed.target}${sw.suffix || ''}`
            : metric.value;
        return {
          ...metric,
          label: sw.label,
          unitOrContext: sw.unitOrContext,
          value: localizedValue,
        };
      },
      localizeServiceDetail: (detail) => {
        if (!isSw) return detail;
        const swExtra = SW_SERVICE_DETAIL_EXTRAS[detail.slug];
        const swServiceTitle = SW_SERVICE_SLUGS[detail.slug] || detail.title;
        return {
          ...detail,
          title: swServiceTitle as ServiceDetailRecord['title'],
          tagline: swExtra?.tagline || detail.tagline,
          heroSummary: swExtra?.heroSummary || detail.heroSummary,
          extendedOverview: swExtra?.extendedOverview || detail.extendedOverview,
          idealFor: swExtra?.idealFor || detail.idealFor,
          metricsTracked: swExtra?.metricsTracked || detail.metricsTracked,
        };
      },
    };
  }, [language, setLanguage, toggleLanguage]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return ctx;
}
