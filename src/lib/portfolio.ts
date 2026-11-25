import type { PortfolioCategory, PortfolioProject } from '../types/cms';

export const CORE_SIX_SERVICES = [
  'Social Media Management',
  'Content Creation & Marketing',
  'Influencer Marketing',
  'Media Buying',
  'Brand Activation',
  'Visual Design',
] as const;

export type ExclusiveServiceName = (typeof CORE_SIX_SERVICES)[number];

export interface CoreServiceRouteMeta {
  slug: string;
  title: ExclusiveServiceName;
  primaryCategories: PortfolioCategory[];
  keywordSignals: string[];
  photoUrl: string;
}

export const CORE_SERVICE_ROUTES: CoreServiceRouteMeta[] = [
  {
    slug: 'social-media-management',
    title: 'Social Media Management',
    primaryCategories: ['Digital Marketing', 'Influencer Campaigns'],
    keywordSignals: ['social', 'meta', 'tiktok', 'instagram', 'facebook', 'toyworld', 'styroplast', 'posts'],
    photoUrl: '/assets/profile/work/events/pizza-chicken-inn-street.jpg',
  },
  {
    slug: 'content-creation-and-marketing',
    title: 'Content Creation & Marketing',
    primaryCategories: ['Commercial Production', 'Influencer Campaigns'],
    keywordSignals: ['content', 'photo', 'video', 'tecno', 'production', 'storytelling', 'grill shack'],
    photoUrl: '/assets/profile/work/events/junction-mall-143.jpg',
  },
  {
    slug: 'influencer-marketing',
    title: 'Influencer Marketing',
    primaryCategories: ['Influencer Campaigns'],
    keywordSignals: ['influencer', 'creator', 'tiktok', 'pepsi', 'ocean basket', 'wowzi', 'grill shack', 'marhaba'],
    photoUrl: '/assets/profile/work/events/galitos-narok-101.jpg',
  },
  {
    slug: 'media-buying',
    title: 'Media Buying',
    primaryCategories: ['Digital Marketing', 'Influencer Campaigns', 'Brand Activations'],
    keywordSignals: ['pepsi', 'retail', 'promotional', 'marhaba', 'toyworld', 'chicken inn', 'awareness'],
    photoUrl: '/assets/profile/work/events/pizza-chicken-inn-interior.jpg',
  },
  {
    slug: 'brand-activation',
    title: 'Brand Activation',
    primaryCategories: ['Brand Activations', 'Events'],
    keywordSignals: ['activation', 'sampling', 'launch', 'roadshow', 'mall', 'event', 'galito', 'chicken inn', 'kcb', 'hub karen'],
    photoUrl: '/assets/profile/work/events/junction-mall-23.jpg',
  },
  {
    slug: 'visual-design',
    title: 'Visual Design',
    primaryCategories: ['Branding', 'Digital Marketing'],
    keywordSignals: ['brand identity', 'logo', 'cinnamon', 'paperboy', 'schoolbooks', 'print', 'collateral', 'banner', 'design'],
    photoUrl: '/assets/profile/work/events/pizza-chicken-inn-storefront.jpg',
  },
];

export function filterProjectsByCategory(
  projects: PortfolioProject[],
  category: 'All' | PortfolioCategory
): PortfolioProject[] {
  const visible = projects.filter((p) => !p.isPlaceholder && !p.isDeleted);
  if (category === 'All') return visible;
  return visible.filter((p) => p.category === category);
}

export function findProjectBySlug(
  projects: PortfolioProject[],
  slug: string
): PortfolioProject | undefined {
  const normalized = slug.trim().replace(/\/+$/, '');
  return projects.find((p) => p.slug === normalized && !p.isDeleted);
}

export function getRelatedProjects(
  projects: PortfolioProject[],
  currentSlug: string,
  limit = 3
): PortfolioProject[] {
  const current = findProjectBySlug(projects, currentSlug);
  const candidates = projects.filter(
    (p) => p.slug !== currentSlug && !p.isPlaceholder && !p.isDeleted
  );
  if (!current) return candidates.slice(0, limit);

  const sameCategory = candidates.filter((p) => p.category === current.category);
  const others = candidates.filter((p) => p.category !== current.category);
  return [...sameCategory, ...others].slice(0, limit);
}

export function normalizeLegacyServiceTitle(title: string): string {
  const trimmed = title.trim();
  if (trimmed === 'Media Buy') return 'Media Buying';
  if (trimmed === 'Brand Activation & Events') return 'Brand Activation';
  if (trimmed === 'Visual Design & Brand Identity') return 'Visual Design';
  return trimmed;
}

export function getServiceSlug(serviceTitleOrSlug: string): string {
  const normalized = normalizeLegacyServiceTitle(serviceTitleOrSlug).toLowerCase();
  const matched = CORE_SERVICE_ROUTES.find(
    (s) => s.slug === normalized || s.title.toLowerCase() === normalized
  );
  if (matched) return matched.slug;
  return normalized
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

export function findServiceRouteBySlug(slug: string): CoreServiceRouteMeta | undefined {
  const normalized = slug.trim().replace(/\/+$/, '').toLowerCase();
  return CORE_SERVICE_ROUTES.find((s) => s.slug === normalized);
}

export function getProjectsForService(
  projects: PortfolioProject[],
  serviceSlug: string,
  limit = 6
): PortfolioProject[] {
  const route = findServiceRouteBySlug(serviceSlug);
  const visible = projects.filter((p) => !p.isPlaceholder && !p.isDeleted);
  if (!route) return visible.slice(0, limit);

  const scored = visible.map((project) => {
    const haystack = [
      project.title,
      project.summary,
      project.solution,
      project.clientName,
      project.category,
      ...project.deliverables,
    ]
      .join(' ')
      .toLowerCase();

    let score = 0;
    const catIdx = route.primaryCategories.indexOf(project.category);
    if (catIdx === 0) score += 20;
    else if (catIdx > 0) score += 10;

    for (const signal of route.keywordSignals) {
      if (haystack.includes(signal)) score += 3;
    }

    return { project, score };
  });

  const matching = scored
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((entry) => entry.project);

  return (matching.length > 0 ? matching : visible).slice(0, limit);
}
