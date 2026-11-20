import test from 'node:test';
import assert from 'node:assert/strict';
import {
  AuthorizationError,
  hasUsableAdminAccess,
  isRoleRecord,
  mayProvisionRole,
  mayRemoveActiveAdmin,
  resolveVerifiedPrincipal,
  roleAllows,
} from '../src/lib/admin-auth.ts';

const timestamp = { toDate: () => new Date(0) };
const record = (overrides = {}) => ({
  uid: 'staff-1',
  email: 'staff@example.com',
  displayName: 'Staff Member',
  role: 'editor',
  active: true,
  createdAt: timestamp,
  createdBy: 'owner-bootstrap',
  updatedAt: timestamp,
  updatedBy: 'owner-bootstrap',
  ...overrides,
});

function authDouble({ decoded = { uid: 'staff-1', email_verified: true }, account = { disabled: false, emailVerified: true, email: 'staff@example.com', displayName: 'Staff Member' }, verifyError, userError } = {}) {
  return {
    verifyIdToken: async (_token, checkRevoked) => {
      assert.equal(checkRevoked, true, 'revocation check must be enabled');
      if (verifyError) throw verifyError;
      return decoded;
    },
    getUser: async () => {
      if (userError) throw userError;
      return account;
    },
  };
}

test('missing bearer token fails before token verification', async () => {
  let called = false;
  const auth = authDouble();
  auth.verifyIdToken = async () => { called = true; return { uid: 'staff-1', email_verified: true }; };
  await assert.rejects(
    resolveVerifiedPrincipal(auth, async () => null, null),
    (error) => error instanceof AuthorizationError && error.status === 401,
  );
  assert.equal(called, false);
});

test('invalid, expired and revoked tokens fail closed and enable revocation checks', async (t) => {
  for (const code of ['auth/invalid-id-token', 'auth/id-token-expired', 'auth/id-token-revoked']) {
    await t.test(code, async () => {
      await assert.rejects(
        resolveVerifiedPrincipal(authDouble({ verifyError: Object.assign(new Error(code), { code }) }), async () => record(), 'token'),
        (error) => error instanceof AuthorizationError && error.status === 401,
      );
    });
  }
});

test('disabled and deleted accounts are rejected', async () => {
  await assert.rejects(
    resolveVerifiedPrincipal(authDouble({ account: { disabled: true, emailVerified: true, email: 'staff@example.com' } }), async () => record(), 'token'),
    (error) => error instanceof AuthorizationError && error.status === 401,
  );
  await assert.rejects(
    resolveVerifiedPrincipal(authDouble({ userError: Object.assign(new Error('missing'), { code: 'auth/user-not-found' }) }), async () => null, 'token'),
    (error) => error instanceof AuthorizationError && error.status === 401,
  );
});

test('Firebase verification infrastructure failure returns unavailable rather than public', async () => {
  await assert.rejects(
    resolveVerifiedPrincipal(
      authDouble({ verifyError: Object.assign(new Error('network unavailable'), { code: 'app/network-error' }) }),
      async () => null,
      'token',
    ),
    (error) => error instanceof AuthorizationError && error.status === 503,
  );
});

test('unverified and unassigned accounts resolve only to public', async () => {
  const unverified = await resolveVerifiedPrincipal(
    authDouble({ decoded: { uid: 'staff-1', email_verified: false }, account: { disabled: false, emailVerified: false, email: 'staff@example.com' } }),
    async () => record({ role: 'admin' }),
    'token',
  );
  const missing = await resolveVerifiedPrincipal(authDouble(), async () => null, 'token');
  assert.equal(unverified.role, 'public');
  assert.equal(missing.role, 'public');
});

test('inactive role is public; malformed or mismatched UID fails closed', async () => {
  const inactive = await resolveVerifiedPrincipal(authDouble(), async () => record({ active: false }), 'token');
  assert.equal(inactive.role, 'public');
  await assert.rejects(
    resolveVerifiedPrincipal(authDouble(), async () => record({ role: 'superadmin' }), 'token'),
    (error) => error instanceof AuthorizationError && error.status === 403,
  );
  await assert.rejects(
    resolveVerifiedPrincipal(authDouble(), async () => record({ uid: 'different-user' }), 'token'),
    (error) => error instanceof AuthorizationError && error.status === 403,
  );
  assert.equal(isRoleRecord('staff-1', { ...record(), extra: true }), false);
  assert.equal(isRoleRecord('staff-1', record({ role: 'ADMIN' })), false);
});

