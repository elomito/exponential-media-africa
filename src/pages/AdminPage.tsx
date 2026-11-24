import React, { useCallback, useEffect, useState } from 'react';
import {
  Database,
  Eye,
  FileText,
  Globe2,
  Inbox,
  Lock,
  LogOut,
  Plus,
  Settings,
  ShieldCheck,
  Trash2,
  UserCheck,
  Users,
} from 'lucide-react';
import { SeoHead } from '../components/SeoHead';
import { useAuth } from '../context/AuthContext';
import { useCms } from '../context/CmsContext';
import { useLanguage } from '../context/LanguageContext';
import { PORTFOLIO_CATEGORIES } from '../data/seedData';
import {
  type CmsManagedCollection,
  createDraftArticle,
  createDraftClientLogo,
  createDraftProject,
  createDraftTeamMember,
  loadAdminCmsData,
  provisionStaffRoleViaApi,
  saveVerifiedSiteSettings,
  seedDefaultCmsContent,
  updateCmsDocumentFields,
  updateInquiryStatusViaApi,
  updateStaffRoleViaApi,
} from '../lib/admin-cms';
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
} from '../types/cms';

type AdminTab =
  | 'portfolio'
  | 'articles'
  | 'team'
  | 'clients'
  | 'inquiries'
  | 'settings'
  | 'users'
  | 'audit'
  | 'architecture';

