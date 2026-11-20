# Firebase emulator integration tests

The emulator suites must never contact the configured production Firebase project. They run only against the local Firebase Auth and Firestore emulators using the demo project `demo-exponential-local` and the `(default)` Firestore database.

## Single-command workflow

Prerequisites:

- Dependencies are already installed in this checkout.
- Firebase CLI is available as `firebase` on `PATH`, or `FIREBASE_CLI` points to the `firebase` executable or to `firebase-tools/lib/bin/firebase.js`. As a last resort the script also uses an already-installed copy in the npm `_npx` cache.
- Ports `3000`, `8080`, `9099`, `4400`, `4500`, and `9150` are free. Stop any existing emulator or development server first.

Run:

```bash
npm run test:emulator
```

The command:

1. Validates `firebase.json` and the inherited environment before starting anything.
2. Refuses to run if the project is not exactly `demo-exponential-local`, the database is not exactly `(default)`, or the emulator hosts are not exactly `127.0.0.1:9099` (Auth) and `127.0.0.1:8080` (Firestore).
3. Removes production credential variables from all child processes and starts only the Auth and Firestore emulators with `--project demo-exponential-local`.
4. Resets the emulator Auth accounts and `(default)` Firestore database.
5. Starts the application server with explicit server and Vite/browser emulator variables. In this project the Vite development server is embedded in `server.ts`, so the same process serves the API and browser assets.
6. Runs each suite in this order with a fresh application server so the in-memory rate limiter starts clean:
   - `tests/admin-auth.test.mjs`
   - `tests/emulator/server-auth.test.mjs`
   - `tests/emulator/inquiry.test.mjs`
   - `tests/emulator/rate-limit.test.mjs`
   - `tests/emulator/provisioning.test.mjs`
   - `tests/emulator/firestore-rules.test.mjs`
7. Shuts down the application server, emulators, and any running test process on success, failure, `SIGINT`, or `SIGTERM`.
8. Prints per-suite and total test counts plus the temporary log directory.

The test helper also refuses any run where `FIREBASE_PROJECT_ID`, `FIREBASE_FIRESTORE_DATABASE_ID`, `FIREBASE_AUTH_EMULATOR_HOST`, `FIRESTORE_EMULATOR_HOST`, or `GCLOUD_PROJECT` differs from the expected demo values.

## Isolated values

| Setting | Required value |
| --- | --- |
| Firebase project | `demo-exponential-local` |
| Firestore database | `(default)` |
| Auth emulator | `http://127.0.0.1:9099` |
| Firestore emulator | `http://127.0.0.1:8080` |
| Application API | `http://127.0.0.1:3000` |

The server process receives `FIREBASE_PROJECT_ID`, `FIREBASE_FIRESTORE_DATABASE_ID`, `FIREBASE_AUTH_EMULATOR_HOST`, `FIRESTORE_EMULATOR_HOST`, `GCLOUD_PROJECT`, and `FIREBASE_EMULATOR_MODE=true`. The Vite/browser configuration receives `VITE_FIREBASE_USE_EMULATORS=true`, `VITE_FIREBASE_PROJECT_ID`, `VITE_FIREBASE_DATABASE_ID`, `VITE_FIREBASE_AUTH_EMULATOR_URL`, `VITE_FIREBASE_FIRESTORE_EMULATOR_HOST`, and `VITE_FIREBASE_FIRESTORE_EMULATOR_PORT`.

No ADC, service-account key, Firebase token, or production project configuration is used for these tests.

## Manual startup sequence

Use this only when automatic orchestration cannot run, for example when Firebase CLI is unavailable. Before starting, unset `GOOGLE_APPLICATION_CREDENTIALS`, `FIREBASE_CONFIG`, `FIREBASE_TOKEN`, and any inherited `FIREBASE_*` or `GCLOUD_PROJECT` values that do not match the demo values below; the automated workflow does this for you.

1. In terminal 1, start only the emulators:

   ```bash
   NO_UPDATE_NOTIFIER=1 firebase emulators:start \
     --only auth,firestore \
     --project demo-exponential-local \
     --config firebase.json
   ```

   Keep the emulator log path available. The MFA tests read six-digit codes from it.

2. In terminal 2, start the application server with explicit emulator variables:

   ```bash
   FIREBASE_EMULATOR_MODE=true \
   FIREBASE_PROJECT_ID=demo-exponential-local \
   FIREBASE_FIRESTORE_DATABASE_ID='(default)' \
   FIREBASE_AUTH_EMULATOR_HOST=127.0.0.1:9099 \
   FIRESTORE_EMULATOR_HOST=127.0.0.1:8080 \
   GCLOUD_PROJECT=demo-exponential-local \
   VITE_FIREBASE_USE_EMULATORS=true \
   VITE_FIREBASE_PROJECT_ID=demo-exponential-local \
   VITE_FIREBASE_DATABASE_ID='(default)' \
   VITE_FIREBASE_AUTH_EMULATOR_URL=http://127.0.0.1:9099 \
   VITE_FIREBASE_FIRESTORE_EMULATOR_HOST=127.0.0.1 \
   VITE_FIREBASE_FIRESTORE_EMULATOR_PORT=8080 \
   npm run dev
   ```

3. In terminal 3, run the suites with the same emulator values:

   ```bash
   FIREBASE_PROJECT_ID=demo-exponential-local \
   FIREBASE_FIRESTORE_DATABASE_ID='(default)' \
   FIREBASE_AUTH_EMULATOR_HOST=127.0.0.1:9099 \
   FIRESTORE_EMULATOR_HOST=127.0.0.1:8080 \
   GCLOUD_PROJECT=demo-exponential-local \
   EMA_API_BASE=http://127.0.0.1:3000 \
   EMA_EMULATOR_LOG=/path/to/emulator.log \
   node --experimental-strip-types --test --test-concurrency=1 \
     tests/admin-auth.test.mjs \
     tests/emulator/server-auth.test.mjs \
     tests/emulator/inquiry.test.mjs \
     tests/emulator/provisioning.test.mjs \
     tests/emulator/firestore-rules.test.mjs
   ```

   The rate-limit suite requires a freshly started application server. Run it in a separate step after restarting the server in terminal 2:

   ```bash
   FIREBASE_PROJECT_ID=demo-exponential-local \
   FIREBASE_FIRESTORE_DATABASE_ID='(default)' \
   FIREBASE_AUTH_EMULATOR_HOST=127.0.0.1:9099 \
   FIRESTORE_EMULATOR_HOST=127.0.0.1:8080 \
   GCLOUD_PROJECT=demo-exponential-local \
   EMA_API_BASE=http://127.0.0.1:3000 \
   EMA_EMULATOR_LOG=/path/to/emulator.log \
   node --experimental-strip-types --test tests/emulator/rate-limit.test.mjs
   ```

4. Stop the application server and emulators with `Ctrl+C`.

## Known limitation

The Auth emulator does not enforce `revokeRefreshTokens` for already-issued ID tokens. The revoked-token test remains explicitly skipped with that reason; revocation is covered by unit tests and requires a real Firebase project to prove end to end.

The provisioning suite runs `scripts/provision-admin.ts` only against the emulators. It never provisions a real administrator and never accesses production Firebase resources.
