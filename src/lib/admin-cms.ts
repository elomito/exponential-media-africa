import type { User } from 'firebase/auth';
import {
  collection,
  doc,
  getDocs,
  orderBy,
  query,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import { PAGE_HERO_IMAGES } from '../data/pageHeroes';
import {
  DEFAULT_ARTICLES,
  DEFAULT_CLIENT_LOGOS,
  DEFAULT_PORTFOLIO_PROJECTS,
  DEFAULT_SERVICES,
  DEFAULT_SITE_SETTINGS,
  DEFAULT_TEAM_MEMBERS,
  DEFAULT_TESTIMONIALS,
} from '../data/seedData';
import type {
  AdminUserRecord,
  ArticleCategory,
  AuditLogRecord,
  ClientLogo,
  ContentStatus,
  DivisionId,
  InsightArticle,
  PortfolioCategory,
  PortfolioProject,
  ProjectInquiry,
  SiteSettings,
  StaffRole,
  TeamMember,
  UserRole,
} from '../types/cms';
import { db } from './firebase';
import { OperationType, handleFirestoreError } from './firestore-errors';
import {
  EMAIL_PATTERN,
  isSafeExternalHttpUrl,
  isSafeHttpOrLocalUrl,
  isValidDocId,
  sanitizeMultilineText,
  sanitizePlainText,
  sanitizeSiteSettings,
  sanitizeSlug,
} from './validation';

export interface AdminCmsSnapshot {
  projects: PortfolioProject[];
  articles: InsightArticle[];
  teamMembers: TeamMember[];
  clientLogos: ClientLogo[];
  inquiries: ProjectInquiry[];
  adminUsers: AdminUserRecord[];
  auditLogs: AuditLogRecord[];
}

export async function loadAdminCmsData(isAdmin: boolean): Promise<AdminCmsSnapshot> {
  try {
    const [projSnap, artSnap, teamSnap, clientSnap] = await Promise.all([
      getDocs(collection(db, 'portfolio_projects')),
      getDocs(collection(db, 'articles')),
      getDocs(collection(db, 'team_members')),
      getDocs(collection(db, 'client_logos')),
    ]);

    let inquiries: ProjectInquiry[] = [];
    let adminUsers: AdminUserRecord[] = [];
    let auditLogs: AuditLogRecord[] = [];

    if (isAdmin) {
      const [inqSnap, usersSnap, logsSnap] = await Promise.all([
        getDocs(query(collection(db, 'inquiries'), orderBy('createdAt', 'desc'))),
        getDocs(collection(db, 'users')),
        getDocs(query(collection(db, 'audit_logs'), orderBy('createdAt', 'desc'))),
      ]);
      inquiries = inqSnap.docs.map((d) => ({ id: d.id, ...d.data() }) as ProjectInquiry);
      adminUsers = usersSnap.docs.map((d) => ({ id: d.id, ...d.data() }) as AdminUserRecord);
      auditLogs = logsSnap.docs.map((d) => ({ id: d.id, ...d.data() }) as AuditLogRecord);
    }

    return {
      projects: projSnap.docs.map((d) => ({ id: d.id, ...d.data() }) as PortfolioProject),
      articles: artSnap.docs.map((d) => ({ id: d.id, ...d.data() }) as InsightArticle),
      teamMembers: teamSnap.docs.map((d) => ({ id: d.id, ...d.data() }) as TeamMember),
      clientLogos: clientSnap.docs.map((d) => ({ id: d.id, ...d.data() }) as ClientLogo),
      inquiries,
      adminUsers,
      auditLogs,
    };
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, 'admin_console');
  }
}

