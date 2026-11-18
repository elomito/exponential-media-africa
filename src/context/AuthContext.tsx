import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  onAuthStateChanged,
  signInWithPopup,
  signOut as firebaseSignOut,
  type User,
} from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db, googleAuthProvider } from '../lib/firebase';
import type { UserRole } from '../types/cms';

const BOOTSTRAP_ADMIN_EMAIL = 'kevinnambubbi@gmail.com';

interface AuthContextValue {
  user: User | null;
  role: UserRole | null;
  authReady: boolean;
  isAuthorizedStaff: boolean;
  authError: string | null;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<UserRole | null>(null);
  const [authReady, setAuthReady] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (nextUser) => {
      setUser(nextUser);
      setAuthError(null);

      if (!nextUser) {
        setRole(null);
        setAuthReady(true);
        return;
      }

      if (!nextUser.emailVerified) {
        setRole(null);
        setAuthError('A verified email account is required for staff access.');
        setAuthReady(true);
        return;
      }

      try {
        if (nextUser.email?.toLowerCase() === BOOTSTRAP_ADMIN_EMAIL) {
          setRole('ADMIN');
          setAuthReady(true);
          return;
        }

        const userSnap = await getDoc(doc(db, 'users', nextUser.uid));
        if (userSnap.exists()) {
          const data = userSnap.data();
          if (data.active === true && (data.role === 'ADMIN' || data.role === 'EDITOR')) {
            setRole(data.role);
          } else {
            setRole(null);
            setAuthError('Your account does not have active administrative or editor permissions.');
          }
        } else {
          setRole(null);
          setAuthError('No administrative or editor role is assigned to this account.');
        }
      } catch (err) {
        console.error('Role resolution check failed:', err);
        setRole(null);
        setAuthError('Unable to verify account permissions.');
      } finally {
        setAuthReady(true);
      }
    });

    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    setAuthError(null);
    try {
      await signInWithPopup(auth, googleAuthProvider);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Sign-in could not be completed.';
      setAuthError(message);
    }
  };

  const signOut = async () => {
    await firebaseSignOut(auth);
    setRole(null);
    setAuthError(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role,
        authReady,
        isAuthorizedStaff: Boolean(user && role),
        authError,
        signInWithGoogle,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return ctx;
}
