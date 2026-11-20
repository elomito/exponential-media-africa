process.env.FIREBASE_AUTH_EMULATOR_HOST = '127.0.0.1:9099';
process.env.FIRESTORE_EMULATOR_HOST = '127.0.0.1:8080';
process.env.GCLOUD_PROJECT = 'demo-exponential-local';

const { initializeApp } = await import('firebase-admin/app');
const { getAuth } = await import('firebase-admin/auth');

const app = initializeApp({ projectId: 'demo-exponential-local' });
const auth = getAuth(app);

const ui = 'probe-' + Date.now();
const user = await auth.createUser({ uid: ui, email: `${ui}@example.com`, password: 'Passw0rd!23', emailVerified: true });
console.log('created', user.uid, user.emailVerified);

const customToken = await auth.createCustomToken(ui, { firebase: { sign_in_second_factor: 'totp' }, probe: true });
console.log('custom token issued');

const resp = await fetch('http://127.0.0.1:9099/identitytoolkit.googleapis.com/v1/accounts:signInWithCustomToken?key=fake-key', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ token: customToken, returnSecureToken: true }),
});
const body = await resp.json();
console.log('signin status', resp.status);
if (body.idToken) {
  const payload = JSON.parse(Buffer.from(body.idToken.split('.')[1], 'base64url').toString());
  console.log('claims:', JSON.stringify(payload.firebase), 'email_verified:', payload.email_verified);
} else {
  console.log('signin body', JSON.stringify(body).slice(0, 300));
}
process.exit(0);
