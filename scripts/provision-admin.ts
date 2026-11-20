import { applicationDefault, getApps, initializeApp } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { FieldValue, getFirestore } from 'firebase-admin/firestore';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { hasUsableAdminAccess, isRoleRecord } from '../src/lib/admin-auth.ts';

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const project = JSON.parse(fs.readFileSync(path.join(scriptDir, '../firebase-applet-config.json'), 'utf8')) as {
  projectId: string;
  firestoreDatabaseId: string;
};
// Only the Firebase Emulator run overrides these; a real run uses firebase-applet-config.json as-is.
const projectId = process.env.FIREBASE_PROJECT_ID?.trim() || project.projectId;
const firestoreDatabaseId = process.env.FIREBASE_FIRESTORE_DATABASE_ID?.trim() || project.firestoreDatabaseId;
const emulatorMode =
  process.env.FIREBASE_EMULATOR_MODE === 'true' ||
  Boolean(process.env.FIREBASE_AUTH_EMULATOR_HOST) ||
  Boolean(process.env.FIRESTORE_EMULATOR_HOST);

async function migrateLegacyRoles(auth: ReturnType<typeof getAuth>, db: ReturnType<typeof getFirestore>) {
  const users = db.collection('users');
  const snapshot = await users.get();
  const legacyRecords = snapshot.docs.filter((record) => record.data().role === 'ADMIN' || record.data().role === 'EDITOR');
  if (legacyRecords.length === 0) {
    console.log('No legacy uppercase role records were found.');
    return;
  }
  if (legacyRecords.length > 240) throw new Error('Too many legacy role records for one safe transaction; use a reviewed migration process.');

  const verifiedAccounts = new Map<string, Awaited<ReturnType<typeof auth.getUser>>>();
  for (const record of legacyRecords) {
    const data = record.data();
    const allowed = ['uid', 'email', 'displayName', 'role', 'active', 'updatedAt', 'createdAt'];
    if (
      data.uid !== record.id ||
      typeof data.email !== 'string' || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(data.email) ||
      typeof data.displayName !== 'string' || data.displayName.trim().length === 0 || data.displayName.length > 120 ||
      typeof data.active !== 'boolean' || Object.keys(data).some((key) => !allowed.includes(key))
    ) throw new Error(`Legacy role record ${record.id} is malformed; migration stopped.`);
    if (data.active) {
      const account = await auth.getUser(record.id);
      if (account.disabled || !account.emailVerified || !account.email) {
        throw new Error(`Active legacy account ${record.id} must be enabled and email-verified before migration.`);
      }
      if (data.role === 'ADMIN' && !account.multiFactor?.enrolledFactors?.length) {
        throw new Error(`Legacy administrator ${record.id} must enroll Firebase MFA before migration.`);
      }
      verifiedAccounts.set(record.id, account);
    }
  }

  const controlRef = db.collection('_admin_control').doc('active_admins');
  const expectedLegacy = new Map(legacyRecords.map((record) => [record.id, { role: record.data().role, active: record.data().active }]));
  await db.runTransaction(async (transaction) => {
    await transaction.get(controlRef);
    const current = await transaction.get(users);
    const currentLegacy = current.docs.filter((record) => record.data().role === 'ADMIN' || record.data().role === 'EDITOR');
    if (current.size > 450 || currentLegacy.length > 240) throw new Error('The role collection is too large for safe migration.');
    if (currentLegacy.length !== expectedLegacy.size || currentLegacy.some((record) => {
      const expected = expectedLegacy.get(record.id);
      return !expected || expected.role !== record.data().role || expected.active !== record.data().active;
    })) throw new Error('Role records changed during migration; no changes were applied.');

    const timestamp = FieldValue.serverTimestamp();
    for (const record of currentLegacy) {
      const data = record.data();
      const account = verifiedAccounts.get(record.id);
      const role = data.role === 'ADMIN' ? 'admin' : 'editor';
      transaction.set(record.ref, {
        uid: record.id,
        email: (account?.email || data.email).toLowerCase(),
        displayName: account?.displayName?.trim().slice(0, 120) || data.displayName,
        role,
        active: data.active,
        createdAt: timestamp,
        createdBy: 'owner-approved-role-migration',
        updatedAt: timestamp,
        updatedBy: 'owner-approved-role-migration',
      });
      transaction.create(db.collection('audit_logs').doc(), {
        actorUid: 'owner-approved-role-migration',
        actorEmail: 'owner-approved-role-migration@system.invalid',
        actorRole: 'admin',
        action: 'MIGRATE_ROLE_RECORD',
        targetCollection: 'users',
        targetId: record.id,
        outcome: 'success',
        summary: `Migrated legacy ${role} role record to the strict role schema.`,
        createdAt: timestamp,
      });
    }
    const adminCount = current.docs.filter((record) => {
      const role = record.data().role;
      return record.data().active === true && (role === 'admin' || role === 'ADMIN');
    }).length;
    transaction.set(controlRef, { activeAdminCount: adminCount, updatedAt: timestamp });
  });
  console.log(`Migrated ${legacyRecords.length} legacy role record(s).`);
}

