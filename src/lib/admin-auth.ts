export type StaffRole = 'editor' | 'admin';
export type AppRole = 'public' | StaffRole;

export interface RoleRecord {
  uid: string;
  email: string;
  displayName: string;
  role: StaffRole;
  active: boolean;
  createdAt: unknown;
  createdBy: string;
  updatedAt: unknown;
  updatedBy: string;
}

export interface VerifiedPrincipal {
  uid: string;
  email: string;
  displayName: string;
  role: AppRole;
}

export class AuthorizationError extends Error {
  readonly status: 401 | 403 | 503;

  constructor(message: string, status: 401 | 403 | 503) {
    super(message);
    this.name = 'AuthorizationError';
    this.status = status;
  }
}

function hasTimestamp(value: unknown): boolean {
  return Boolean(value && typeof value === 'object' && 'toDate' in value && typeof (value as { toDate?: unknown }).toDate === 'function');
}

export function isRoleRecord(uid: string, value: unknown): value is RoleRecord {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return false;
  const record = value as Record<string, unknown>;
  const allowed = ['uid', 'email', 'displayName', 'role', 'active', 'createdAt', 'createdBy', 'updatedAt', 'updatedBy'];
  if (Object.keys(record).length !== allowed.length || Object.keys(record).some((key) => !allowed.includes(key))) return false;
  return record.uid === uid &&
    typeof record.email === 'string' && record.email.length <= 160 && /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(record.email) &&
    typeof record.displayName === 'string' && record.displayName.trim().length > 0 && record.displayName.length <= 120 &&
    (record.role === 'admin' || record.role === 'editor') &&
    typeof record.active === 'boolean' && hasTimestamp(record.createdAt) && hasTimestamp(record.updatedAt) &&
    typeof record.createdBy === 'string' && record.createdBy.length > 0 && record.createdBy.length <= 128 &&
    typeof record.updatedBy === 'string' && record.updatedBy.length > 0 && record.updatedBy.length <= 128;
}

export function hasUsableAdminAccess(
  uid: string,
  roleValue: unknown,
  account: { disabled: boolean; emailVerified: boolean; email?: string; multiFactor?: { enrolledFactors?: unknown[] } },
): boolean {
  return isRoleRecord(uid, roleValue) &&
    roleValue.role === 'admin' && roleValue.active &&
    !account.disabled && account.emailVerified && Boolean(account.email) &&
    Boolean(account.multiFactor?.enrolledFactors?.length);
}

function firebaseAuthStatus(error: unknown): 401 | 503 {
  const code = error && typeof error === 'object' && 'code' in error ? String((error as { code: unknown }).code) : '';
  return [
    'auth/id-token-expired',
    'auth/id-token-revoked',
    'auth/invalid-id-token',
    'auth/argument-error',
    'auth/user-disabled',
    'auth/user-not-found',
  ].includes(code) ? 401 : 503;
}

export async function resolveVerifiedPrincipal(
  auth: {
    verifyIdToken(token: string, checkRevoked: boolean): Promise<{ uid: string; email_verified?: boolean; firebase?: { sign_in_second_factor?: string } }>;
    getUser(uid: string): Promise<{ disabled: boolean; emailVerified: boolean; email?: string; displayName?: string; multiFactor?: { enrolledFactors?: unknown[] } }>;
  },
  getRoleRecord: (uid: string) => Promise<unknown | null>,
  token: string | null,
): Promise<VerifiedPrincipal> {
  if (!token) throw new AuthorizationError('Missing bearer token.', 401);
  let decoded: { uid: string; email_verified?: boolean; firebase?: { sign_in_second_factor?: string } };
  let account: { disabled: boolean; emailVerified: boolean; email?: string; displayName?: string; multiFactor?: { enrolledFactors?: unknown[] } };
  try {
    decoded = await auth.verifyIdToken(token, true);
    account = await auth.getUser(decoded.uid);
  } catch (error) {
    throw new AuthorizationError('Token or account could not be verified.', firebaseAuthStatus(error));
  }
  if (account.disabled) throw new AuthorizationError('Account is disabled.', 401);
  const email = account.email || '';
  if (!decoded.email_verified || !account.emailVerified || !email) {
    return { uid: decoded.uid, email, displayName: account.displayName || '', role: 'public' };
  }

  let value: unknown | null;
  try {
    value = await getRoleRecord(decoded.uid);
  } catch {
    throw new AuthorizationError('Role lookup failed.', 503);
  }
  if (value === null) return { uid: decoded.uid, email, displayName: account.displayName || '', role: 'public' };
  if (!isRoleRecord(decoded.uid, value)) {
    throw new AuthorizationError('Role record is invalid.', 403);
  }
  if (!value.active) return { uid: decoded.uid, email, displayName: account.displayName || '', role: 'public' };
  if (value.role === 'admin' && (!decoded.firebase?.sign_in_second_factor || !account.multiFactor?.enrolledFactors?.length)) {
    throw new AuthorizationError('Administrator MFA is required.', 403);
  }
  return { uid: decoded.uid, email, displayName: account.displayName || value.displayName, role: value.role };
}

export function roleAllows(role: AppRole, required: readonly AppRole[]): boolean {
  return required.includes(role);
}

export function mayProvisionRole(actor: VerifiedPrincipal, targetUid: string): boolean {
  return actor.role === 'admin' && actor.uid !== targetUid;
}

export function mayRemoveActiveAdmin(
  activeAdminCount: number,
  currentRole: StaffRole,
  currentActive: boolean,
  nextRole: StaffRole,
  nextActive: boolean,
): boolean {
  const removingLast = currentRole === 'admin' && currentActive && (nextRole !== 'admin' || !nextActive);
  return !(removingLast && activeAdminCount <= 1);
}
