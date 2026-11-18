import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from 'firebase/firestore';
import {
  DEFAULT_ARTICLES,
  DEFAULT_CLIENT_LOGOS,
  DEFAULT_PORTFOLIO_PROJECTS,
  DEFAULT_SERVICES,
  DEFAULT_SITE_SETTINGS,
  DEFAULT_TEAM_MEMBERS,
  DEFAULT_TESTIMONIALS,
} from '../data/seedData';
import { db, verifyFirestoreConnection } from '../lib/firebase';
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

function cleanSocialLink(url?: string): string {
  if (!url) return '';
  const trimmed = url.trim();
  if (
    !trimmed ||
    trimmed === 'https://exponentialmedia.africa/' ||
    trimmed === 'https://exponentialmedia.africa'
  ) {
    return '';
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
  const [loading, setLoading] = useState(true);

  const refreshPublicContent = useCallback(async () => {
    try {
      const connected = await verifyFirestoreConnection();
      if (!connected) {
        return;
      }

      const [
        settingsSnap,
        projectsSnap,
        servicesSnap,
        articlesSnap,
        testimonialsSnap,
        logosSnap,
        teamSnap,
      ] = await Promise.all([
        getDoc(doc(db, 'site_settings', 'main')),
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
      ]);

      if (settingsSnap.exists()) {
        const remote = settingsSnap.data() as SiteSettings;
        const isLegacyPreProfileSeed =
          remote.secondaryPhone === '+254 734 331 221' ||
          remote.headquartersAddress === 'Casamia, Ngong Road, Kilimani, Nairobi, Kenya' ||
          remote.campusAddress === 'EMTC Campus, Off Naivasha Road, Nairobi, Kenya';
        if (!isLegacyPreProfileSeed) {
          setSettings({
            ...DEFAULT_SITE_SETTINGS,
            ...remote,
            campusAddress: '',
            socialLinks: {
              instagram: cleanSocialLink(remote.socialLinks?.instagram),
              linkedin: cleanSocialLink(remote.socialLinks?.linkedin),
              youtube: cleanSocialLink(remote.socialLinks?.youtube),
              x: cleanSocialLink(remote.socialLinks?.x),
            },
          });
        }
      }
      if (!projectsSnap.empty) {
        const loadedProjects = projectsSnap.docs
          .map((d) => ({ id: d.id, ...d.data() }) as PortfolioProject)
          .filter((p) => !p.isPlaceholder);
        if (loadedProjects.length > 0) {
          setProjects(loadedProjects);
        }
      }
      if (!servicesSnap.empty) {
        const loadedServices = servicesSnap.docs
          .map((d) => ({ id: d.id, ...d.data() }) as ServiceItem)
          .sort((a, b) => a.order - b.order);
        const hasVerifiedSixServiceSet =
          loadedServices.some((s) => s.title === 'Media Buy') &&
          loadedServices.some((s) => s.title === 'Social Media Management');
        if (hasVerifiedSixServiceSet) {
          setServices(loadedServices);
        }
      }
      if (!articlesSnap.empty) {
        const loadedArticles = articlesSnap.docs
          .map((d) => ({ id: d.id, ...d.data() }) as InsightArticle)
          .sort((a, b) => b.publishedDate.localeCompare(a.publishedDate));
        if (loadedArticles.length > 0) {
          setArticles(loadedArticles);
        }
      }
      if (!testimonialsSnap.empty) {
        const verifiedTestimonials = testimonialsSnap.docs
          .map((d) => ({ id: d.id, ...d.data() }) as TestimonialItem)
          .filter((t) => !t.isPlaceholder);
        setTestimonials(verifiedTestimonials);
      }
      if (!logosSnap.empty) {
        const loadedLogos = logosSnap.docs
          .map((d) => ({ id: d.id, ...d.data() }) as ClientLogo)
          .filter((l) => !l.isPlaceholder && Boolean(l.logoUrl));
        if (loadedLogos.length > 0) {
          setClientLogos(loadedLogos);
        }
      }
      if (!teamSnap.empty) {
        const verifiedMembers = teamSnap.docs
          .map((d) => ({ id: d.id, ...d.data() }) as TeamMember)
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
