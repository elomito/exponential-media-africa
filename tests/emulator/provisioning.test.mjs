import test from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  adminAuth,
  createUser,
  enrollPhoneFactor,
  listCollection,
  readDoc,
  resetEmulators,
  seedRole,
} from './helpers.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const TSX_PACKAGE_PATH = path.join(ROOT, 'node_modules', 'tsx', 'package.json');
const TSX_PACKAGE = JSON.parse(fs.readFileSync(TSX_PACKAGE_PATH, 'utf8'));
const TSX_BIN = typeof TSX_PACKAGE.bin === 'string' ? TSX_PACKAGE.bin : TSX_PACKAGE.bin?.tsx;
if (typeof TSX_BIN !== 'string') {
  throw new Error(`Could not resolve the tsx executable from ${TSX_PACKAGE_PATH}.`);
}
const TSX_ENTRY = path.resolve(path.dirname(TSX_PACKAGE_PATH), TSX_BIN);
if (!fs.existsSync(TSX_ENTRY)) {
  throw new Error(`The tsx executable declared by ${TSX_PACKAGE_PATH} does not exist: ${TSX_ENTRY}`);
}
const baseEnv = {
  ...process.env,
  FIREBASE_PROJECT_ID: 'demo-exponential-local',
  FIREBASE_FIRESTORE_DATABASE_ID: '(default)',
  FIREBASE_AUTH_EMULATOR_HOST: '127.0.0.1:9099',
  FIRESTORE_EMULATOR_HOST: '127.0.0.1:8080',
  GCLOUD_PROJECT: 'demo-exponential-local',
  EMA_EXPECTED_FIREBASE_PROJECT_ID: 'demo-exponential-local',
};

function runProvision(extraEnv) {
  const env = { ...baseEnv, ...extraEnv };
  for (const key of Object.keys(env)) {
    if (env[key] === undefined) delete env[key];
  }
  const result = spawnSync(process.execPath, [TSX_ENTRY, 'scripts/provision-admin.ts'], {
    env,
    encoding: 'utf8',
    timeout: 60_000,
  });
  if (result.error) {
    throw new Error(`Could not start the admin provisioning script: ${result.error.message}`, { cause: result.error });
  }
  return { code: result.status, stdout: result.stdout || '', stderr: result.stderr || '' };
}

test.before(async () => {
  await resetEmulators();
  await createUser('prov-admin');
  await createUser('prov-recovery');
  await createUser('prov-nomfa');
  await createUser('prov-unverified', { emailVerified: false });
  await createUser('prov-legacy');
  await enrollPhoneFactor('prov-admin@example.com', 'Passw0rd!23');
  await enrollPhoneFactor('prov-recovery@example.com', 'Passw0rd!23');
  await enrollPhoneFactor('prov-legacy@example.com', 'Passw0rd!23');
});

test('provisioning refuses a project ID that does not match the target', () => {
  const result = runProvision({
    EMA_EXPECTED_FIREBASE_PROJECT_ID: 'production-project-id',
    EMA_ADMIN_UID: 'prov-admin',
    EMA_ADMIN_PROVISIONING_CONFIRM: 'PROVISION_INITIAL_ADMIN',
  });
  assert.notEqual(result.code, 0);
  assert.match(result.stderr, /exactly match firebase-applet-config\.json/);
});

test('provisioning requires an explicit confirmation', () => {
  const result = runProvision({ EMA_ADMIN_UID: 'prov-admin' });
  assert.notEqual(result.code, 0);
  assert.match(result.stderr, /EMA_ADMIN_PROVISIONING_CONFIRM/);
});

test('bootstrap refuses an administrator without enrolled MFA', () => {
  const result = runProvision({
    EMA_ADMIN_UID: 'prov-nomfa',
    EMA_ADMIN_PROVISIONING_CONFIRM: 'PROVISION_INITIAL_ADMIN',
  });
  assert.notEqual(result.code, 0);
  assert.match(result.stderr, /multi-factor authentication/);
});

test('bootstrap refuses an unverified account', () => {
  const result = runProvision({
    EMA_ADMIN_UID: 'prov-unverified',
    EMA_ADMIN_PROVISIONING_CONFIRM: 'PROVISION_INITIAL_ADMIN',
  });
  assert.notEqual(result.code, 0);
  assert.match(result.stderr, /verified email/);
});

