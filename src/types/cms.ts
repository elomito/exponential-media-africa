export type DivisionId = 'creative' | 'estudios' | 'marketing' | 'emtc';

export type ContentStatus = 'draft' | 'published';

export type StaffRole = 'admin' | 'editor';
export type UserRole = 'public' | StaffRole;

export type PortfolioCategory =
  | 'Branding'
  | 'Commercial Production'
  | 'Photography'
  | 'Videography'
  | 'Influencer Campaigns'
  | 'Events'
  | 'Brand Activations'
  | 'Digital Marketing';

export type ArticleCategory =
  | 'Industry Articles'
  | 'Marketing Insights'
  | 'Creative Trends'
  | 'Company Updates'
  | 'Educational Content';

export interface DivisionMeta {
  id: DivisionId;
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  accentHex: string;
  imageUrl: string;
  imageAlt: string;
  services: string[];
  ecosystemRole: string;
}

export interface ImpactMetricConfig {
  id: string;
  label: string;
  value: string;
  unitOrContext: string;
  isPlaceholder: boolean;
}

export interface SiteSettings {
  companyName: string;
  tagline: string;
  email: string;
  primaryPhone: string;
  secondaryPhone?: string;
  headquartersAddress: string;
  campusAddress?: string;
  socialLinks: {
    instagram: string;
    linkedin: string;
    youtube: string;
    x: string;
  };
  impactMetrics: {
    projectsCompleted: ImpactMetricConfig;
    brandsServed: ImpactMetricConfig;
    campaignsExecuted: ImpactMetricConfig;
    yearsExperience: ImpactMetricConfig;
    geographicReach: ImpactMetricConfig;
  };
  updatedAt?: string;
}

export interface PortfolioProject {
  id: string;
  slug: string;
  title: string;
  category: PortfolioCategory;
  division: DivisionId;
  clientName: string;
  summary: string;
  challenge: string;
  solution: string;
  deliverables: string[];
  imageUrl: string;
  isPlaceholder: boolean;
  featured: boolean;
  status: ContentStatus;
  isDeleted: boolean;
  updatedAt?: string;
}

export interface ServiceItem {
  id: string;
  division: DivisionId;
  title: string;
  problemSolved: string;
  description: string;
  order: number;
  status: ContentStatus;
  isDeleted: boolean;
}

export interface InsightArticle {
  id: string;
  slug: string;
  title: string;
  category: ArticleCategory;
  excerpt: string;
  body: string;
  authorName: string;
  authorRole: string;
  publishedDate: string;
  readTime: string;
  imageUrl: string;
  featured: boolean;
  status: ContentStatus;
  isDeleted: boolean;
}

export interface TestimonialItem {
  id: string;
  quote: string;
  clientName: string;
  clientRole: string;
  companyName: string;
  videoUrl?: string;
  isPlaceholder: boolean;
  status: ContentStatus;
  isDeleted: boolean;
}

export interface ClientLogo {
  id: string;
  name: string;
  sector: string;
  region?: string;
  logoUrl?: string;
  isPlaceholder: boolean;
  status: ContentStatus;
  isDeleted: boolean;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  division: string;
  bio: string;
  photoUrl?: string;
  isPlaceholder: boolean;
  status: ContentStatus;
  isDeleted: boolean;
}

export interface ProjectInquiry {
  id: string;
  referenceCode: string;
  fullName: string;
  businessEmail: string;
  companyName: string;
  phone: string;
  industry: string;
  requiredServices: string[];
  estimatedBudget: string;
  projectTimeline: string;
  projectDescription: string;
  consentAccepted: boolean;
  inquiryStatus: 'new' | 'reviewing' | 'contacted' | 'archived';
  createdAt?: unknown;
}

export interface AdminUserRecord {
  id: string;
  uid?: string;
  email: string;
  displayName: string;
  role: StaffRole;
  active: boolean;
}

export interface AuditLogRecord {
  id: string;
  actorUid: string;
  actorEmail: string;
  actorRole: StaffRole;
  action: string;
  targetCollection: string;
  targetId: string;
  summary: string;
  outcome?: 'success' | 'failure';
  createdAt?: unknown;
}

// Future-Ready Architecture Contracts (Phase 2 Expansion)
export interface InfluencerProfileContract {
  id: string;
  creatorHandle: string;
  platforms: Array<'Instagram' | 'TikTok' | 'YouTube' | 'X' | 'LinkedIn'>;
  contentCategories: string[];
  audienceDemographics: {
    primaryRegion: string;
    followerRange: string;
    engagementRatePercent: number;
  };
  verifiedByAgency: boolean;
}

export interface ClientPortalWorkspaceContract {
  id: string;
  clientOrgId: string;
  activeCampaigns: string[];
  deliverablesPendingReview: number;
  reportDocuments: Array<{ title: string; updatedAt: string }>;
}