export function AdminPage() {
  const {
    user,
    role,
    authReady,
    isAuthorizedStaff,
    authError,
    signInWithGoogle,
    mfaFactors,
    mfaSelectedFactorUid,
    mfaVerificationSent,
    startMfaChallenge,
    completeMfaSignIn,
    cancelMfaChallenge,
    signOut,
  } = useAuth();
  const { settings, refreshPublicContent } = useCms();
  const { t } = useLanguage();

  const [activeTab, setActiveTab] = useState<AdminTab>('portfolio');
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [mfaCode, setMfaCode] = useState('');

  const [cmsProjects, setCmsProjects] = useState<PortfolioProject[]>([]);
  const [cmsArticles, setCmsArticles] = useState<InsightArticle[]>([]);
  const [cmsTeamMembers, setCmsTeamMembers] = useState<TeamMember[]>([]);
  const [cmsClientLogos, setCmsClientLogos] = useState<ClientLogo[]>([]);
  const [inquiries, setInquiries] = useState<ProjectInquiry[]>([]);
  const [adminUsers, setAdminUsers] = useState<AdminUserRecord[]>([]);
  const [auditLogs, setAuditLogs] = useState<AuditLogRecord[]>([]);
  const [editableSettings, setEditableSettings] = useState<SiteSettings>(settings);

  const [newProjTitle, setNewProjTitle] = useState('');
  const [newProjCategory, setNewProjCategory] = useState<PortfolioCategory>('Branding');
  const [newProjDivision, setNewProjDivision] = useState<DivisionId>('creative');
  const [newProjClient, setNewProjClient] = useState('');
  const [newProjSummary, setNewProjSummary] = useState('');

  const [newArtTitle, setNewArtTitle] = useState('');
  const [newArtCategory, setNewArtCategory] = useState<ArticleCategory>('Industry Articles');
  const [newArtExcerpt, setNewArtExcerpt] = useState('');
  const [newArtBody, setNewArtBody] = useState('');

  const [newMemberName, setNewMemberName] = useState('');
  const [newMemberRole, setNewMemberRole] = useState('');
  const [newMemberDivision, setNewMemberDivision] = useState('Exponential Marketing Agency');
  const [newMemberBio, setNewMemberBio] = useState('');
  const [newMemberPhotoUrl, setNewMemberPhotoUrl] = useState('');

  const [newClientName, setNewClientName] = useState('');
  const [newClientSector, setNewClientSector] = useState('');
  const [newClientRegion, setNewClientRegion] = useState('');
  const [newClientLogoUrl, setNewClientLogoUrl] = useState('');

  const [newUserUid, setNewUserUid] = useState('');
  const [newUserRole, setNewUserRole] = useState<StaffRole>('editor');

  const isAdmin = role === 'admin';

  useEffect(() => {
    setEditableSettings(settings);
  }, [settings]);

  const loadAdminData = useCallback(async () => {
    if (!isAuthorizedStaff) return;
    setBusy(true);
    try {
      const snapshot = await loadAdminCmsData(isAdmin);
      setCmsProjects(snapshot.projects);
      setCmsArticles(snapshot.articles);
      setCmsTeamMembers(snapshot.teamMembers);
      setCmsClientLogos(snapshot.clientLogos);
      if (isAdmin) {
        setInquiries(snapshot.inquiries);
        setAdminUsers(snapshot.adminUsers);
        setAuditLogs(snapshot.auditLogs);
      }
    } finally {
      setBusy(false);
    }
  }, [isAuthorizedStaff, isAdmin]);

  useEffect(() => {
    if (isAuthorizedStaff) {
      void loadAdminData();
    }
  }, [isAuthorizedStaff, loadAdminData]);

  const runCmsMutation = async (
    action: () => Promise<void>,
    successMsg: string,
    refreshPublic = true
  ) => {
    setBusy(true);
    setStatusMessage(null);
    try {
      await action();
      await loadAdminData();
      if (refreshPublic) {
        await refreshPublicContent();
      }
      setStatusMessage(successMsg);
    } catch (error) {
      setStatusMessage(
        error instanceof Error ? error.message : 'Unable to complete the requested operation.'
      );
    } finally {
      setBusy(false);
    }
  };

  const handleSeedCmsContent = async () => {
    if (!isAdmin) return;
    await runCmsMutation(
      () => seedDefaultCmsContent(),
      'Initial CMS content successfully synchronized to Firestore.'
    );
  };

  const handleCreateProject = async (e: React.FormEvent) => {
    e.preventDefault();
    await runCmsMutation(
      async () => {
        await createDraftProject({
          title: newProjTitle,
          category: newProjCategory,
          division: newProjDivision,
          clientName: newProjClient,
          summary: newProjSummary,
        });
        setNewProjTitle('');
        setNewProjClient('');
        setNewProjSummary('');
      },
      'Draft portfolio project created.',
      false
    );
  };

  const handleCreateArticle = async (e: React.FormEvent) => {
    e.preventDefault();
    await runCmsMutation(
      async () => {
        await createDraftArticle({
          title: newArtTitle,
          category: newArtCategory,
          excerpt: newArtExcerpt,
          body: newArtBody,
          authorName: user?.displayName || 'Exponential Editorial Team',
          authorRole: role,
        });
        setNewArtTitle('');
        setNewArtExcerpt('');
        setNewArtBody('');
      },
      'Draft article created.',
      false
    );
  };

  const handleCreateTeamMember = async (e: React.FormEvent) => {
    e.preventDefault();
    await runCmsMutation(
      async () => {
        await createDraftTeamMember({
          name: newMemberName,
          role: newMemberRole,
          division: newMemberDivision,
          bio: newMemberBio,
          photoUrl: newMemberPhotoUrl,
        });
        setNewMemberName('');
        setNewMemberRole('');
        setNewMemberBio('');
        setNewMemberPhotoUrl('');
      },
      'Draft team member created. Click Publish to display publicly.',
      false
    );
  };

  const handleCreateClientLogo = async (e: React.FormEvent) => {
    e.preventDefault();
    await runCmsMutation(
      async () => {
        await createDraftClientLogo({
          name: newClientName,
          sector: newClientSector,
          region: newClientRegion,
          logoUrl: newClientLogoUrl,
        });
        setNewClientName('');
        setNewClientSector('');
        setNewClientRegion('');
        setNewClientLogoUrl('');
      },
      'Draft worldwide client window created. Click Publish to display in sliding windows.',
      false
    );
  };

  const handleToggleStatus = async (
    collectionName: CmsManagedCollection,
    docId: string,
    currentStatus: ContentStatus
  ) => {
    const nextStatus: ContentStatus = currentStatus === 'published' ? 'draft' : 'published';
    await runCmsMutation(
      () => updateCmsDocumentFields(collectionName, docId, { status: nextStatus }),
      `Updated status to ${nextStatus}.`
    );
  };

  const handleToggleArchive = async (
    collectionName: CmsManagedCollection,
    docId: string,
    currentDeleted: boolean
  ) => {
    const nextDeleted = !currentDeleted;
    await runCmsMutation(
      () => updateCmsDocumentFields(collectionName, docId, { isDeleted: nextDeleted }),
      nextDeleted ? 'Record archived.' : 'Record restored.'
    );
  };

  const toggleProjectStatus = (project: PortfolioProject) =>
    void handleToggleStatus('portfolio_projects', project.id, project.status);
  const softDeleteProject = (project: PortfolioProject) =>
    void handleToggleArchive('portfolio_projects', project.id, project.isDeleted);
  const toggleArticleStatus = (article: InsightArticle) =>
    void handleToggleStatus('articles', article.id, article.status);
  const toggleTeamMemberStatus = (member: TeamMember) =>
    void handleToggleStatus('team_members', member.id, member.status);
  const softDeleteTeamMember = (member: TeamMember) =>
    void handleToggleArchive('team_members', member.id, member.isDeleted);
  const toggleClientLogoStatus = (logo: ClientLogo) =>
    void handleToggleStatus('client_logos', logo.id, logo.status);
  const softDeleteClientLogo = (logo: ClientLogo) =>
    void handleToggleArchive('client_logos', logo.id, logo.isDeleted);

  const updateInquiryStatus = async (
    inq: ProjectInquiry,
    nextStatus: ProjectInquiry['inquiryStatus']
  ) => {
    if (!isAdmin || !user) return;
    await runCmsMutation(
      () => updateInquiryStatusViaApi(user, inq.id, nextStatus),
      `Inquiry ${inq.referenceCode} updated to ${nextStatus}.`,
      false
    );
  };

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAdmin) return;
    await runCmsMutation(async () => {
      const saved = await saveVerifiedSiteSettings(editableSettings);
      setEditableSettings(saved);
    }, 'Site settings updated and published.');
  };

  const handleAssignUserRole = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAdmin || !newUserUid.trim() || !user) return;
    setBusy(true);
    setStatusMessage(null);
    try {
      const provisionedUid = await provisionStaffRoleViaApi(user, newUserUid, newUserRole);
      setNewUserUid('');
      await loadAdminData();
      setStatusMessage(`Provisioned ${newUserRole} role for ${provisionedUid}.`);
    } catch (error) {
      setStatusMessage(error instanceof Error ? error.message : 'Role provisioning failed.');
    } finally {
      setBusy(false);
    }
  };

  const handleRoleChange = async (
    target: AdminUserRecord,
    body: { role?: StaffRole; active?: boolean }
  ) => {
    if (!user) return;
    setBusy(true);
    setStatusMessage(null);
    try {
      await updateStaffRoleViaApi(user, target.id, body);
      await loadAdminData();
      setStatusMessage(`Updated access for ${target.email}.`);
    } catch (error) {
      setStatusMessage(error instanceof Error ? error.message : 'Role update failed.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="min-h-[80vh] bg-[#9E0E15] text-white">
      <SeoHead
        title={t.seo.adminTitle}
        description={t.seo.adminDescription}
        path="/admin"
        noIndex
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        {!authReady ? (
          <div className="p-12 text-center text-sm text-white/80">
            Verifying authentication state...
          </div>
        ) : !isAuthorizedStaff ? (
          <div className="max-w-md mx-auto p-8 bg-[#850B11] border border-white/25 rounded-2xl text-center space-y-5">
            <div className="w-12 h-12 mx-auto rounded-xl bg-white/15 border border-white/30 flex items-center justify-center text-white">
              <Lock className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-display font-bold text-white mb-2">
                Staff CMS Access
              </h1>
              <p className="text-sm text-white/85 leading-relaxed">
                Protected administrative and editorial workspace. Public registration is disabled; only authorised staff accounts may sign in.
              </p>
            </div>

            {authError && (
              <div role="alert" className="p-3 rounded-lg bg-rose-950/60 border border-rose-500/40 text-xs text-rose-200">
                {authError}
              </div>
            )}

            {mfaFactors.length > 0 ? (
              <div className="space-y-3 text-left">
                <h2 className="text-sm font-semibold text-white">Complete two-step verification</h2>
                <p className="text-xs leading-relaxed text-white/80">Choose an enrolled factor. Your code is verified by Firebase Authentication.</p>
                <div className="grid gap-2">
                  {mfaFactors.map((factor) => (
                    <button
                      key={factor.uid}
                      type="button"
                      onClick={() => void startMfaChallenge(factor.uid)}
                      aria-pressed={mfaSelectedFactorUid === factor.uid}
                      className="w-full rounded-lg border border-white/15 px-3 py-2 text-left text-sm text-white hover:bg-white/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#ED2126]"
                    >
                      {factor.kind === 'phone' ? 'Text message' : 'Authenticator app'} · {factor.label}
                    </button>
                  ))}
                </div>
                {mfaSelectedFactorUid && (
                  <form
                    className="space-y-3"
                    onSubmit={(event) => {
                      event.preventDefault();
                      void completeMfaSignIn(mfaCode);
                    }}
                  >
                    <label htmlFor="admin-mfa-code" className="block text-xs font-medium text-white/90">
                      {mfaVerificationSent ? 'Verification code' : 'Authenticator code'}
                    </label>
                    <input
                      id="admin-mfa-code"
                      inputMode="numeric"
                      autoComplete="one-time-code"
                      pattern="[0-9]{6,8}"
                      maxLength={8}
                      required
                      value={mfaCode}
                      onChange={(event) => setMfaCode(event.target.value.replace(/\D/g, '').slice(0, 8))}
                      className="w-full rounded-lg border border-white/30 bg-white px-3 py-2 text-center tracking-[0.3em] text-[#1A0809]"
                    />
                    <button type="submit" className="w-full rounded-lg bg-[#ED2126] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#D1191E]">
                      Verify and continue
                    </button>
                  </form>
                )}
                <div id="admin-mfa-recaptcha" aria-hidden="true" />
                <button type="button" onClick={cancelMfaChallenge} className="text-xs text-white/80 underline underline-offset-4">
                  Cancel sign-in
                </button>
              </div>
            ) : user ? (
              <div className="space-y-3">
                <p className="text-xs text-white/80">
                  Signed in as <span className="text-white">{user.email}</span> (No staff role assigned)
                </p>
                <button
                  type="button"
                  onClick={signOut}
                  className="w-full py-2.5 px-4 text-sm font-semibold bg-white/10 hover:bg-white/20 text-white rounded-lg"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={signInWithGoogle}
                className="w-full py-3 px-5 text-sm font-semibold bg-[#ED1B24] hover:bg-[#D1141C] text-white rounded-lg transition-colors"
              >
                Sign In with Authorised Google Account
              </button>
            )}
          </div>
        ) : (
          <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/10">
              <div>
                <div className="flex items-center gap-2 text-xs text-[#FFECEE] font-semibold mb-1">
                  <ShieldCheck className="w-4 h-4 text-[#ED2126]" />
                  <span>
                    Role: {role} · {user?.email}
                  </span>
                </div>
                <h1 className="text-3xl font-display font-bold text-white">
                  Exponential CMS &amp; Operations
                </h1>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                {isAdmin && (
                  <button
                    type="button"
                    disabled={busy}
                    onClick={handleSeedCmsContent}
                    className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors"
                  >
                    <Database className="w-3.5 h-3.5 text-[#ED2126]" />
                    <span>Sync Default Content to Firestore</span>
                  </button>
                )}
                <button
                  type="button"
                  onClick={signOut}
                  className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium border border-white/15 hover:bg-white/10 text-white/90 rounded-lg transition-colors"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>

            {statusMessage && (
              <div
                role="status"
                className="p-3.5 rounded-xl bg-emerald-950/50 border border-emerald-500/40 text-xs text-emerald-200"
              >
                {statusMessage}
              </div>
            )}

            <div className="flex flex-wrap gap-1.5 p-1.5 bg-[#850B11] border border-white/10 rounded-xl">
              {(
                [
                  { id: 'portfolio', label: 'Portfolio', icon: Eye, adminOnly: false },
                  { id: 'articles', label: 'Insights Articles', icon: FileText, adminOnly: false },
                  { id: 'team', label: 'Our Team', icon: UserCheck, adminOnly: false },
                  { id: 'clients', label: 'Worldwide Clients', icon: Globe2, adminOnly: false },
                  { id: 'inquiries', label: 'Project Inquiries', icon: Inbox, adminOnly: true },
                  { id: 'settings', label: 'Settings & Impact', icon: Settings, adminOnly: true },
                  { id: 'users', label: 'Staff Roles', icon: Users, adminOnly: true },
                  { id: 'audit', label: 'Audit Logs', icon: ShieldCheck, adminOnly: true },
                  { id: 'architecture', label: 'Future Modules', icon: Database, adminOnly: false },
                ] as const
              )
                .filter((t) => !t.adminOnly || isAdmin)
                .map((tab) => {
                  const Icon = tab.icon;
                  const active = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setActiveTab(tab.id)}
                      className={`inline-flex items-center gap-2 px-3.5 py-2 text-xs font-medium rounded-lg transition-colors ${
                        active
                          ? 'bg-[#ED2126] text-white font-semibold'
                          : 'text-white/90 hover:text-white'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
            </div>

            {activeTab === 'portfolio' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <form
                  onSubmit={handleCreateProject}
                  className="lg:col-span-4 p-6 bg-[#850B11] border border-white/10 rounded-2xl space-y-4 h-fit"
                >
                  <h2 className="text-lg font-display font-bold flex items-center gap-2">
                    <Plus className="w-4 h-4 text-[#ED2126]" />
                    New Portfolio Case Study
                  </h2>
                  <input
                    type="text"
                    required
                    value={newProjTitle}
                    onChange={(e) => setNewProjTitle(e.target.value)}
                    placeholder="Project title"
                    className="w-full px-3 py-2 text-sm bg-[#9E0E15] border border-white/15 rounded-lg text-white"
                  />
                  <input
                    type="text"
                    value={newProjClient}
                    onChange={(e) => setNewProjClient(e.target.value)}
                    placeholder="Authorised client name"
                    className="w-full px-3 py-2 text-sm bg-[#9E0E15] border border-white/15 rounded-lg text-white"
                  />
                  <select
                    value={newProjCategory}
                    onChange={(e) => setNewProjCategory(e.target.value as PortfolioCategory)}
                    className="w-full px-3 py-2 text-sm bg-[#9E0E15] border border-white/15 rounded-lg text-white"
                  >
                    {PORTFOLIO_CATEGORIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                  <select
                    value={newProjDivision}
                    onChange={(e) => setNewProjDivision(e.target.value as DivisionId)}
                    className="w-full px-3 py-2 text-sm bg-[#9E0E15] border border-white/15 rounded-lg text-white"
                  >
                    <option value="creative">Visual Design</option>
                    <option value="estudios">Content Creation &amp; Marketing</option>
                    <option value="marketing">Social Media, Influencer Marketing &amp; Media Buying</option>
                    <option value="emtc">Brand Activation</option>
                  </select>
                  <textarea
                    rows={3}
                    required
                    value={newProjSummary}
                    onChange={(e) => setNewProjSummary(e.target.value)}
                    placeholder="Concise summary (min 10 chars)"
                    className="w-full px-3 py-2 text-sm bg-[#9E0E15] border border-white/15 rounded-lg text-white"
                  />
                  <button
                    type="submit"
                    disabled={busy}
                    className="w-full py-2.5 text-xs font-semibold bg-[#ED1B24] hover:bg-[#D1141C] text-white rounded-lg"
                  >
                    Create Draft Case Study
                  </button>
                </form>

                <div className="lg:col-span-8 space-y-3">
                  {cmsProjects.length === 0 ? (
                    <div className="p-8 bg-[#850B11] border border-white/10 rounded-2xl text-sm text-white/80">
                      No portfolio entries in Firestore yet. Click &ldquo;Sync Default Content to Firestore&rdquo; above or create a new draft.
                    </div>
                  ) : (
                    cmsProjects.map((proj) => (
                      <div
                        key={proj.id}
                        className="p-5 bg-[#850B11] border border-white/10 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                      >
                        <div>
                          <div className="text-xs text-white/80 mb-1">
                            {proj.category} · {proj.status.toUpperCase()}
                            {proj.isDeleted ? ' · SOFT-DELETED' : ''}
                          </div>
                          <div className="text-base font-display font-bold text-white">
                            {proj.title}
                          </div>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <button
                            type="button"
                            onClick={() => toggleProjectStatus(proj)}
                            className="px-3 py-1.5 text-xs font-medium bg-white/10 hover:bg-white/20 rounded-lg"
                          >
                            {proj.status === 'published' ? 'Move to Draft' : 'Publish'}
                          </button>
                          <button
                            type="button"
                            onClick={() => softDeleteProject(proj)}
                            className="px-3 py-1.5 text-xs font-medium border border-white/15 hover:bg-rose-950/60 rounded-lg inline-flex items-center gap-1"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>{proj.isDeleted ? 'Restore' : 'Archive'}</span>
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {activeTab === 'articles' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <form
                  onSubmit={handleCreateArticle}
                  className="lg:col-span-4 p-6 bg-[#850B11] border border-white/10 rounded-2xl space-y-4 h-fit"
                >
                  <h2 className="text-lg font-display font-bold">New Insights Article</h2>
                  <input
                    type="text"
                    required
                    value={newArtTitle}
                    onChange={(e) => setNewArtTitle(e.target.value)}
                    placeholder="Article headline"
                    className="w-full px-3 py-2 text-sm bg-[#9E0E15] border border-white/15 rounded-lg text-white"
                  />
                  <select
                    value={newArtCategory}
                    onChange={(e) => setNewArtCategory(e.target.value as ArticleCategory)}
                    className="w-full px-3 py-2 text-sm bg-[#9E0E15] border border-white/15 rounded-lg text-white"
                  >
                    <option value="Industry Articles">Industry Articles</option>
                    <option value="Marketing Insights">Marketing Insights</option>
                    <option value="Creative Trends">Creative Trends</option>
                    <option value="Company Updates">Company Updates</option>
                    <option value="Educational Content">Educational Content</option>
                  </select>
                  <textarea
                    rows={2}
                    required
                    value={newArtExcerpt}
                    onChange={(e) => setNewArtExcerpt(e.target.value)}
                    placeholder="Short excerpt"
                    className="w-full px-3 py-2 text-sm bg-[#9E0E15] border border-white/15 rounded-lg text-white"
                  />
                  <textarea
                    rows={5}
                    required
                    value={newArtBody}
                    onChange={(e) => setNewArtBody(e.target.value)}
                    placeholder="Article body (plain text paragraphs separated by blank lines)"
                    className="w-full px-3 py-2 text-sm bg-[#9E0E15] border border-white/15 rounded-lg text-white"
                  />
                  <button
                    type="submit"
                    disabled={busy}
                    className="w-full py-2.5 text-xs font-semibold bg-[#ED1B24] hover:bg-[#D1141C] text-white rounded-lg"
                  >
                    Save Draft Article
                  </button>
                </form>

                <div className="lg:col-span-8 space-y-3">
                  {cmsArticles.map((art) => (
                    <div
                      key={art.id}
                      className="p-5 bg-[#850B11] border border-white/10 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                    >
                      <div>
                        <div className="text-xs text-white/80 mb-1">
                          {art.category} · {art.publishedDate} · {art.status.toUpperCase()}
                        </div>
                        <div className="text-base font-display font-bold text-white">
                          {art.title}
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => toggleArticleStatus(art)}
                        className="px-3 py-1.5 text-xs font-medium bg-white/10 hover:bg-white/20 rounded-lg shrink-0"
                      >
                        {art.status === 'published' ? 'Move to Draft' : 'Publish'}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'team' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <form
                  onSubmit={handleCreateTeamMember}
                  className="lg:col-span-4 p-6 bg-[#850B11] border border-white/10 rounded-2xl space-y-4 h-fit"
                >
                  <h2 className="text-lg font-display font-bold flex items-center gap-2">
                    <Plus className="w-4 h-4 text-[#ED2126]" />
                    Add Team Member
                  </h2>
                  <input
                    type="text"
                    required
                    value={newMemberName}
                    onChange={(e) => setNewMemberName(e.target.value)}
                    placeholder="Full name"
                    className="w-full px-3 py-2 text-sm bg-[#9E0E15] border border-white/15 rounded-lg text-white"
                  />
                  <input
                    type="text"
                    required
                    value={newMemberRole}
                    onChange={(e) => setNewMemberRole(e.target.value)}
                    placeholder="Role or title (e.g., Creative Director)"
                    className="w-full px-3 py-2 text-sm bg-[#9E0E15] border border-white/15 rounded-lg text-white"
                  />
                  <input
                    type="text"
                    required
                    value={newMemberDivision}
                    onChange={(e) => setNewMemberDivision(e.target.value)}
                    placeholder="Division / Practice area"
                    className="w-full px-3 py-2 text-sm bg-[#9E0E15] border border-white/15 rounded-lg text-white"
                  />
                  <input
                    type="text"
                    value={newMemberPhotoUrl}
                    onChange={(e) => setNewMemberPhotoUrl(e.target.value)}
                    placeholder="Portrait URL (optional https:// or /assets/...)"
                    className="w-full px-3 py-2 text-sm bg-[#9E0E15] border border-white/15 rounded-lg text-white"
                  />
                  <textarea
                    rows={3}
                    required
                    value={newMemberBio}
                    onChange={(e) => setNewMemberBio(e.target.value)}
                    placeholder="Short biography (min 10 chars)"
                    className="w-full px-3 py-2 text-sm bg-[#9E0E15] border border-white/15 rounded-lg text-white"
                  />
                  <button
                    type="submit"
                    disabled={busy}
                    className="w-full py-2.5 text-xs font-semibold bg-[#ED1B24] hover:bg-[#D1141C] text-white rounded-lg"
                  >
                    Create Draft Team Member
                  </button>
                </form>

                <div className="lg:col-span-8 space-y-3">
                  {cmsTeamMembers.length === 0 ? (
                    <div className="p-8 bg-[#850B11] border border-white/10 rounded-2xl text-sm text-white/80">
                      No team profiles in Firestore yet. Click &ldquo;Sync Default Content to Firestore&rdquo; above or create a new team member.
                    </div>
                  ) : (
                    cmsTeamMembers.map((member) => (
                      <div
                        key={member.id}
                        className="p-5 bg-[#850B11] border border-white/10 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                      >
                        <div>
                          <div className="text-xs text-white/80 mb-1">
                            {member.role} · {member.division} · {member.status.toUpperCase()}
                            {member.isDeleted ? ' · ARCHIVED' : ''}
                          </div>
                          <div className="text-base font-display font-bold text-white">
                            {member.name}
                          </div>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <button
                            type="button"
                            onClick={() => toggleTeamMemberStatus(member)}
                            className="px-3 py-1.5 text-xs font-medium bg-white/10 hover:bg-white/20 rounded-lg"
                          >
                            {member.status === 'published' ? 'Move to Draft' : 'Publish'}
                          </button>
                          <button
                            type="button"
                            onClick={() => softDeleteTeamMember(member)}
                            className="px-3 py-1.5 text-xs font-medium border border-white/15 hover:bg-rose-950/60 rounded-lg inline-flex items-center gap-1"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>{member.isDeleted ? 'Restore' : 'Archive'}</span>
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {activeTab === 'clients' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <form
                  onSubmit={handleCreateClientLogo}
                  className="lg:col-span-4 p-6 bg-[#850B11] border border-white/10 rounded-2xl space-y-4 h-fit"
                >
                  <h2 className="text-lg font-display font-bold flex items-center gap-2">
                    <Plus className="w-4 h-4 text-[#ED2126]" />
                    Add Worldwide Client Window
                  </h2>
                  <input
                    type="text"
                    required
                    value={newClientName}
                    onChange={(e) => setNewClientName(e.target.value)}
                    placeholder="Authorised company name"
                    className="w-full px-3 py-2 text-sm bg-[#9E0E15] border border-white/15 rounded-lg text-white"
                  />
                  <input
                    type="text"
                    required
                    value={newClientSector}
                    onChange={(e) => setNewClientSector(e.target.value)}
                    placeholder="Industry / Sector (e.g., Fintech)"
                    className="w-full px-3 py-2 text-sm bg-[#9E0E15] border border-white/15 rounded-lg text-white"
                  />
                  <input
                    type="text"
                    value={newClientRegion}
                    onChange={(e) => setNewClientRegion(e.target.value)}
                    placeholder="Market / Region (e.g., Kenya & UK)"
                    className="w-full px-3 py-2 text-sm bg-[#9E0E15] border border-white/15 rounded-lg text-white"
                  />
                  <input
                    type="text"
                    value={newClientLogoUrl}
                    onChange={(e) => setNewClientLogoUrl(e.target.value)}
                    placeholder="Authorised logo URL (optional)"
                    className="w-full px-3 py-2 text-sm bg-[#9E0E15] border border-white/15 rounded-lg text-white"
                  />
                  <button
                    type="submit"
                    disabled={busy}
                    className="w-full py-2.5 text-xs font-semibold bg-[#ED1B24] hover:bg-[#D1141C] text-white rounded-lg"
                  >
                    Create Draft Client Window
                  </button>
                </form>

                <div className="lg:col-span-8 space-y-3">
                  {cmsClientLogos.length === 0 ? (
                    <div className="p-8 bg-[#850B11] border border-white/10 rounded-2xl text-sm text-white/80">
                      No worldwide client windows in Firestore yet. Click &ldquo;Sync Default Content to Firestore&rdquo; above or add an authorised company.
                    </div>
                  ) : (
                    cmsClientLogos.map((logo) => (
                      <div
                        key={logo.id}
                        className="p-5 bg-[#850B11] border border-white/10 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                      >
                        <div>
                          <div className="text-xs text-white/80 mb-1">
                            {logo.sector}
                            {logo.region ? ` · ${logo.region}` : ''} · {logo.status.toUpperCase()}
                            {logo.isDeleted ? ' · ARCHIVED' : ''}
                          </div>
                          <div className="text-base font-display font-bold text-white">
                            {logo.name}
                          </div>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <button
                            type="button"
                            onClick={() => toggleClientLogoStatus(logo)}
                            className="px-3 py-1.5 text-xs font-medium bg-white/10 hover:bg-white/20 rounded-lg"
                          >
                            {logo.status === 'published' ? 'Move to Draft' : 'Publish'}
                          </button>
                          <button
                            type="button"
                            onClick={() => softDeleteClientLogo(logo)}
                            className="px-3 py-1.5 text-xs font-medium border border-white/15 hover:bg-rose-950/60 rounded-lg inline-flex items-center gap-1"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>{logo.isDeleted ? 'Restore' : 'Archive'}</span>
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {activeTab === 'inquiries' && isAdmin && (
              <div className="space-y-4">
                <h2 className="text-xl font-display font-bold">
                  Confidential Project Inquiries ({inquiries.length})
                </h2>
                {inquiries.length === 0 ? (
                  <div className="p-8 bg-[#850B11] border border-white/10 rounded-2xl text-sm text-white/80">
                    No project inquiries have been submitted yet.
                  </div>
                ) : (
                  inquiries.map((inq) => (
                    <div
                      key={inq.id}
                      className="p-6 bg-[#850B11] border border-white/10 rounded-2xl space-y-3"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-4">
                        <div>
                          <span className="font-display text-xs font-semibold text-[#FFECEE] tabular-nums">
                            {inq.referenceCode}
                          </span>
                          <h3 className="text-lg font-display font-bold text-white">
                            {inq.companyName} — {inq.fullName}
                          </h3>
                          <div className="text-xs text-white/80">
                            {inq.businessEmail} · {inq.phone} · {inq.industry}
                          </div>
                        </div>

                        <select
                          value={inq.inquiryStatus}
                          onChange={(e) =>
                            updateInquiryStatus(
                              inq,
                              e.target.value as ProjectInquiry['inquiryStatus']
                            )
                          }
                          aria-label={`Status for ${inq.referenceCode}`}
                          className="px-3 py-1.5 text-xs bg-[#9E0E15] border border-white/15 rounded-lg text-white"
                        >
                          <option value="new">New</option>
                          <option value="reviewing">Reviewing</option>
                          <option value="contacted">Contacted</option>
                          <option value="archived">Archived</option>
                        </select>
                      </div>
                      <p className="text-sm text-white/90">{inq.projectDescription}</p>
                      <div className="text-xs text-white/80 pt-2 border-t border-white/10">
                        Budget: {inq.estimatedBudget} · Timeline: {inq.projectTimeline} · Services:{' '}
                        {inq.requiredServices.join(', ')}
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {activeTab === 'settings' && isAdmin && (
              <form
                onSubmit={handleSaveSettings}
                className="p-6 sm:p-8 bg-[#850B11] border border-white/10 rounded-2xl space-y-6 max-w-3xl"
              >
                <h2 className="text-xl font-display font-bold">
                  Verified Contact &amp; Impact Configuration
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-white/80 mb-1">Email</label>
                    <input
                      type="email"
                      value={editableSettings.email}
                      onChange={(e) =>
                        setEditableSettings({ ...editableSettings, email: e.target.value })
                      }
                      className="w-full px-3 py-2 text-sm bg-[#9E0E15] border border-white/15 rounded-lg text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-white/80 mb-1">Primary Phone</label>
                    <input
                      type="text"
                      value={editableSettings.primaryPhone}
                      onChange={(e) =>
                        setEditableSettings({ ...editableSettings, primaryPhone: e.target.value })
                      }
                      className="w-full px-3 py-2 text-sm bg-[#9E0E15] border border-white/15 rounded-lg text-white"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs text-white/80 mb-1">
                    Headquarters Address
                  </label>
                  <input
                    type="text"
                    value={editableSettings.headquartersAddress}
                    onChange={(e) =>
                      setEditableSettings({
                        ...editableSettings,
                        headquartersAddress: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 text-sm bg-[#9E0E15] border border-white/15 rounded-lg text-white"
                  />
                </div>
                <button
                  type="submit"
                  disabled={busy}
                  className="px-5 py-2.5 text-xs font-semibold bg-[#ED1B24] hover:bg-[#D1141C] text-white rounded-lg"
                >
                  Save Verified Settings
                </button>
              </form>
            )}

            {activeTab === 'users' && isAdmin && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="lg:col-span-5 p-6 bg-[#850B11] border border-white/10 rounded-2xl space-y-4 h-fit">
                  <div>
                    <h2 className="text-lg font-display font-bold">Provision staff access</h2>
                    <p className="text-xs text-white/80 mt-2 leading-relaxed">
                      Enter the Firebase UID of an existing enabled account with a verified email. The server retrieves account details and records the role change.
                    </p>
                  </div>
                  <form onSubmit={handleAssignUserRole} className="space-y-3">
                    <label className="block text-xs text-white/90">
                      Firebase user ID
                      <input value={newUserUid} onChange={(event) => setNewUserUid(event.target.value)} required maxLength={128} className="mt-1 w-full px-3 py-2 bg-[#9E0E15] border border-white/15 rounded-md" />
                    </label>
                    <label className="block text-xs text-white/90">
                      Role
                      <select value={newUserRole} onChange={(event) => setNewUserRole(event.target.value as StaffRole)} className="mt-1 w-full px-3 py-2 bg-[#9E0E15] border border-white/15 rounded-md">
                        <option value="editor">Editor</option>
                        <option value="admin">Administrator</option>
                      </select>
                    </label>
                    <button type="submit" disabled={busy} className="px-4 py-2 text-xs font-semibold bg-[#ED2126] disabled:opacity-50 rounded-md">Provision role</button>
                  </form>
                  <p className="text-[11px] text-white/75 leading-relaxed">
                    Initial administrator access must be established using the documented ADC bootstrap command. Administrators cannot modify their own access or remove the last active administrator.
                  </p>
                </div>

                <div className="lg:col-span-7 space-y-3">
                  {adminUsers.map((u) => (
                    <div
                      key={u.id}
                      className="p-4 bg-[#850B11] border border-white/10 rounded-xl flex items-center justify-between"
                    >
                      <div>
                        <div className="text-sm font-semibold text-white">{u.displayName}</div>
                        <div className="text-xs text-white/80">
                          {u.email} · {u.role} · {u.active ? 'Active' : 'Inactive'}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <select
                          aria-label={`Role for ${u.email}`}
                          value={u.role}
                          disabled={busy || u.id === user?.uid}
                          onChange={(event) => void handleRoleChange(u, { role: event.target.value as StaffRole })}
                          className="px-2 py-1 text-xs bg-[#9E0E15] border border-white/15 rounded"
                        >
                          <option value="editor">Editor</option>
                          <option value="admin">Administrator</option>
                        </select>
                        <button
                          type="button"
                          disabled={busy || u.id === user?.uid}
                          onClick={() => void handleRoleChange(u, { active: !u.active })}
                          className="px-2.5 py-1 text-xs border border-white/15 disabled:opacity-40 rounded"
                        >
                          {u.active ? 'Deactivate' : 'Reactivate'}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'audit' && isAdmin && (
              <div className="space-y-3">
                <h2 className="text-xl font-display font-bold">Server-recorded administrative events</h2>
                <p className="text-xs text-white/80">Role provisioning and inquiry status changes are recorded by trusted server transactions.</p>
                {auditLogs.length === 0 ? (
                  <div className="p-8 bg-[#850B11] border border-white/10 rounded-2xl text-sm text-white/80">
                    No audit records recorded yet.
                  </div>
                ) : (
                  <div className="overflow-x-auto border border-white/10 rounded-xl">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-[#850B11] text-white/80 border-b border-white/10">
                        <tr>
                          <th className="py-3 px-4">Actor</th>
                          <th className="py-3 px-4">Role</th>
                          <th className="py-3 px-4">Action</th>
                          <th className="py-3 px-4">Target</th>
                          <th className="py-3 px-4">Summary</th>
                          <th className="py-3 px-4">Outcome</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/10">
                        {auditLogs.map((log) => (
                          <tr key={log.id} className="bg-[#9E0E15]">
                            <td className="py-3 px-4 text-white">{log.actorEmail}</td>
                            <td className="py-3 px-4 font-display font-semibold">{log.actorRole}</td>
                            <td className="py-3 px-4 font-display font-semibold text-[#FFECEE]">{log.action}</td>
                            <td className="py-3 px-4 font-display text-white/80">
                              {log.targetCollection}/{log.targetId}
                            </td>
                            <td className="py-3 px-4 text-white/90">{log.summary}</td>
                            <td className="py-3 px-4">{log.outcome || 'Recorded'}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'architecture' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 bg-[#850B11] border border-white/10 rounded-2xl space-y-3">
                  <div className="text-xs font-display font-semibold tracking-wide text-[#FFECEE]">PHASE 2 CONTRACT READY</div>
                  <h2 className="text-xl font-display font-bold">Influencer Directory</h2>
                  <p className="text-sm text-white/90 leading-relaxed">
                    TypeScript interfaces (`InfluencerProfileContract`) and security boundaries are staged for creator profiles, social platforms, content categories, audience demographics, verified engagement metrics, and collaboration inquiries.
                  </p>
                </div>
                <div className="p-6 bg-[#850B11] border border-white/10 rounded-2xl space-y-3">
                  <div className="text-xs font-display font-semibold tracking-wide text-[#FFECEE]">PHASE 2 CONTRACT READY</div>
                  <h2 className="text-xl font-display font-bold">Client Portal</h2>
                  <p className="text-sm text-white/90 leading-relaxed">
                    Architecture (`ClientPortalWorkspaceContract`) is prepared for scoped client authentication, live project tracking, campaign reporting, deliverable sign-off, and confidential document sharing.
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
