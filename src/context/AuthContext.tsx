import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import {
  getMultiFactorResolver,
  onIdTokenChanged,
  PhoneAuthProvider,
  PhoneMultiFactorGenerator,
  RecaptchaVerifier,
  signInWithPopup,
  signOut as firebaseSignOut,
  TotpMultiFactorGenerator,
  type MultiFactorError,
  type MultiFactorInfo,
  type User,
} from 'firebase/auth';
import { auth, googleAuthProvider } from '../lib/firebase';
import type { UserRole } from '../types/cms';

interface AuthContextValue {
  user: User | null;
  role: UserRole | null;
  authReady: boolean;
  isAuthorizedStaff: boolean;
  authError: string | null;
  mfaFactors: Array<{ uid: string; kind: 'phone' | 'totp'; label: string }>;
  mfaSelectedFactorUid: string | null;
  mfaVerificationSent: boolean;
  signInWithGoogle: () => Promise<void>;
  startMfaChallenge: (factorUid: string) => Promise<void>;
  completeMfaSignIn: (code: string) => Promise<void>;
  cancelMfaChallenge: () => void;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<UserRole | null>(null);
  const [authReady, setAuthReady] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [mfaFactors, setMfaFactors] = useState<AuthContextValue['mfaFactors']>([]);
  const [mfaSelectedFactorUid, setMfaSelectedFactorUid] = useState<string | null>(null);
  const [mfaVerificationSent, setMfaVerificationSent] = useState(false);
  const resolutionGeneration = useRef(0);
  const mfaResolver = useRef<ReturnType<typeof getMultiFactorResolver> | null>(null);
  const mfaFactorHint = useRef<MultiFactorInfo | null>(null);
  const mfaVerificationId = useRef<string | null>(null);
  const recaptchaVerifier = useRef<RecaptchaVerifier | null>(null);

  useEffect(() => {
    const unsubscribe = onIdTokenChanged(auth, async (nextUser) => {
      const generation = ++resolutionGeneration.current;
      setUser(nextUser);
      setRole(null);
      setAuthReady(false);
      setAuthError(null);

      if (!nextUser) {
        if (generation === resolutionGeneration.current) setAuthReady(true);
        return;
      }

      try {
        const token = await nextUser.getIdToken();
        const response = await fetch('/api/auth/session', {
          headers: { Authorization: `Bearer ${token}` },
          cache: 'no-store',
        });
        if (!response.ok) throw new Error('Authorization could not be verified.');
        const result: unknown = await response.json();
        const resolvedRole = result && typeof result === 'object' ? (result as { role?: unknown }).role : null;
        if (resolvedRole !== 'public' && resolvedRole !== 'editor' && resolvedRole !== 'admin') {
          throw new Error('Authorization response was invalid.');
        }
        if (generation === resolutionGeneration.current) {
          setRole(resolvedRole);
          if (resolvedRole === 'public') setAuthError('This account does not have active staff permissions.');
        }
      } catch {
        if (generation === resolutionGeneration.current) {
          setRole(null);
          setAuthError('Unable to verify account permissions. Please try signing in again.');
        }
      } finally {
        if (generation === resolutionGeneration.current) setAuthReady(true);
      }
    });

    return () => {
      unsubscribe();
      recaptchaVerifier.current?.clear();
      recaptchaVerifier.current = null;
    };
  }, []);

  const signInWithGoogle = async () => {
    setAuthError(null);
    try {
      await signInWithPopup(auth, googleAuthProvider);
    } catch (err) {
      const code = err && typeof err === 'object' && 'code' in err ? String((err as { code: unknown }).code) : '';
      if (code === 'auth/multi-factor-auth-required') {
        try {
          const resolver = getMultiFactorResolver(auth, err as MultiFactorError);
          const factors = resolver.hints.flatMap((hint): AuthContextValue['mfaFactors'] => {
            if (hint.factorId === PhoneMultiFactorGenerator.FACTOR_ID) {
              const phoneHint = hint as typeof hint & { phoneNumber?: string };
              const phone = phoneHint.phoneNumber || '';
              const safePhone = phone.length > 4 ? `${'•'.repeat(Math.min(6, phone.length - 4))}${phone.slice(-4)}` : 'Enrolled phone';
              return [{ uid: hint.uid, kind: 'phone' as const, label: hint.displayName || safePhone }];
            }
            if (hint.factorId === TotpMultiFactorGenerator.FACTOR_ID) {
              return [{ uid: hint.uid, kind: 'totp' as const, label: hint.displayName || 'Authenticator app' }];
            }
            return [];
          });
          if (factors.length === 0) {
            setAuthError('This account requires a supported Firebase MFA factor. Contact the site administrator.');
            return;
          }
          mfaResolver.current = resolver;
          setMfaFactors(factors);
          setMfaSelectedFactorUid(null);
          setMfaVerificationSent(false);
          setAuthError(null);
        } catch {
          setAuthError('The additional sign-in challenge could not be prepared. Please try again.');
        }
        return;
      }
      setAuthError('Sign-in could not be completed. Check the account and try again.');
    }
  };

