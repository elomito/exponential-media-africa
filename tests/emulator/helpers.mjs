// Shared helpers for the local Firebase Emulator test suites.
// These helpers ONLY talk to emulator endpoints and the local demo project.
import fs from 'node:fs';
import { initializeApp } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { FieldValue, getFirestore } from 'firebase-admin/firestore';
import {
  API_BASE as DEFAULT_API_BASE,
  AUTH_EMULATOR_HOST,
  AUTH_EMULATOR_URL,
  DATABASE_ID,
  FIRESTORE_EMULATOR_HOST,
  FIRESTORE_EMULATOR_URL,
  PROJECT_ID as EXPECTED_PROJECT_ID,
} from './expected-config.mjs';

function assertConfigured(name, actual, expected) {
  if (actual !== undefined && actual !== expected) {
    throw new Error(`Refusing emulator test run: ${name} must be exactly "${expected}" but was "${actual}".`);
  }
}

assertConfigured('FIREBASE_PROJECT_ID', process.env.FIREBASE_PROJECT_ID, EXPECTED_PROJECT_ID);
assertConfigured('FIREBASE_FIRESTORE_DATABASE_ID', process.env.FIREBASE_FIRESTORE_DATABASE_ID, DATABASE_ID);
assertConfigured('FIREBASE_AUTH_EMULATOR_HOST', process.env.FIREBASE_AUTH_EMULATOR_HOST, AUTH_EMULATOR_HOST);
assertConfigured('FIRESTORE_EMULATOR_HOST', process.env.FIRESTORE_EMULATOR_HOST, FIRESTORE_EMULATOR_HOST);
assertConfigured('GCLOUD_PROJECT', process.env.GCLOUD_PROJECT, EXPECTED_PROJECT_ID);

export const PROJECT_ID = EXPECTED_PROJECT_ID;
export const FIRESTORE_DATABASE_ID = DATABASE_ID;
export const AUTH_EMULATOR = AUTH_EMULATOR_URL;
export const FIRESTORE_EMULATOR = FIRESTORE_EMULATOR_URL;
export const API_BASE = process.env.EMA_API_BASE || DEFAULT_API_BASE;
export const EMULATOR_LOG = process.env.EMA_EMULATOR_LOG || '';
const API_KEY = 'demo-api-key';

process.env.FIREBASE_AUTH_EMULATOR_HOST = AUTH_EMULATOR_HOST;
process.env.FIRESTORE_EMULATOR_HOST = FIRESTORE_EMULATOR_HOST;
process.env.GCLOUD_PROJECT = PROJECT_ID;

const app = initializeApp({ projectId: PROJECT_ID });
export const adminAuth = getAuth(app);
export const adminDb = getFirestore(app, FIRESTORE_DATABASE_ID);
export const adminFieldValue = FieldValue;

export async function resetEmulators() {
  await fetch(`${AUTH_EMULATOR}/emulator/v1/projects/${PROJECT_ID}/accounts`, { method: 'DELETE' });
  await fetch(`${FIRESTORE_EMULATOR}/emulator/v1/projects/${PROJECT_ID}/databases/${FIRESTORE_DATABASE_ID}/documents`, {
    method: 'DELETE',
  });
}

function logOffset() {
  if (!EMULATOR_LOG || !fs.existsSync(EMULATOR_LOG)) return 0;
  return fs.statSync(EMULATOR_LOG).size;
}

