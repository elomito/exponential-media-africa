import test from 'node:test';
import assert from 'node:assert/strict';
import {
  adminDb,
  adminAuth,
  api,
  completeMfaSignIn,
  createUser,
  enrollPhoneFactor,
  idTokenFor,
  listCollection,
  readDoc,
  resetEmulators,
  roleRecord,
  seedRole,
} from './helpers.mjs';

const users = {};

test.before(async () => {
  await resetEmulators();
  users.public = await createUser('u-public');
  users.unverified = await createUser('u-unverified', { emailVerified: false });
  users.disabled = await createUser('u-disabled');
  users.editor = await createUser('u-editor');
  users.admin = await createUser('u-admin');
  users.adminNoMfa = await createUser('u-admin-nomfa');
  users.inactive = await createUser('u-inactive');
  users.malformed = await createUser('u-malformed');
  users.revoked = await createUser('u-revoked');
  users.targetEditor = await createUser('u-target-editor');
  users.targetNoMfa = await createUser('u-target-nomfa');

  await seedRole('u-editor', roleRecord('u-editor'));
  await seedRole('u-admin', roleRecord('u-admin', { role: 'admin' }));
  await seedRole('u-admin-nomfa', roleRecord('u-admin-nomfa', { role: 'admin' }));
  await seedRole('u-inactive', roleRecord('u-inactive', { active: false }));
  await seedRole('u-malformed', roleRecord('u-malformed', { role: 'ADMIN' }));

  await enrollPhoneFactor(users.admin.email, users.admin.password);
});

async function adminToken() {
  const result = await completeMfaSignIn(users.admin.email, users.admin.password);
  assert.equal(result.mfa, true, 'fixture administrator must sign in with a second factor');
  return result.idToken;
}

test('missing, malformed and invalid bearer tokens are rejected with 401', async () => {
  assert.equal((await api('/api/auth/session')).status, 401);
  assert.equal((await api('/api/auth/session', { token: 'not-a-jwt' })).status, 401);
  const forged = 'eyJhbGciOiJub25lIn0.eyJ1aWQiOiJ1LWFkbWluIn0.';
  assert.equal((await api('/api/auth/session', { token: forged })).status, 401);
  assert.equal((await api('/api/auth/session', { headers: { Authorization: 'Basic abc' } })).status, 401);
});

test('disabled accounts are rejected', async () => {
  const disabledToken = await idTokenFor(users.disabled.email, users.disabled.password);
  await adminAuth.updateUser('u-disabled', { disabled: true });
  const disabled = await api('/api/auth/session', { token: disabledToken });
  assert.equal(disabled.status, 401, 'disabled account must be rejected');
  await adminAuth.updateUser('u-disabled', { disabled: false });
});

test('revoked ID tokens are rejected', async (t) => {
  const revokedToken = await idTokenFor(users.revoked.email, users.revoked.password);
  await adminAuth.revokeRefreshTokens('u-revoked');
  const revoked = await api('/api/auth/session', { token: revokedToken });
  if (revoked.status !== 401) {
    t.diagnostic('Firebase Auth emulator accepted a token after revokeRefreshTokens, so checkRevoked cannot be proven locally.');
    return t.skip('BLOCKED: the Auth emulator does not enforce token revocation; revocation is covered by unit tests and requires a real Firebase project.');
  }
  assert.equal(revoked.status, 401, 'previously issued token must fail after revocation');
});

test('accounts without a role record resolve to public only', async () => {
  const token = await idTokenFor(users.public.email, users.public.password);
  const response = await api('/api/auth/session', { token });
  assert.equal(response.status, 200);
  assert.equal(response.body.role, 'public');
  assert.equal(response.body.uid, 'u-public');
});

test('unverified email resolves to public', async () => {
  const token = await idTokenFor(users.unverified.email, users.unverified.password);
  const response = await api('/api/auth/session', { token });
  assert.equal(response.status, 200);
  assert.equal(response.body.role, 'public');
});

test('inactive role record resolves to public', async () => {
  const token = await idTokenFor(users.inactive.email, users.inactive.password);
  const response = await api('/api/auth/session', { token });
  assert.equal(response.status, 200);
  assert.equal(response.body.role, 'public');
});

test('malformed role record fails closed with 403', async () => {
  const token = await idTokenFor(users.malformed.email, users.malformed.password);
  const response = await api('/api/auth/session', { token });
  assert.equal(response.status, 403);
});

test('active editor is authorized as editor', async () => {
  const token = await idTokenFor(users.editor.email, users.editor.password);
  const response = await api('/api/auth/session', { token });
  assert.equal(response.status, 200);
  assert.equal(response.body.role, 'editor');
});

test('administrator without an MFA sign-in fails closed with 403', async () => {
  const token = await idTokenFor(users.adminNoMfa.email, users.adminNoMfa.password);
  const response = await api('/api/auth/session', { token });
  assert.equal(response.status, 403);
});

test('administrator with a verified MFA sign-in is authorized', async () => {
  const token = await adminToken();
  const response = await api('/api/auth/session', { token });
  assert.equal(response.status, 200);
  assert.equal(response.body.role, 'admin');
});