test('bootstrap provisions the first administrator and writes an audit record', async () => {
  const result = runProvision({
    EMA_ADMIN_UID: 'prov-admin',
    EMA_ADMIN_PROVISIONING_CONFIRM: 'PROVISION_INITIAL_ADMIN',
  });
  assert.equal(result.code, 0, result.stderr);
  const record = await readDoc('users', 'prov-admin');
  assert.equal(record.role, 'admin');
  assert.equal(record.active, true);
  assert.equal(record.updatedBy, 'owner-approved-bootstrap');
  const control = await readDoc('_admin_control', 'active_admins');
  assert.equal(control.activeAdminCount, 1);
  const audit = (await listCollection('audit_logs')).filter((entry) => entry.action === 'INITIAL_ADMIN_BOOTSTRAP');
  assert.equal(audit.length, 1);
});

test('bootstrap is refused while a usable administrator exists', () => {
  const result = runProvision({
    EMA_ADMIN_UID: 'prov-recovery',
    EMA_ADMIN_PROVISIONING_CONFIRM: 'PROVISION_INITIAL_ADMIN',
  });
  assert.notEqual(result.code, 0);
  assert.match(result.stderr, /administrator already exists/);
});

test('recovery is refused while a usable administrator exists', () => {
  const result = runProvision({
    EMA_ADMIN_UID: 'prov-recovery',
    EMA_ADMIN_PROVISIONING_CONFIRM: 'RECOVER_WITH_NO_USABLE_ADMIN',
  });
  assert.notEqual(result.code, 0);
  assert.match(result.stderr, /administrator already exists/);
});

test('recovery replaces an unusable administrator and audits the change', async () => {
  await adminAuth.updateUser('prov-admin', { disabled: true });
  const result = runProvision({
    EMA_ADMIN_UID: 'prov-recovery',
    EMA_ADMIN_PROVISIONING_CONFIRM: 'RECOVER_WITH_NO_USABLE_ADMIN',
  });
  assert.equal(result.code, 0, result.stderr);
  assert.equal((await readDoc('users', 'prov-admin')).active, false);
  assert.equal((await readDoc('users', 'prov-admin')).updatedBy, 'owner-approved-recovery');
  assert.equal((await readDoc('users', 'prov-recovery')).role, 'admin');
  const audit = (await listCollection('audit_logs')).filter((entry) => entry.action === 'EMERGENCY_ADMIN_RECOVERY');
  assert.equal(audit.length, 1);
  assert.match(audit[0].summary, /deactivated 1 unavailable admin role/);
});

test('recovery refuses to overwrite a malformed role record', async () => {
  await seedRole('prov-legacy', { uid: 'prov-legacy', role: 'ADMIN', active: true, email: 'prov-legacy@example.com' });
  await adminAuth.updateUser('prov-recovery', { disabled: true });
  const result = runProvision({
    EMA_ADMIN_UID: 'prov-legacy',
    EMA_ADMIN_PROVISIONING_CONFIRM: 'RECOVER_WITH_NO_USABLE_ADMIN',
  });
  assert.notEqual(result.code, 0);
  assert.match(result.stderr, /malformed role record/);
  await adminAuth.updateUser('prov-recovery', { disabled: false });
});

test('legacy role migration rewrites uppercase roles and audits each record', async () => {
  await seedRole('prov-legacy', {
    uid: 'prov-legacy',
    email: 'prov-legacy@example.com',
    displayName: 'Legacy Admin',
    role: 'ADMIN',
    active: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  const result = runProvision({ EMA_ADMIN_PROVISIONING_CONFIRM: 'MIGRATE_LEGACY_ROLES' });
  assert.equal(result.code, 0, result.stderr);
  const migrated = await readDoc('users', 'prov-legacy');
  assert.equal(migrated.role, 'admin');
  assert.equal(migrated.createdBy, 'owner-approved-role-migration');
  const audit = (await listCollection('audit_logs')).filter((entry) => entry.action === 'MIGRATE_ROLE_RECORD');
  assert.equal(audit.length, 1);
});

test('legacy migration refuses a malformed legacy record', async () => {
  await seedRole('prov-broken-legacy', {
    uid: 'prov-broken-legacy',
    email: 'not-an-email',
    displayName: 'Broken',
    role: 'EDITOR',
    active: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  const result = runProvision({ EMA_ADMIN_PROVISIONING_CONFIRM: 'MIGRATE_LEGACY_ROLES' });
  assert.notEqual(result.code, 0);
  assert.match(result.stderr, /malformed; migration stopped/);
});