function codeSince(offset, kind, phone) {
  if (!EMULATOR_LOG || !fs.existsSync(EMULATOR_LOG)) {
    throw new Error('Set EMA_EMULATOR_LOG to the emulator stdout log so MFA codes can be read.');
  }
  const chunk = fs.readFileSync(EMULATOR_LOG).subarray(offset).toString('utf8');
  const label = kind === 'signin' ? 'To sign in with MFA using' : 'To enroll MFA with';
  const matches = [...chunk.matchAll(new RegExp(`${label} ${phone.replace('+', '\\+')}, use the code (\\d{6})`, 'g'))];
  if (!matches.length) throw new Error(`No ${kind} code found for ${phone} in the emulator log.`);
  return matches[matches.length - 1][1];
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function waitForCode(offset, kind, phone, timeoutMs = 5000) {
  const deadline = Date.now() + timeoutMs;
  let lastError = null;
  while (Date.now() < deadline) {
    try {
      return codeSince(offset, kind, phone);
    } catch (error) {
      lastError = error;
      await sleep(150);
    }
  }
  throw lastError;
}

export async function createUser(uid, { emailVerified = true, disabled = false, password = 'Passw0rd!23' } = {}) {
  const email = `${uid}@example.com`;
  await adminAuth.createUser({ uid, email, password, emailVerified, disabled });
  return { uid, email, password };
}

export function roleRecord(uid, overrides = {}) {
  return {
    uid,
    email: `${uid}@example.com`,
    displayName: `Test ${uid}`,
    role: 'editor',
    active: true,
    createdAt: adminFieldValue.serverTimestamp(),
    createdBy: 'emulator-test-suite',
    updatedAt: adminFieldValue.serverTimestamp(),
    updatedBy: 'emulator-test-suite',
    ...overrides,
  };
}

export async function seedRole(uid, data) {
  await adminDb.collection('users').doc(uid).set(data);
}

export async function readDoc(collection, id) {
  const snap = await adminDb.collection(collection).doc(id).get();
  return snap.exists ? snap.data() : null;
}

export async function listCollection(collection) {
  const snap = await adminDb.collection(collection).get();
  return snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

export async function signInWithPassword(email, password) {
  const response = await fetch(`${AUTH_EMULATOR}/identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password, returnSecureToken: true }),
  });
  const body = await response.json();
  if (!response.ok) throw new Error(`signInWithPassword failed: ${JSON.stringify(body).slice(0, 200)}`);
  return body;
}

export async function idTokenFor(email, password) {
  const body = await signInWithPassword(email, password);
  return body.idToken;
}

export async function enrollPhoneMfa(phone = '+15555550100') {
  const offset = logOffset();
  return { phone, offset };
}

export async function completeMfaSignIn(email, password, phone = '+15555550100') {
  const offset = logOffset();
  const first = await signInWithPassword(email, password);
  if (!first.mfaPendingCredential) return { idToken: first.idToken, mfa: false };
  const hint = first.mfaInfo?.[0];
  const startResponse = await fetch(`${AUTH_EMULATOR}/identitytoolkit.googleapis.com/v2/accounts/mfaSignIn:start?key=${API_KEY}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      mfaPendingCredential: first.mfaPendingCredential,
      mfaEnrollmentId: hint.mfaEnrollmentId,
      phoneSignInInfo: { phoneNumber: phone },
    }),
  });
  const startBody = await startResponse.json();
  if (!startResponse.ok) throw new Error(`mfaSignIn:start failed: ${JSON.stringify(startBody).slice(0, 200)}`);
  const code = await waitForCode(offset, 'signin', phone);
  const finalizeResponse = await fetch(`${AUTH_EMULATOR}/identitytoolkit.googleapis.com/v2/accounts/mfaSignIn:finalize?key=${API_KEY}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      mfaPendingCredential: first.mfaPendingCredential,
      phoneVerificationInfo: { sessionInfo: startBody.phoneResponseInfo.sessionInfo, code },
    }),
  });
  const finalizeBody = await finalizeResponse.json();
  if (!finalizeResponse.ok) throw new Error(`mfaSignIn:finalize failed: ${JSON.stringify(finalizeBody).slice(0, 200)}`);
  return { idToken: finalizeBody.idToken, mfa: true };
}

export async function enrollPhoneFactor(email, password, phone = '+15555550100') {
  const offset = logOffset();
  const first = await signInWithPassword(email, password);
  if (first.mfaPendingCredential) throw new Error('Account already requires a second factor.');
  const startResponse = await fetch(`${AUTH_EMULATOR}/identitytoolkit.googleapis.com/v2/accounts/mfaEnrollment:start?key=${API_KEY}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ idToken: first.idToken, phoneEnrollmentInfo: { phoneNumber: phone } }),
  });
  const startBody = await startResponse.json();
  if (!startResponse.ok) throw new Error(`mfaEnrollment:start failed: ${JSON.stringify(startBody).slice(0, 200)}`);
  const code = await waitForCode(offset, 'enroll', phone);
  const finalizeResponse = await fetch(`${AUTH_EMULATOR}/identitytoolkit.googleapis.com/v2/accounts/mfaEnrollment:finalize?key=${API_KEY}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      idToken: first.idToken,
      phoneVerificationInfo: { sessionInfo: startBody.phoneSessionInfo.sessionInfo, code },
    }),
  });
  const finalizeBody = await finalizeResponse.json();
  if (!finalizeResponse.ok) throw new Error(`mfaEnrollment:finalize failed: ${JSON.stringify(finalizeBody).slice(0, 200)}`);
  return finalizeBody;
}

export async function api(path, { method = 'GET', token, body, headers = {} } = {}) {
  const response = await fetch(`${API_BASE}${path}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
    body: body === undefined ? undefined : typeof body === 'string' ? body : JSON.stringify(body),
  });
  const text = await response.text();
  let json = null;
  try {
    json = text ? JSON.parse(text) : null;
  } catch {
    json = null;
  }
  return { status: response.status, body: json, text, headers: response.headers };
}