export async function seedDefaultCmsContent(): Promise<void> {
  await setDoc(doc(db, 'site_settings', 'main'), {
    ...DEFAULT_SITE_SETTINGS,
    updatedAt: new Date().toISOString(),
  });
  await Promise.all([
    ...DEFAULT_PORTFOLIO_PROJECTS.map((p) => {
      const { id, ...rest } = p;
      return setDoc(doc(db, 'portfolio_projects', id), rest);
    }),
    ...DEFAULT_SERVICES.map((s) => {
      const { id, ...rest } = s;
      return setDoc(doc(db, 'services', id), rest);
    }),
    ...DEFAULT_ARTICLES.map((a) => {
      const { id, ...rest } = a;
      return setDoc(doc(db, 'articles', id), rest);
    }),
    ...DEFAULT_TESTIMONIALS.map((t) => {
      const { id, ...rest } = t;
      return setDoc(doc(db, 'testimonials', id), rest);
    }),
    ...DEFAULT_CLIENT_LOGOS.map((l) => {
      const { id, ...rest } = l;
      return setDoc(doc(db, 'client_logos', id), rest);
    }),
    ...DEFAULT_TEAM_MEMBERS.map((m) => {
      const { id, ...rest } = m;
      return setDoc(doc(db, 'team_members', id), rest);
    }),
  ]);
}

export async function createDraftProject(input: {
  title: string;
  category: PortfolioCategory;
  division: DivisionId;
  clientName: string;
  summary: string;
}): Promise<void> {
  const cleanTitle = sanitizePlainText(input.title).slice(0, 160);
  const cleanClient = sanitizePlainText(input.clientName || 'Authorised Client').slice(0, 120);
  const cleanSummary = sanitizePlainText(input.summary).slice(0, 600);

  if (cleanTitle.length < 2) {
    throw new Error('Project title must be at least 2 characters.');
  }
  if (cleanClient.length < 2) {
    throw new Error('Client name must be at least 2 characters.');
  }
  if (cleanSummary.length < 10) {
    throw new Error('Project summary must be at least 10 characters.');
  }

  const id = `proj-${Date.now()}`;
  const slug = sanitizeSlug(cleanTitle) || id;
  await setDoc(doc(db, 'portfolio_projects', id), {
    slug,
    title: cleanTitle,
    category: input.category,
    division: input.division,
    clientName: cleanClient,
    summary: cleanSummary,
    challenge: 'Project brief and strategic challenge captured via Exponential Staff CMS.',
    solution:
      'Integrated creative, studio, and marketing delivery executed by Exponential Marketing Agency.',
    deliverables: ['Strategy & Execution'],
    imageUrl: PAGE_HERO_IMAGES.home,
    isPlaceholder: false,
    featured: true,
    status: 'draft' as ContentStatus,
    isDeleted: false,
    updatedAt: new Date().toISOString(),
  });
}

export async function createDraftArticle(input: {
  title: string;
  category: ArticleCategory;
  excerpt: string;
  body: string;
  authorName: string;
  authorRole: UserRole | null;
}): Promise<void> {
  const cleanTitle = sanitizePlainText(input.title).slice(0, 180);
  const cleanExcerpt = sanitizePlainText(input.excerpt).slice(0, 500);
  const cleanBody = sanitizeMultilineText(input.body).slice(0, 20000);
  const cleanAuthor = sanitizePlainText(
    input.authorName || 'Exponential Editorial Team'
  ).slice(0, 100);

  if (cleanTitle.length < 4) {
    throw new Error('Article headline must be at least 4 characters.');
  }
  if (cleanExcerpt.length < 10) {
    throw new Error('Article excerpt must be at least 10 characters.');
  }
  if (cleanBody.length < 20) {
    throw new Error('Article body must be at least 20 characters.');
  }

  const id = `art-${Date.now()}`;
  await setDoc(doc(db, 'articles', id), {
    slug: sanitizeSlug(cleanTitle) || id,
    title: cleanTitle,
    category: input.category,
    excerpt: cleanExcerpt,
    body: cleanBody,
    authorName: cleanAuthor.length >= 2 ? cleanAuthor : 'Exponential Editorial Team',
    authorRole: input.authorRole === 'admin' ? 'admin' : 'editor',
    publishedDate: new Date().toISOString().slice(0, 10),
    readTime: '4 min read',
    imageUrl: PAGE_HERO_IMAGES.home,
    featured: false,
    status: 'draft' as ContentStatus,
    isDeleted: false,
    updatedAt: new Date().toISOString(),
  });
}