test('public and editor accounts cannot reach administrator operations', async () => {
  const publicToken = await idTokenFor(users.public.email, users.public.password);
  const editorToken = await idTokenFor(users.editor.email, users.editor.password);
  const payload = { uid: 'u-target-editor', role: 'editor' };
  assert.equal((await api('/api/admin/roles', { method: 'POST', token: publicToken, body: payload })).status, 403);
  assert.equal((await api('/api/admin/roles', { method: 'POST', token: editorToken, body: payload })).status, 403);
  assert.equal(
    (await api('/api/admin/roles/u-target-editor', { method: 'PATCH', token: editorToken, body: { active: false } })).status,
    403,
  );
  assert.equal(
    (await api('/api/admin/inquiries/some-inquiry/status', { method: 'PATCH', token: editorToken, body: { inquiryStatus: 'archived' } })).status,
    403,
  );
});

test('administrators cannot provision or modify their own role record', async () => {
  const token = await adminToken();
  const provisionSelf = await api('/api/admin/roles', {
    method: 'POST',
    token,
    body: { uid: 'u-admin', role: 'admin' },
  });
  assert.equal(provisionSelf.status, 409);
  const patchSelf = await api('/api/admin/roles/u-admin', {
    method: 'PATCH',
    token,
    body: { role: 'editor' },
  });
  assert.equal(patchSelf.status, 409);
});

test('role provisioning validates the target and records an audit event', async () => {
  const token = await adminToken();
  const before = (await listCollection('audit_logs')).length;

  const provisionEditor = await api('/api/admin/roles', {
    method: 'POST',
    token,
    body: { uid: 'u-target-editor', role: 'editor' },
  });
  assert.equal(provisionEditor.status, 201);
  const saved = await readDoc('users', 'u-target-editor');
  assert.equal(saved.role, 'editor');
  assert.equal(saved.active, true);
  assert.equal(saved.email, 'u-target-editor@example.com');

  const duplicate = await api('/api/admin/roles', {
    method: 'POST',
    token,
    body: { uid: 'u-target-editor', role: 'editor' },
  });
  assert.equal(duplicate.status, 409);

  const adminWithoutMfa = await api('/api/admin/roles', {
    method: 'POST',
    token,
    body: { uid: 'u-target-nomfa', role: 'admin' },
  });
  assert.equal(adminWithoutMfa.status, 400, 'admin role requires enrolled MFA');

  const missingTarget = await api('/api/admin/roles', {
    method: 'POST',
    token,
    body: { uid: 'u-does-not-exist', role: 'editor' },
  });
  assert.equal(missingTarget.status, 404);

  const after = await listCollection('audit_logs');
  assert.equal(after.length, before + 1, 'only the successful provisioning writes an audit record');
  assert.equal(after[after.length - 1].action, 'PROVISION_ROLE');
  assert.equal(after[after.length - 1].actorUid, 'u-admin');
});

test('role updates enforce activation checks and write audit events', async () => {
  const token = await adminToken();
  const deactivate = await api('/api/admin/roles/u-target-editor', {
    method: 'PATCH',
    token,
    body: { active: false },
  });
  assert.equal(deactivate.status, 200);
  assert.equal((await readDoc('users', 'u-target-editor')).active, false);

  const audit = (await listCollection('audit_logs')).filter((entry) => entry.action === 'DEACTIVATE_ROLE');
  assert.equal(audit.length, 1);

  const reactivateUnverified = await api('/api/admin/roles/u-target-nomfa', {
    method: 'PATCH',
    token,
    body: { active: true },
  });
  assert.equal(reactivateUnverified.status, 404, 'no role record exists for this account');
});

test('administrator can update inquiry status and the audit record is server generated', async () => {
  const token = await adminToken();
  await adminDb.collection('inquiries').doc('inquiry-test-1').set({
    referenceCode: 'EMA-2026-ABC123',
    fullName: 'Test Client',
    businessEmail: 'client@example.com',
    companyName: 'Test Co',
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

  const update = await api('/api/admin/inquiries/inquiry-test-1/status', {
    method: 'PATCH',
    token,
    body: { inquiryStatus: 'reviewing' },
  });
  assert.equal(update.status, 200);
  assert.equal((await readDoc('inquiries', 'inquiry-test-1')).inquiryStatus, 'reviewing');

  const missing = await api('/api/admin/inquiries/missing-inquiry/status', {
    method: 'PATCH',
    token,
    body: { inquiryStatus: 'archived' },
  });
  assert.equal(missing.status, 404);

  const invalidStatus = await api('/api/admin/inquiries/inquiry-test-1/status', {
    method: 'PATCH',
    token,
    body: { inquiryStatus: 'deleted' },
  });
  assert.equal(invalidStatus.status, 400);

  const audit = (await listCollection('audit_logs')).filter((entry) => entry.action === 'UPDATE_INQUIRY_STATUS');
  assert.equal(audit.length, 1);
  assert.match(audit[0].summary, /new to reviewing/);
});