async function main() {
  const targetUid = process.env.EMA_ADMIN_UID?.trim();
  const confirmation = process.env.EMA_ADMIN_PROVISIONING_CONFIRM;
  const recovery = confirmation === 'RECOVER_WITH_NO_USABLE_ADMIN';
  const migration = confirmation === 'MIGRATE_LEGACY_ROLES';
  const expectedProjectId = process.env.EMA_EXPECTED_FIREBASE_PROJECT_ID?.trim();
  if (!expectedProjectId || expectedProjectId !== projectId) {
    throw new Error('Set EMA_EXPECTED_FIREBASE_PROJECT_ID to exactly match firebase-applet-config.json after verifying the intended project.');
  }
  if (!migration && (!targetUid || !/^[A-Za-z0-9_-]{1,128}$/.test(targetUid))) {
    throw new Error('Set EMA_ADMIN_UID to the Firebase Auth UID of the verified account.');
  }
  if (!migration && !recovery && confirmation !== 'PROVISION_INITIAL_ADMIN') {
    throw new Error('Set EMA_ADMIN_PROVISIONING_CONFIRM to the documented bootstrap or recovery confirmation.');
  }

  const app =
    getApps()[0] ||
    initializeApp(
      emulatorMode ? { projectId } : { credential: applicationDefault(), projectId },
    );
  const auth = getAuth(app);
  const db = getFirestore(app, firestoreDatabaseId);
  if (migration) {
    await migrateLegacyRoles(auth, db);
    return;
  }
  const uid = targetUid as string;
  const target = await auth.getUser(uid);
  if (target.disabled || !target.emailVerified || !target.email) {
    throw new Error('Target account must exist, be enabled, and have a verified email.');
  }
  if (!target.multiFactor?.enrolledFactors?.length) {
    throw new Error('Initial administrators must enroll a Firebase multi-factor authentication method first.');
  }
  const targetEmail = target.email;

  const users = db.collection('users');
  const existingUsers = await users.get();
  const activeAdminDocs = existingUsers.docs.filter((record) => {
    const data = record.data();
    return data.active === true && (data.role === 'admin' || data.role === 'ADMIN');
  });
  const unavailableAdmins = new Set<string>();
  for (const record of activeAdminDocs) {
    try {
      const account = await auth.getUser(record.id);
      if (!hasUsableAdminAccess(record.id, record.data(), account)) unavailableAdmins.add(record.id);
    } catch (error) {
      const code = error && typeof error === 'object' && 'code' in error ? String((error as { code: unknown }).code) : '';
      if (code === 'auth/user-not-found') unavailableAdmins.add(record.id);
      else throw new Error('Unable to verify the current administrator accounts; recovery was stopped.');
    }
  }
  if (activeAdminDocs.length > 0 && (!recovery || unavailableAdmins.size !== activeAdminDocs.length)) {
    throw new Error('An enabled, verified administrator already exists. Use an administrator account to provision roles.');
  }

  const controlRef = db.collection('_admin_control').doc('active_admins');
  const targetRef = users.doc(uid);
  const auditRef = db.collection('audit_logs').doc();
  await db.runTransaction(async (transaction) => {
    await transaction.get(controlRef);
    const currentUsers = await transaction.get(users);
    if (currentUsers.size > 450) throw new Error('The role collection is too large for safe bootstrap; stop and use a reviewed migration.');
    const currentActiveAdmins = currentUsers.docs.filter((record) => {
      const data = record.data();
      return data.active === true && (data.role === 'admin' || data.role === 'ADMIN');
    });
    if (currentActiveAdmins.some((record) => !unavailableAdmins.has(record.id))) {
      throw new Error('An administrator became active during bootstrap; no role changes were made.');
    }
    if (currentActiveAdmins.length > 0 && !recovery) {
      throw new Error('An active administrator role already exists; initial bootstrap was refused.');
    }

    const targetSnapshot = currentUsers.docs.find((record) => record.id === uid);
    const currentTarget = targetSnapshot?.data();
    if (targetSnapshot && !isRoleRecord(uid, currentTarget)) {
      throw new Error('The target has a malformed role record; recover it through a reviewed process.');
    }

    const timestamp = FieldValue.serverTimestamp();
    for (const record of currentActiveAdmins) {
      transaction.update(record.ref, {
        active: false,
        updatedAt: timestamp,
        updatedBy: 'owner-approved-recovery',
      });
    }
    const roleRecord = {
      uid,
      email: targetEmail.toLowerCase(),
      displayName: target.displayName?.trim().slice(0, 120) || targetEmail,
      role: 'admin',
      active: true,
      createdAt: targetSnapshot ? currentTarget!.createdAt : timestamp,
      createdBy: targetSnapshot ? currentTarget!.createdBy : 'owner-approved-bootstrap',
      updatedAt: timestamp,
      updatedBy: recovery ? 'owner-approved-recovery' : 'owner-approved-bootstrap',
    };
    if (targetSnapshot) transaction.set(targetRef, roleRecord);
    else transaction.create(targetRef, roleRecord);
    transaction.set(controlRef, { activeAdminCount: 1, updatedAt: timestamp });
    transaction.create(auditRef, {
      actorUid: 'owner-approved-bootstrap',
      actorEmail: 'owner-approved-bootstrap@system.invalid',
      actorRole: 'admin',
      action: recovery ? 'EMERGENCY_ADMIN_RECOVERY' : 'INITIAL_ADMIN_BOOTSTRAP',
      targetCollection: 'users',
      targetId: uid,
      outcome: 'success',
      summary: recovery ? `Recovered admin access; deactivated ${currentActiveAdmins.length} unavailable admin role(s).` : 'Provisioned initial administrator using owner-approved ADC process.',
      createdAt: timestamp,
    });
  });

  console.log(`Administrator role provisioned for UID ${uid} in Firebase project ${projectId}.`);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : 'Administrator provisioning failed.');
  process.exitCode = 1;
});