export async function createDraftTeamMember(input: {
  name: string;
  role: string;
  division: string;
  bio: string;
  photoUrl: string;
}): Promise<void> {
  const cleanName = sanitizePlainText(input.name).slice(0, 100);
  const cleanRole = sanitizePlainText(input.role).slice(0, 120);
  const cleanDivision = sanitizePlainText(
    input.division || 'Exponential Marketing Agency'
  ).slice(0, 100);
  const cleanBio = sanitizePlainText(input.bio).slice(0, 600);
  const cleanPhoto = input.photoUrl.trim();

  if (cleanName.length < 2 || cleanRole.length < 2 || cleanBio.length < 10) {
    throw new Error('Please enter a valid name, role, and bio (at least 10 characters).');
  }
  if (cleanPhoto && !isSafeHttpOrLocalUrl(cleanPhoto)) {
    throw new Error('Photo URL must be a safe https://, http://, or local / asset path.');
  }

  const id = `team-${Date.now()}`;
  const payload: Record<string, unknown> = {
    name: cleanName,
    role: cleanRole,
    division: cleanDivision.length >= 2 ? cleanDivision : 'Exponential Marketing Agency',
    bio: cleanBio,
    isPlaceholder: false,
    status: 'draft' as ContentStatus,
    isDeleted: false,
    updatedAt: new Date().toISOString(),
  };
  if (cleanPhoto) {
    payload.photoUrl = cleanPhoto.slice(0, 500);
  }
  await setDoc(doc(db, 'team_members', id), payload);
}

export async function createDraftClientLogo(input: {
  name: string;
  sector: string;
  region: string;
  logoUrl: string;
}): Promise<void> {
  const cleanName = sanitizePlainText(input.name).slice(0, 120);
  const cleanSector = sanitizePlainText(input.sector).slice(0, 100);
  const cleanRegion = sanitizePlainText(input.region).slice(0, 80);
  const cleanLogoUrl = input.logoUrl.trim();

  if (cleanName.length < 2 || cleanSector.length < 2) {
    throw new Error('Please enter a valid company name and sector.');
  }
  if (cleanLogoUrl && !isSafeHttpOrLocalUrl(cleanLogoUrl)) {
    throw new Error('Logo URL must be a safe https://, http://, or local / asset path.');
  }

  const id = `logo-${Date.now()}`;
  const payload: Record<string, unknown> = {
    name: cleanName,
    sector: cleanSector,
    isPlaceholder: false,
    status: 'draft' as ContentStatus,
    isDeleted: false,
    updatedAt: new Date().toISOString(),
  };
  if (cleanRegion) {
    payload.region = cleanRegion;
  }
  if (cleanLogoUrl) {
    payload.logoUrl = cleanLogoUrl.slice(0, 500);
  }
  await setDoc(doc(db, 'client_logos', id), payload);
}

export type CmsManagedCollection =
  | 'portfolio_projects'
  | 'articles'
  | 'team_members'
  | 'client_logos';

