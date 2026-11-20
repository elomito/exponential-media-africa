import test from 'node:test';
import assert from 'node:assert/strict';
import {
  adminDb,
  completeMfaSignIn,
  createUser,
  enrollPhoneFactor,
  idTokenFor,
  resetEmulators,
  roleRecord,
  rulesDoc,
  rulesQuery,
  seedRole,
  timestampValue,
} from './helpers.mjs';

const users = {};
let tokens = {};

const validProject = (overrides = {}) => ({
  slug: 'rules-test-project',
  title: 'Rules Test Project',
  category: 'Branding',
  division: 'creative',
  clientName: 'Rules Client',
  summary: 'A summary that satisfies the minimum length requirement.',
  challenge: 'A challenge statement that satisfies the rules minimum length.',
  solution: 'A solution statement that satisfies the rules minimum length.',
  deliverables: ['Identity design'],
  imageUrl: '/assets/profile/work/visual-design-studio.jpg',
  isPlaceholder: false,
  featured: false,
  status: 'published',
  isDeleted: false,
  ...overrides,
});

test.before(async () => {
  await resetEmulators();
  users.public = await createUser('rules-public');
  users.editor = await createUser('rules-editor');
  users.admin = await createUser('rules-admin');
  users.adminNoMfa = await createUser('rules-admin-nomfa');

  await seedRole('rules-editor', roleRecord('rules-editor'));
  await seedRole('rules-admin', roleRecord('rules-admin', { role: 'admin' }));
  await seedRole('rules-admin-nomfa', roleRecord('rules-admin-nomfa', { role: 'admin' }));
  await enrollPhoneFactor(users.admin.email, users.admin.password);

  await adminDb.collection('portfolio_projects').doc('p-published').set(validProject());
  await adminDb.collection('portfolio_projects').doc('p-draft').set(validProject({ slug: 'rules-draft', status: 'draft' }));
  await adminDb.collection('portfolio_projects').doc('p-deleted').set(validProject({ slug: 'rules-deleted', isDeleted: true }));
  await adminDb.collection('inquiries').doc('rules-inquiry').set({
    referenceCode: 'EMA-2026-RULE01',
    fullName: 'Rules Client',
    businessEmail: 'client@example.com',
    companyName: 'Rules Co',
    phone: '+254700000000',
    industry: 'Retail',
    requiredServices: ['Media Buy'],
    estimatedBudget: 'KES 1M',
    projectTimeline: '3 months',
    projectDescription: 'A test inquiry description long enough.',
    consentAccepted: true,
    inquiryStatus: 'new',
    createdAt: new Date(),
  });

  tokens = {
    public: await idTokenFor(users.public.email, users.public.password),
    editor: await idTokenFor(users.editor.email, users.editor.password),
    admin: (await completeMfaSignIn(users.admin.email, users.admin.password)).idToken,
    adminNoMfa: await idTokenFor(users.adminNoMfa.email, users.adminNoMfa.password),
  };
});

test('anonymous public reads only published, non-deleted projects', async () => {
  assert.equal((await rulesDoc('portfolio_projects/p-published')).status, 200);
  assert.equal((await rulesDoc('portfolio_projects/p-draft')).status, 403);
  assert.equal((await rulesDoc('portfolio_projects/p-deleted')).status, 403);
});

test('anonymous list requires published and non-deleted query constraints', async () => {
  const constrained = await rulesQuery('portfolio_projects', [
    { field: 'status', value: 'published' },
    { field: 'isDeleted', value: false },
  ]);
  assert.equal(constrained.status, 200);
  const unfiltered = await rulesQuery('portfolio_projects');
  assert.equal(unfiltered.status, 403);
});

test('editor can read draft content and create valid content', async () => {
  assert.equal((await rulesDoc('portfolio_projects/p-draft', { token: tokens.editor })).status, 200);
  const create = await rulesDoc('portfolio_projects/p-editor-new', {
    method: 'PATCH',
    token: tokens.editor,
    data: validProject({ slug: 'editor-created' }),
  });
  assert.equal(create.status, 200);
});

test('editor cannot delete content or perform administrator operations', async () => {
  assert.equal((await rulesDoc('portfolio_projects/p-published', { method: 'DELETE', token: tokens.editor })).status, 403);
  assert.equal(
    (await rulesDoc('portfolio_projects/p-invalid', { method: 'PATCH', token: tokens.editor, data: { slug: 'x' } })).status,
    403,
  );
  assert.equal((await rulesDoc('users/rules-editor', { method: 'PATCH', token: tokens.editor, data: roleRecord('rules-editor', { role: 'admin' }) })).status, 403);
});

test('administrator rules require both an MFA claim and an active admin record', async () => {
  assert.equal((await rulesDoc('portfolio_projects/p-draft', { token: tokens.adminNoMfa })).status, 403);
  assert.equal((await rulesDoc('portfolio_projects/p-draft', { token: tokens.admin })).status, 200);
  assert.equal((await rulesDoc('portfolio_projects/p-editor-new', { method: 'DELETE', token: tokens.admin })).status, 200);
});