  const startMfaChallenge = async (factorUid: string) => {
    const resolver = mfaResolver.current;
    const hint = resolver?.hints.find((candidate) => candidate.uid === factorUid) || null;
    if (!resolver || !hint) {
      setAuthError('The selected sign-in factor is no longer available. Start sign-in again.');
      return;
    }
    mfaFactorHint.current = hint;
    setMfaSelectedFactorUid(hint.uid);
    setAuthError(null);
    setMfaVerificationSent(false);
    if (hint.factorId === TotpMultiFactorGenerator.FACTOR_ID) return;
    if (hint.factorId !== PhoneMultiFactorGenerator.FACTOR_ID) {
      setAuthError('This sign-in factor is not supported.');
      return;
    }
    try {
      const verifier = recaptchaVerifier.current || new RecaptchaVerifier(auth, 'admin-mfa-recaptcha', { size: 'invisible' });
      recaptchaVerifier.current = verifier;
      mfaVerificationId.current = await new PhoneAuthProvider(auth).verifyPhoneNumber(
        { multiFactorHint: hint, session: resolver.session },
        verifier,
      );
      setMfaVerificationSent(true);
    } catch {
      recaptchaVerifier.current?.clear();
      recaptchaVerifier.current = null;
      setAuthError('A verification code could not be sent. Check the configured Firebase phone-auth settings and try again.');
    }
  };

  const completeMfaSignIn = async (rawCode: string) => {
    const resolver = mfaResolver.current;
    const hint = mfaFactorHint.current;
    const code = rawCode.trim();
    if (!resolver || !hint || !/^\d{6,8}$/.test(code)) {
      setAuthError('Enter the valid verification code from your selected factor.');
      return;
    }
    try {
      const assertion = hint.factorId === TotpMultiFactorGenerator.FACTOR_ID
        ? TotpMultiFactorGenerator.assertionForSignIn(hint.uid, code)
        : hint.factorId === PhoneMultiFactorGenerator.FACTOR_ID && mfaVerificationId.current
          ? PhoneMultiFactorGenerator.assertion(PhoneAuthProvider.credential(mfaVerificationId.current, code))
          : null;
      if (!assertion) throw new Error('MFA challenge is incomplete.');
      await resolver.resolveSignIn(assertion);
      mfaResolver.current = null;
      mfaFactorHint.current = null;
      mfaVerificationId.current = null;
      setMfaFactors([]);
      setMfaSelectedFactorUid(null);
      setMfaVerificationSent(false);
      setAuthError(null);
    } catch {
      setAuthError('The verification code was not accepted. Check the code and try again.');
    }
  };

  const cancelMfaChallenge = () => {
    mfaResolver.current = null;
    mfaFactorHint.current = null;
    mfaVerificationId.current = null;
    recaptchaVerifier.current?.clear();
    recaptchaVerifier.current = null;
    setMfaFactors([]);
    setMfaSelectedFactorUid(null);
    setMfaVerificationSent(false);
    setAuthError(null);
  };

  const signOut = async () => {
    await firebaseSignOut(auth);
    cancelMfaChallenge();
    setRole(null);
    setAuthError(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role,
        authReady,
        isAuthorizedStaff: Boolean(user && (role === 'admin' || role === 'editor')),
        authError,
        mfaFactors,
        mfaSelectedFactorUid,
        mfaVerificationSent,
        signInWithGoogle,
        startMfaChallenge,
        completeMfaSignIn,
        cancelMfaChallenge,
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
