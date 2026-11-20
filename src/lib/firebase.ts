import { initializeApp } from 'firebase/app';
import { connectAuthEmulator, getAuth, GoogleAuthProvider } from 'firebase/auth';
import {
  connectFirestoreEmulator,
  doc,
  getDocFromServer,
  getFirestore,
  initializeFirestore,
  type Firestore,
} from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';

// Local emulator runs point at demo services; production uses the configured project.
const useEmulators = import.meta.env.VITE_FIREBASE_USE_EMULATORS === 'true';
const projectId = import.meta.env.VITE_FIREBASE_PROJECT_ID || firebaseConfig.projectId;
const firestoreDatabaseId = import.meta.env.VITE_FIREBASE_DATABASE_ID || firebaseConfig.firestoreDatabaseId;

const app = initializeApp({ ...firebaseConfig, projectId });

function createFirestoreInstance(): Firestore {
  try {
    return initializeFirestore(
      app,
      typeof window !== 'undefined'
        ? { experimentalAutoDetectLongPolling: true }
        : {},
      firestoreDatabaseId
    );
  } catch {
    return getFirestore(app, firestoreDatabaseId);
  }
}

export const db = createFirestoreInstance();
export const auth = getAuth(app);
export const googleAuthProvider = new GoogleAuthProvider();

if (useEmulators && typeof window !== 'undefined') {
  connectAuthEmulator(
    auth,
    import.meta.env.VITE_FIREBASE_AUTH_EMULATOR_URL || 'http://127.0.0.1:9099',
    { disableWarnings: true }
  );
  connectFirestoreEmulator(
    db,
    import.meta.env.VITE_FIREBASE_FIRESTORE_EMULATOR_HOST || '127.0.0.1',
    Number(import.meta.env.VITE_FIREBASE_FIRESTORE_EMULATOR_PORT) || 8080
  );
}

export async function verifyFirestoreConnection(): Promise<boolean> {
  if (typeof navigator !== 'undefined' && navigator.onLine === false) {
    return false;
  }
  try {
    let timerId: ReturnType<typeof setTimeout> | undefined;
    const timeout = new Promise<never>((_, reject) => {
      timerId = setTimeout(() => reject(new Error('FIRESTORE_CONNECT_TIMEOUT')), 5000);
    });
    try {
      await Promise.race([getDocFromServer(doc(db, 'site_settings', 'main')), timeout]);
      return true;
    } finally {
      if (timerId) clearTimeout(timerId);
    }
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.warn('Firestore connection check: client appears offline; using verified defaults.');
    }
    return false;
  }
}
