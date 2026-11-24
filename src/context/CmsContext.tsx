import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import {
  collection,
  doc,
  getDocFromServer,
  getDocs,
  query,
  where,
} from 'firebase/firestore';
import { normalizeLegacyServiceTitle } from '../lib/portfolio';
import {
  DEFAULT_ARTICLES,
  DEFAULT_CLIENT_LOGOS,
  DEFAULT_PORTFOLIO_PROJECTS,
  DEFAULT_SERVICES,
  DEFAULT_SITE_SETTINGS,
  DEFAULT_TEAM_MEMBERS,
  DEFAULT_TESTIMONIALS,
  OFFICIAL_BRAND_ASSETS,
} from '../data/seedData';
import { EXECUTIVE_DIRECTOR_PORTRAIT, PAGE_HERO_IMAGES } from '../data/pageHeroes';
import { db } from '../lib/firebase';
import {
  isSafeHttpOrLocalUrl,
  sanitizePlainText,
  sanitizeSiteSettings,
  sanitizeTestimonialRecord,
} from '../lib/validation';
import type {
  ClientLogo,
  InsightArticle,
  PortfolioProject,
  ServiceItem,
  SiteSettings,
  TeamMember,
  TestimonialItem,
} from '../types/cms';

interface CmsContextValue {
  settings: SiteSettings;
  projects: PortfolioProject[];
  services: ServiceItem[];
  articles: InsightArticle[];
  testimonials: TestimonialItem[];
  clientLogos: ClientLogo[];
  teamMembers: TeamMember[];
  loading: boolean;
  refreshPublicContent: () => Promise<void>;
}

const CmsContext = createContext<CmsContextValue | undefined>(undefined);

function sanitizeAssetUrl(url: string | undefined, fallback: string): string {
  if (!url || !url.trim()) return fallback;
  const trimmed = url.trim();
  if (!isSafeHttpOrLocalUrl(trimmed)) {
    return fallback;
  }
  if (
    trimmed.includes('/assets/aistudio/') &&
    trimmed !== OFFICIAL_BRAND_ASSETS.logoUrl &&
    trimmed !== OFFICIAL_BRAND_ASSETS.markUrl &&
    trimmed !== OFFICIAL_BRAND_ASSETS.aboutWhoWeAreUrl &&
    trimmed !== PAGE_HERO_IMAGES.insights &&
    trimmed !== PAGE_HERO_IMAGES.team &&
    trimmed !== EXECUTIVE_DIRECTOR_PORTRAIT
  ) {
    return fallback;
  }
  return trimmed;
}