// Firestore REST helpers used to exercise Security Rules with tokens the client SDK cannot hold.
function toFields(value) {
  const fields = {};
  for (const [key, item] of Object.entries(value)) {
    fields[key] = toValue(item);
  }
  return fields;
}

function toValue(value) {
  if (value === null) return { nullValue: null };
  if (typeof value === 'string') return { stringValue: value };
  if (typeof value === 'boolean') return { booleanValue: value };
  if (typeof value === 'number') return Number.isInteger(value) ? { integerValue: String(value) } : { doubleValue: value };
  if (Array.isArray(value)) return { arrayValue: { values: value.map(toValue) } };
  if (value && typeof value === 'object' && value.__timestamp) return { timestampValue: value.__timestamp };
  return { mapValue: { fields: toFields(value) } };
}

export async function rulesDoc(path, { method = 'GET', token, data, mask = [] } = {}) {
  const query = method === 'PATCH' && mask.length
    ? '?' + mask.map((field) => `updateMask.fieldPaths=${encodeURIComponent(field)}`).join('&')
    : '';
  const url = `${FIRESTORE_EMULATOR}/v1/projects/${PROJECT_ID}/databases/${FIRESTORE_DATABASE_ID}/documents/${path}${query}`;
  const response = await fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: data === undefined ? undefined : JSON.stringify({ fields: toFields(data) }),
  });
  const body = await response.json().catch(() => null);
  return { status: response.status, body };
}

export async function rulesQuery(collectionId, filters = [], token) {
  const where = filters.length
    ? {
        compositeFilter: {
          op: 'AND',
          filters: filters.map(({ field, op = 'EQUAL', value }) => ({
            fieldFilter: { field: { fieldPath: field }, op, value: toValue(value) },
          })),
        },
      }
    : undefined;
  const response = await fetch(`${FIRESTORE_EMULATOR}/v1/projects/${PROJECT_ID}/databases/${FIRESTORE_DATABASE_ID}/documents:runQuery`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify({ structuredQuery: { from: [{ collectionId }], ...(where ? { where } : {}) } }),
  });
  const body = await response.json().catch(() => null);
  return { status: response.status, body };
}

export function timestampValue(iso = new Date().toISOString()) {
  return { __timestamp: iso };
}
