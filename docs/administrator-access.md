# Administrator and editor access

## Authorization model

Firebase Authentication identifies the account. Server APIs verify the Firebase ID token with revocation checks, reload the Auth account to reject disabled users, and read the role record by authenticated UID for every privileged request. The browser's role state is for presentation only.

Role records are stored in `users/{uid}` with exactly these fields: `uid`, `email`, `displayName`, `role` (`admin` or `editor`), `active`, `createdAt`, `createdBy`, `updatedAt`, and `updatedBy`. The `public` role is the default when no staff record exists; it is not stored. Browser writes to `users` and `audit_logs` are denied. Firestore rules also require a valid role record; administrator reads and writes require a Firebase MFA sign-in claim.

Administrators must have a Firebase Authentication MFA factor enrolled and must sign in using it. Server requests check both the token's second-factor claim and current enrollment. Editors can edit content under the Firestore rules but cannot access administrator operations or inquiries.

## Initial administrator

Before running the provisioning command:

1. Create the intended Firebase Authentication account, verify its email, and enroll Firebase MFA.
2. Confirm `firebase-applet-config.json` names the intended Firebase project and Firestore database.
3. Run under a trusted operator identity using ADC with only the Firebase Auth user-read and Firestore role/audit write permissions required. Do not use or commit a service-account key file.
4. Supply the exact project ID, Firebase Auth UID, and explicit confirmation:

```bash
EMA_EXPECTED_FIREBASE_PROJECT_ID=<verified-project-id> \
EMA_ADMIN_UID=<verified-firebase-auth-uid> \
EMA_ADMIN_PROVISIONING_CONFIRM=PROVISION_INITIAL_ADMIN \
npm run admin:provision
```

The script checks the target Auth account and refuses bootstrap if an active administrator role already exists. It writes the role and initial audit record transactionally. It has not been run as part of this code change.

## Provisioning and revocation

An active administrator can provision an existing enabled, email-verified account by UID in the Admin page. Email and display name are retrieved by the server from Firebase Auth. Assigning the `admin` role requires the target to have enrolled Firebase MFA. Administrators cannot modify their own role or active state. The server prevents demoting or deactivating the last active administrator and serializes role changes through a private control document.

Deactivate the role in the Admin page to revoke staff access immediately in Firestore rules and server authorization. Disabling a Firebase Auth account is also checked on every server request. For full revocation, deactivate the role first, then disable/revoke the Auth account. Firebase Security Rules cannot call Firebase Auth to check disabled/revoked account state; a previously issued ID token may remain usable for direct Firestore operations until it expires unless the role is deactivated.

## Emergency recovery

If every active administrator account is disabled, deleted, or unverified, an owner with ADC access can provision a replacement with:

```bash
EMA_EXPECTED_FIREBASE_PROJECT_ID=<verified-project-id> \
EMA_ADMIN_UID=<new-verified-mfa-enrolled-firebase-auth-uid> \
EMA_ADMIN_PROVISIONING_CONFIRM=RECOVER_WITH_NO_USABLE_ADMIN \
npm run admin:provision
```

The script checks active admin role records against Firebase Auth and refuses recovery if any administrator remains usable: the role record must match the strict schema, the account must exist, be enabled and email-verified, and have an enrolled MFA factor. It deactivates only unusable administrator role records and creates an audit record. Recovery is a privileged owner action and must be reviewed before execution.

Existing uppercase `ADMIN`/`EDITOR` records must be migrated before the strict new schema will authorize them. After confirming the project ID and enrolling MFA for every active administrator, run:

```bash
EMA_EXPECTED_FIREBASE_PROJECT_ID=<verified-project-id> \
EMA_ADMIN_PROVISIONING_CONFIRM=MIGRATE_LEGACY_ROLES \
npm run admin:provision
```

The migration validates legacy fields and account state, updates all legacy role records in a transaction, refreshes the private active-admin count, and records the migration. It refuses malformed records, disabled/unverified active accounts, or active administrators without Firebase MFA.

## Operational limits

- Every server authorization request rechecks token revocation, disabled account state, and the current Firestore role. A role revocation racing with an operation is rechecked in the same Firestore transaction where supported. Firebase Auth state and Firestore cannot share a transaction, so an Auth disable occurring after the check is a small residual race.
- Direct Firestore editorial operations are authorized by current role records and Firebase token claims; rules cannot query Auth disabled state. Role deactivation is the immediate revocation mechanism.
- The server rate limiter uses `req.ip`, defaults to trusting no forwarded headers, and is per-process memory. Set `TRUST_PROXY_HOPS=1` only after confirming exactly one trusted reverse proxy; multiple instances still need a trusted shared edge limiter.
- The `active_admins` control document and role/audit collections have no browser permissions. Admin SDK operations bypass rules and therefore use fixed collections, schemas, and explicit role checks.
- CMS edits remain client-to-Firestore under rules. Server audit records currently cover role provisioning/revocation, role migration/recovery, and inquiry status updates. Other direct CMS edits are not currently represented in the audit trail.