test('active administrators require a Firebase MFA sign-in claim', async () => {
  const adminRecord = record({ role: 'admin' });
  await assert.rejects(
    resolveVerifiedPrincipal(authDouble(), async () => adminRecord, 'token'),
    (error) => error instanceof AuthorizationError && error.status === 403,
  );
  const admin = await resolveVerifiedPrincipal(
    authDouble({
      decoded: { uid: 'staff-1', email_verified: true, firebase: { sign_in_second_factor: 'totp' } },
      account: { disabled: false, emailVerified: true, email: 'staff@example.com', multiFactor: { enrolledFactors: [{ factorId: 'totp' }] } },
    }),
    async () => adminRecord,
    'token',
  );
  assert.equal(admin.role, 'admin');
  await assert.rejects(
    resolveVerifiedPrincipal(
      authDouble({ decoded: { uid: 'staff-1', email_verified: true, firebase: { sign_in_second_factor: 'totp' } } }),
      async () => adminRecord,
      'token',
    ),
    (error) => error instanceof AuthorizationError && error.status === 403,
  );
});

test('editor and administrator permissions are separate', async () => {
  const editor = await resolveVerifiedPrincipal(authDouble(), async () => record(), 'token');
  const admin = await resolveVerifiedPrincipal(
    authDouble({
      decoded: { uid: 'staff-1', email_verified: true, firebase: { sign_in_second_factor: 'totp' } },
      account: { disabled: false, emailVerified: true, email: 'staff@example.com', multiFactor: { enrolledFactors: [{ factorId: 'totp' }] } },
    }),
    async () => record({ role: 'admin' }),
    'token',
  );
  assert.equal(roleAllows(editor.role, ['editor', 'admin']), true);
  assert.equal(roleAllows(editor.role, ['admin']), false);
  assert.equal(roleAllows(admin.role, ['admin']), true);
  assert.equal(roleAllows('public', ['editor', 'admin']), false);
  assert.equal(mayProvisionRole(editor, 'other-uid'), false);
  assert.equal(mayProvisionRole(admin, admin.uid), false);
  assert.equal(mayProvisionRole(admin, 'other-uid'), true);
});

test('unauthorized inquiry and audit access is denied to public users and editors', () => {
  for (const role of ['public', 'editor']) {
    assert.equal(roleAllows(role, ['admin']), false, `${role} cannot access inquiries or audit records`);
  }
  assert.equal(roleAllows('admin', ['admin']), true);
});

test('role store failures are unavailable, never public', async () => {
  await assert.rejects(
    resolveVerifiedPrincipal(authDouble(), async () => { throw new Error('Firestore unavailable'); }, 'token'),
    (error) => error instanceof AuthorizationError && error.status === 503,
  );
});

test('the last active administrator cannot be demoted or deactivated', () => {
  assert.equal(mayRemoveActiveAdmin(1, 'admin', true, 'editor', true), false);
  assert.equal(mayRemoveActiveAdmin(1, 'admin', true, 'admin', false), false);
  assert.equal(mayRemoveActiveAdmin(2, 'admin', true, 'editor', true), true);
  assert.equal(mayRemoveActiveAdmin(1, 'editor', true, 'editor', false), true);
});

test('recovery only treats a valid, enabled, verified MFA administrator as usable', () => {
  const adminRole = record({ role: 'admin' });
  const account = { disabled: false, emailVerified: true, email: 'staff@example.com', multiFactor: { enrolledFactors: [{ factorId: 'totp' }] } };
  assert.equal(hasUsableAdminAccess('staff-1', adminRole, account), true);
  assert.equal(hasUsableAdminAccess('staff-1', adminRole, { ...account, disabled: true }), false);
  assert.equal(hasUsableAdminAccess('staff-1', adminRole, { ...account, emailVerified: false }), false);
  assert.equal(hasUsableAdminAccess('staff-1', adminRole, { ...account, multiFactor: { enrolledFactors: [] } }), false);
  assert.equal(hasUsableAdminAccess('staff-1', { ...adminRole, extra: true }, account), false);
  assert.equal(hasUsableAdminAccess('staff-1', record(), account), false);
});