export async function updateCmsDocumentFields(
  collectionName: CmsManagedCollection,
  docId: string,
  patch: Partial<{ status: ContentStatus; isDeleted: boolean }>
): Promise<void> {
  if (!isValidDocId(docId)) {
    throw new Error('Invalid CMS record identifier.');
  }
  const safePatch: Partial<{ status: ContentStatus; isDeleted: boolean }> = {};
  if (patch.status !== undefined) {
    if (patch.status !== 'draft' && patch.status !== 'published') {
      throw new Error('Invalid CMS publish status.');
    }
    safePatch.status = patch.status;
  }
  if (patch.isDeleted !== undefined) {
    safePatch.isDeleted = Boolean(patch.isDeleted);
  }
  try {
    await updateDoc(doc(db, collectionName, docId), {
      ...safePatch,
      updatedAt: new Date().toISOString(),
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, `${collectionName}/${docId}`);
  }
}

export async function saveVerifiedSiteSettings(settings: SiteSettings): Promise<SiteSettings> {
  const cleanEmail = sanitizePlainText(settings.email).toLowerCase().slice(0, 160);
  const cleanPrimaryPhone = sanitizePlainText(settings.primaryPhone).slice(0, 40);
  const cleanSecondaryPhone = sanitizePlainText(settings.secondaryPhone || '').slice(0, 40);
  const cleanAddress = sanitizePlainText(settings.headquartersAddress).slice(0, 240);

  if (!EMAIL_PATTERN.test(cleanEmail) || /[?#&\s\\]/.test(cleanEmail)) {
    throw new Error('Please provide a valid company email address.');
  }
  if (!/^[+0-9()\s-]{5,40}$/.test(cleanPrimaryPhone)) {
    throw new Error('Please provide a valid primary phone number.');
  }
  if (cleanSecondaryPhone && !/^[+0-9()\s-]{5,40}$/.test(cleanSecondaryPhone)) {
    throw new Error('Secondary phone number contains invalid characters.');
  }
  if (cleanAddress.length < 5) {
    throw new Error('Headquarters address must be at least 5 characters.');
  }

  for (const key of ['instagram', 'linkedin', 'youtube', 'x'] as const) {
    const candidate = sanitizePlainText(settings.socialLinks?.[key] || '');
    if (candidate && !isSafeExternalHttpUrl(candidate)) {
      throw new Error(`Invalid ${key} URL. Provide a valid https:// or http:// link.`);
    }
  }

  const sanitized = sanitizeSiteSettings(settings, DEFAULT_SITE_SETTINGS);

  await setDoc(doc(db, 'site_settings', 'main'), {
    ...sanitized,
    updatedAt: new Date().toISOString(),
  });
  return sanitized;
}

export async function updateInquiryStatusViaApi(
  user: User,
  inquiryId: string,
  inquiryStatus: ProjectInquiry['inquiryStatus']
): Promise<void> {
  if (!isValidDocId(inquiryId)) {
    throw new Error('Invalid inquiry identifier.');
  }
  if (!['new', 'reviewing', 'contacted', 'archived'].includes(inquiryStatus)) {
    throw new Error('Invalid inquiry status.');
  }
  const token = await user.getIdToken();
  const response = await fetch(`/api/admin/inquiries/${encodeURIComponent(inquiryId)}/status`, {
    method: 'PATCH',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ inquiryStatus }),
  });
  const result = (await response.json().catch(() => null)) as { error?: string } | null;
  if (!response.ok) {
    throw new Error(result?.error || 'Inquiry status could not be updated.');
  }
}

export async function provisionStaffRoleViaApi(
  user: User,
  rawUid: string,
  role: StaffRole
): Promise<string> {
  const uid = sanitizePlainText(rawUid);
  if (!isValidDocId(uid)) {
    throw new Error('Firebase user ID must contain only letters, numbers, underscores, or hyphens.');
  }
  const token = await user.getIdToken();
  const response = await fetch('/api/admin/roles', {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ uid, role }),
  });
  const result = (await response.json().catch(() => null)) as { error?: string } | null;
  if (!response.ok) {
    throw new Error(result?.error || 'Role provisioning failed.');
  }
  return uid;
}

export async function updateStaffRoleViaApi(
  user: User,
  targetUid: string,
  body: { role?: StaffRole; active?: boolean }
): Promise<void> {
  if (!isValidDocId(targetUid)) {
    throw new Error('Invalid staff user identifier.');
  }
  const token = await user.getIdToken();
  const response = await fetch(`/api/admin/roles/${encodeURIComponent(targetUid)}`, {
    method: 'PATCH',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  const result = (await response.json().catch(() => null)) as { error?: string } | null;
  if (!response.ok) {
    throw new Error(result?.error || 'Role update failed.');
  }
}