export function CmsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<SiteSettings>(DEFAULT_SITE_SETTINGS);
  const [projects, setProjects] = useState<PortfolioProject[]>(DEFAULT_PORTFOLIO_PROJECTS);
  const [services, setServices] = useState<ServiceItem[]>(DEFAULT_SERVICES);
  const [articles, setArticles] = useState<InsightArticle[]>(DEFAULT_ARTICLES);
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>(DEFAULT_TESTIMONIALS);
  const [clientLogos, setClientLogos] = useState<ClientLogo[]>(DEFAULT_CLIENT_LOGOS);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(DEFAULT_TEAM_MEMBERS);
  const [loading, setLoading] = useState(false);

  const refreshPublicContent = useCallback(async () => {
    if (typeof navigator !== 'undefined' && navigator.onLine === false) {
      setLoading(false);
      return;
    }

    try {
      let timerId: ReturnType<typeof setTimeout> | undefined;
      const timeout = new Promise<never>((_, reject) => {
        timerId = setTimeout(() => reject(new Error('FIRESTORE_SYNC_TIMEOUT')), 3000);
      });

      const [
        settingsSnap,
        projectsSnap,
        servicesSnap,
        articlesSnap,
        testimonialsSnap,
        logosSnap,
        teamSnap,
      ] = await Promise.race([
        Promise.all([
          getDocFromServer(doc(db, 'site_settings', 'main')),
          getDocs(
            query(
              collection(db, 'portfolio_projects'),
              where('status', '==', 'published'),
              where('isDeleted', '==', false)
            )
          ),
          getDocs(
            query(
              collection(db, 'services'),
              where('status', '==', 'published'),
              where('isDeleted', '==', false)
            )
          ),
          getDocs(
            query(
              collection(db, 'articles'),
              where('status', '==', 'published'),
              where('isDeleted', '==', false)
            )
          ),
          getDocs(
            query(
              collection(db, 'testimonials'),
              where('status', '==', 'published'),
              where('isDeleted', '==', false)
            )
          ),
          getDocs(
            query(
              collection(db, 'client_logos'),
              where('status', '==', 'published'),
              where('isDeleted', '==', false)
            )
          ),
          getDocs(
            query(
              collection(db, 'team_members'),
              where('status', '==', 'published'),
              where('isDeleted', '==', false)
            )
          ),
        ]),
        timeout,
      ]).finally(() => {
        if (timerId) clearTimeout(timerId);
      });

      if (settingsSnap.exists()) {
        const remote = settingsSnap.data() as SiteSettings;
        const isLegacyPreProfileSeed =
          remote.secondaryPhone === '+254 734 331 221' ||
          remote.headquartersAddress === 'Casamia, Ngong Road, Kilimani, Nairobi, Kenya' ||
          remote.campusAddress === 'EMTC Campus, Off Naivasha Road, Nairobi, Kenya';
        if (!isLegacyPreProfileSeed) {
          setSettings(sanitizeSiteSettings(remote, DEFAULT_SITE_SETTINGS));
        }
      }
      if (!projectsSnap.empty) {
        const loadedProjects = projectsSnap.docs
          .map((d) => {
            const data = d.data() as Omit<PortfolioProject, 'id'>;
            const fallback =
              DEFAULT_PORTFOLIO_PROJECTS.find((p) => p.id === d.id || p.slug === data.slug)
                ?.imageUrl || OFFICIAL_BRAND_ASSETS.markUrl;
            return {
              id: d.id,
              ...data,
              title: sanitizePlainText(data.title),
              clientName: sanitizePlainText(data.clientName),
              summary: sanitizePlainText(data.summary),
              imageUrl: sanitizeAssetUrl(data.imageUrl, fallback),
            };
          })
          .filter((p) => !p.isPlaceholder);
        if (loadedProjects.length > 0) {
          setProjects(loadedProjects);
        }
      }
      if (!servicesSnap.empty) {
        const loadedServices = servicesSnap.docs
          .map((d) => {
            const data = d.data() as Omit<ServiceItem, 'id'>;
            return {
              id: d.id,
              ...data,
              title: normalizeLegacyServiceTitle(sanitizePlainText(data.title)),
            };
          })
          .sort((a, b) => a.order - b.order);
        const hasVerifiedSixServiceSet =
          loadedServices.some((s) => s.title === 'Media Buying') &&
          loadedServices.some((s) => s.title === 'Social Media Management');
        if (hasVerifiedSixServiceSet) {
          setServices(loadedServices);
        }
      }
      if (!articlesSnap.empty) {
        const loadedArticles = articlesSnap.docs
          .map((d) => {
            const data = d.data() as Omit<InsightArticle, 'id'>;
            const fallback =
              DEFAULT_ARTICLES.find((a) => a.id === d.id || a.slug === data.slug)?.imageUrl ||
              '/assets/profile/work/cinnamon-energies-identity.jpg';
            return {
              id: d.id,
              ...data,
              title: sanitizePlainText(data.title),
              excerpt: sanitizePlainText(data.excerpt),
              imageUrl: sanitizeAssetUrl(data.imageUrl, fallback),
            };
          })
          .sort((a, b) => b.publishedDate.localeCompare(a.publishedDate));
        if (loadedArticles.length > 0) {
          setArticles(loadedArticles);
        }
      }
      if (!testimonialsSnap.empty) {
        const verifiedTestimonials = testimonialsSnap.docs
          .map((d) =>
            sanitizeTestimonialRecord(d.id, d.data() as Omit<TestimonialItem, 'id'>)
          )
          .filter((t) => !t.isPlaceholder);
        setTestimonials(verifiedTestimonials);
      }
      if (!logosSnap.empty) {
        const loadedLogos = logosSnap.docs
          .map((d) => {
            const data = d.data() as Omit<ClientLogo, 'id'>;
            const fallback =
              DEFAULT_CLIENT_LOGOS.find((l) => l.id === d.id)?.logoUrl || '';
            return {
              id: d.id,
              ...data,
              name: sanitizePlainText(data.name),
              sector: sanitizePlainText(data.sector),
              region: data.region ? sanitizePlainText(data.region) : undefined,
              logoUrl: sanitizeAssetUrl(data.logoUrl, fallback),
            };
          })
          .filter((l) => !l.isPlaceholder && Boolean(l.logoUrl));
        if (loadedLogos.length > 0) {
          setClientLogos(loadedLogos);
        }
      }
      if (!teamSnap.empty) {
        const verifiedMembers = teamSnap.docs
          .map((d) => {
            const data = d.data() as Omit<TeamMember, 'id'>;
            return {
              id: d.id,
              ...data,
              name: sanitizePlainText(data.name),
              role: sanitizePlainText(data.role),
              division: sanitizePlainText(data.division),
              bio: sanitizePlainText(data.bio),
              photoUrl: data.photoUrl
                ? sanitizeAssetUrl(data.photoUrl, '')
                : undefined,
            };
          })
          .filter((m) => !m.isPlaceholder);
        setTeamMembers(verifiedMembers);
      }
    } catch (error) {
      console.warn('Using verified company profile defaults:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshPublicContent();
  }, [refreshPublicContent]);

  return (
    <CmsContext.Provider
      value={{
        settings,
        projects,
        services,
        articles,
        testimonials,
        clientLogos,
        teamMembers,
        loading,
        refreshPublicContent,
      }}
    >
      {children}
    </CmsContext.Provider>
  );
}

export function useCms() {
  const ctx = useContext(CmsContext);
  if (!ctx) {
    throw new Error('useCms must be used within CmsProvider');
  }
  return ctx;
}
