process.env.FIREBASE_AUTH_EMULATOR_HOST = '127.0.0.1:9099';
process.env.GCLOUD_PROJECT = 'demo-exponential-local';

import fs from 'node:fs';
const { initializeApp } = await import('firebase-admin/app');
const { getAuth } = await import('firebase-admin/auth');

const KEY = 'fake-api-key';
const HOST = 'http://127.0.0.1:9099';
const LOG = process.env.EMA_EMULATOR_LOG;
const PHONE = '+15555550100';
const app = initializeApp({ projectId: 'demo-exponential-local' });
const auth = getAuth(app);
const uid = 'probe-mfa-' + Date.now();
const email = `${uid}@example.com`;
await auth.createUser({ uid, email, password: 'Passw0rd!23', emailVerified: true });

const lastCode = (kind) => {
  const log = fs.readFileSync(LOG, 'utf8');
  const escaped = PHONE.replace('+', '\\+');
  const pattern = kind === 'signin'
    ? `To sign in with MFA using ${escaped}, use the code (\\d{6})`
    : `To enroll MFA with ${escaped}, use the code (\\d{6})`;
  const matches = [...log.matchAll(new RegExp(pattern, 'g'))];
  return matches.length ? matches[matches.length - 1][1] : null;
};

async function signInPassword() {
  const r = await fetch(`${HOST}/identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${KEY}`, {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password: 'Passw0rd!23', returnSecureToken: true }),
  });
  return { status: r.status, body: await r.json() };
}

const first = await signInPassword();
const start = await fetch(`${HOST}/identitytoolkit.googleapis.com/v2/accounts/mfaEnrollment:start?key=${KEY}`, {
  method: 'POST', headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ idToken: first.body.idToken, phoneEnrollmentInfo: { phoneNumber: PHONE } }),
});
const startBody = await start.json();
await new Promise((r) => setTimeout(r, 500));
const enrollCode = lastCode();
const finalize = await fetch(`${HOST}/identitytoolkit.googleapis.com/v2/accounts/mfaEnrollment:finalize?key=${KEY}`, {
  method: 'POST', headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    idToken: first.body.idToken,
    phoneVerificationInfo: { sessionInfo: startBody.phoneSessionInfo.sessionInfo, code: enrollCode },
  }),
});
const finalizeBody = await finalize.json();
console.log('enroll', finalize.status, 'code', enrollCode, finalize.status === 200 ? '' : JSON.stringify(finalizeBody).slice(0, 200));

const second = await signInPassword();
console.log('post-enroll signin', second.status, 'needsMfa=', Boolean(second.body.mfaPendingCredential), 'mfaInfo=', JSON.stringify(second.body.mfaInfo));

const mfaStart = await fetch(`${HOST}/identitytoolkit.googleapis.com/v2/accounts/mfaSignIn:start?key=${KEY}`, {
  method: 'POST', headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ mfaPendingCredential: second.body.mfaPendingCredential, mfaEnrollmentId: second.body.mfaInfo[0].mfaEnrollmentId, phoneSignInInfo: { phoneNumber: PHONE } }),
});
const mfaStartBody = await mfaStart.json();
console.log('mfaStart', mfaStart.status, JSON.stringify(mfaStartBody).slice(0,300));
await new Promise((r) => setTimeout(r, 500));
const signInCode = lastCode('signin');
const verify = await fetch(`${HOST}/identitytoolkit.googleapis.com/v2/accounts/mfaSignIn:finalize?key=${KEY}`, {
  method: 'POST', headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ mfaPendingCredential: second.body.mfaPendingCredential, phoneVerificationInfo: { sessionInfo: mfaStartBody.phoneResponseInfo?.sessionInfo, code: signInCode } }),
});
const verifyBody = await verify.json();
console.log('mfa finalize', verify.status, verify.status === 200 ? '' : JSON.stringify(verifyBody).slice(0, 200));
if (verifyBody.idToken) {
  const payload = JSON.parse(Buffer.from(verifyBody.idToken.split('.')[1], 'base64url').toString());
  console.log('MFA CLAIMS', JSON.stringify(payload.firebase));
}
const adminUser = await auth.getUser(uid);
console.log('enrolledFactors', JSON.stringify(adminUser.multiFactor?.enrolledFactors?.map((f) => f.factorId)));
process.exit(0);