test('role records cannot be created or modified by browsers', async () => {
  const createOwn = await rulesDoc('users/rules-public', {
    method: 'PATCH',
    token: tokens.public,
    data: roleRecord('rules-public', { role: 'admin' }),
  });
  assert.equal(createOwn.status, 403);
  const elevateOther = await rulesDoc('users/rules-editor', {
    method: 'PATCH',
    token: tokens.admin,
    data: roleRecord('rules-editor', { role: 'admin' }),
  });
  assert.equal(elevateOther.status, 403, 'even administrators cannot write role records from the browser');
  assert.equal((await rulesDoc('users/rules-editor', { method: 'DELETE', token: tokens.admin })).status, 403);
});

test('users can read only their own valid role record', async () => {
  assert.equal((await rulesDoc('users/rules-editor', { token: tokens.editor })).status, 200);
  assert.equal((await rulesDoc('users/rules-admin', { token: tokens.editor })).status, 403);
  assert.equal((await rulesDoc('users/rules-editor', { token: tokens.public })).status, 403);
  assert.equal((await rulesDoc('users/rules-editor')).status, 403);
});

test('audit records cannot be fabricated by browsers', async () => {
  const payload = {
    actorUid: 'rules-admin',
    actorEmail: 'rules-admin@example.com',
    actorRole: 'admin',
    action: 'FORGED',
    targetCollection: 'users',
    targetId: 'rules-editor',
    outcome: 'success',
    summary: 'forged record',
    createdAt: timestampValue(),
  };
  assert.equal((await rulesDoc('audit_logs/forged-1', { method: 'PATCH', token: tokens.admin, data: payload })).status, 403);
  assert.equal((await rulesDoc('audit_logs/forged-2', { method: 'PATCH', token: tokens.public, data: payload })).status, 403);
});

test('inquiries are private to administrators and never browser-writable', async () => {
  const inquiryPayload = {
    referenceCode: 'EMA-2026-RULE02',
    fullName: 'Rules Client',
    businessEmail: 'client@example.com',
    companyName: 'Rules Co',
    phone: '+254700000000',
    industry: 'Retail',
    requiredServices: ['Media Buy'],
    estimatedBudget: 'KES 1M',
    projectTimeline: '3 months',
    projectDescription: 'A test inquiry description long enough.',
    consentAccepted: true,
    inquiryStatus: 'new',
    createdAt: timestampValue(),
  };
  assert.equal((await rulesDoc('inquiries/new-one', { method: 'PATCH', data: inquiryPayload })).status, 403);
  assert.equal((await rulesDoc('inquiries/new-two', { method: 'PATCH', token: tokens.editor, data: inquiryPayload })).status, 403);
  assert.equal((await rulesDoc('inquiries/new-three', { method: 'PATCH', token: tokens.admin, data: inquiryPayload })).status, 403);

  assert.equal((await rulesDoc('inquiries/rules-inquiry', { token: tokens.public })).status, 403);
  assert.equal((await rulesDoc('inquiries/rules-inquiry', { token: tokens.editor })).status, 403);
  assert.equal((await rulesDoc('inquiries/rules-inquiry', { token: tokens.admin })).status, 200);

  assert.equal(
    (await rulesDoc('inquiries/rules-inquiry', { method: 'PATCH', token: tokens.admin, data: { inquiryStatus: 'archived' }, mask: ['inquiryStatus'] })).status,
    403,
  );
  assert.equal((await rulesDoc('inquiries/rules-inquiry', { method: 'DELETE', token: tokens.admin })).status, 403);
});

test('newsletter subscription writes stay disabled', async () => {
  const digest = 'a'.repeat(64);
  const payload = { status: 'pending', unsubscribeToken: 'x'.repeat(32), subscribedAt: timestampValue() };
  assert.equal((await rulesDoc(`newsletter_subscribers/${digest}`, { method: 'PATCH', data: payload })).status, 403);
  assert.equal((await rulesDoc(`newsletter_subscribers/${digest}`, { method: 'PATCH', token: tokens.editor, data: payload })).status, 403);
});

test('site settings remain read-only to the public', async () => {
  await adminDb.collection('site_settings').doc('main').set({
    companyName: 'Exponential Media Africa',
    tagline: 'Imaginative Solutions for Exponential Growth.',
    email: 'info@exponentialmedia.africa',
    primaryPhone: '+254 728 231 221',
    headquartersAddress: 'A3-10 Casamia, Ngong Road, Kilimani, Nairobi, Kenya',
    socialLinks: {},
    impactMetrics: {},
  });
  assert.equal((await rulesDoc('site_settings/main')).status, 200);
  const anonymousWrite = await rulesDoc('site_settings/main', {
    method: 'PATCH',
    data: { companyName: 'Hijacked', tagline: 'Hijacked tagline here' },
    mask: ['companyName', 'tagline'],
  });
  assert.equal(anonymousWrite.status, 403);
  const editorWrite = await rulesDoc('site_settings/main', {
    method: 'PATCH',
    token: tokens.editor,
    data: { companyName: 'Hijacked', tagline: 'Hijacked tagline here' },
    mask: ['companyName', 'tagline'],
  });
  assert.equal(editorWrite.status, 403);
  const invalidAdminWrite = await rulesDoc('site_settings/main', {
    method: 'PATCH',
    token: tokens.admin,
    data: { companyName: 'X' },
    mask: ['companyName'],
  });
  assert.equal(invalidAdminWrite.status, 403, 'settings must still satisfy the full schema');
});
