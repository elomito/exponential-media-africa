# Exponential Marketing Agency

Official web platform, interactive portfolio, bilingual English/Swahili experience, and staff content management system (CMS) for **Exponential Marketing Agency** — headquartered at A3-10 Casamia, Ngong Road, Kilimani, Nairobi, Kenya, operating across East, Central, and Southern Africa (Kenya, Uganda, Rwanda, DRC, and Zambia).

> **Imaginative Solutions for Exponential Growth.**

---

## Core Services

Exponential Marketing Agency focuses exclusively on six integrated marketing and creative services unified under four operational practice pillars:

1. **Social Media Management** (`/services/social-media-management`) — Always-on channel calendars, community management, social storytelling, and audience growth across Meta and TikTok.
2. **Content Creation & Marketing** (`/services/content-creation-and-marketing`) — Commercial photography, short-form vertical reels, campaign filmmaking, and strategic copywriting engineered for digital attention.
3. **Influencer Marketing** (`/services/influencer-marketing`) — Creator casting, vetted influencer campaigns, collaborative dining/retail shoots, and talent briefing across lifestyle and F&B niches.
4. **Media Buying** (`/services/media-buying`) — Paid media planning, Meta & Google Ads buying, TikTok campaign distribution, audience segmentation, and spend optimization.
5. **Brand Activation** (`/services/brand-activation`) — On-ground experiential activations, store launches, mall pop-ups, product sampling drives, and consumer engagement events.
6. **Visual Design** (`/services/visual-design`) — Complete brand identity systems, logo design, packaging, print collateral, social visual templates, and typography guidelines.

---

## Architecture Overview

The application is a full-stack TypeScript single-page application paired with a security-hardened Express API server (`server.ts`):

- **Frontend (React 19 + Vite 8 + Tailwind CSS v4)**:
  - Dominant brand crimson (`#ED1B24` / `#B81118` / `#9E0E15`) alternating strictly with crisp white (`#FFFFFF` / `#FAF5F5`) editorial bands, unboxed high-contrast typography, and unified full-bleed hero sections across desktop, tablet, and mobile viewports.
  - Bilingual **English (`EN`) / Swahili (`SW`)** switcher (`src/context/LanguageContext.tsx`, `src/lib/i18n.ts`, `src/data/swahiliContent.ts`) covering navigation, hero sections, service landing pages, case studies, insights, FAQ, and inquiry workflows.
  - Client-side SPA routing in `src/App.tsx` supporting `/`, `/about`, `/ecosystem`, `/services`, `/services/:slug` (all 6 core services), `/work`, `/work/:slug`, `/insights`, `/insights/:slug`, `/faq`, `/team`, `/contact`, `/privacy-policy`, `/terms`, and `/admin`.
  - Uniform 5-band service landing pages (`src/pages/ServiceDetailPage.tsx`, `src/data/serviceDetails.ts`) showcasing distinct, committed portfolio photography, related work carousel, strategic commercial impact, deliverables & tracked KPIs, 5-stage connected delivery workflow, and cross-service navigation.
  - Interactive UX & mobile gestures: directional scroll-triggered reveals (`ScrollReveal.tsx` + `motion.ts`), subtle compact pointer cursor dot & halo (`CursorDot.tsx`) supporting desktop mouse/pen pointers and mobile/tablet touch gestures (with automatic fade-out after finger lift and reduced-motion compliance), animated impact counters (`LiveCounter.tsx`), persistent floating action dock with WhatsApp, Facebook, Instagram, LinkedIn & Back-to-Top trigger (`FloatingActionDock.tsx`), responsive mobile/desktop Services navigation with outside-tap and swipe-up mobile drawer dismissal (`Navbar.tsx`), overscroll-contained backdrop-dismissible inquiry modal (`ProjectInquiryModal.tsx`), horizontal swipe/snap card carousels (`HomePage.tsx`, `ServiceDetailPage.tsx`), and continuous dual-track `WorldwidePartnersMarquee` with touch-to-pause swiping and directional shift controls.
  - Rich SEO metadata (`SeoHead.tsx`, `src/lib/seo.ts`) emitting OpenGraph tags, canonical URLs, breadcrumbs, and sanitized JSON-LD schemas alongside dynamic `/robots.txt` and `/sitemap.xml` generation (`server.ts`, `src/data/sitemapSlugs.ts`), plus `vercel.json` deep-link SPA rewrites (`src/lib/routing.ts`).

- **Backend API (`server.ts` & `src/lib/server-security.ts`)**:
  - Serves Vite middleware in development (`npm run dev`) and the bundled `dist/` frontend in production (`npm start`) on port `3000`.
  - Applies strict Content-Security-Policy (CSP), HSTS/security headers, `16kb` JSON body limits, same-origin API guards, prototype-pollution / NoSQL operator payload filtering (`hasUnsafeJsonPayload`), multi-pass text/`mailto:`/URL sanitization (`src/lib/validation.ts`), and per-route sliding-window rate limiters.
  - `GET /api/health` — Liveness check reporting service identity.
  - `GET /api/auth/session` — Verifies Firebase ID token and returns active role and UID.
  - `POST /api/inquiries` — Server-validated (`zod` strict schema), idempotent project inquiry ingestion with honeypot protection, HMAC payload fingerprinting, rate limiting, and transactional Firestore Admin persistence (`EMA-YYYY-...` tracked reference codes).
  - `POST /api/newsletter/validate` — Rate-limited placeholder endpoint (`410 Gone`) while double-opt-in confirmation and suppression remain disabled.
  - `POST /api/insights/research` — Optional Google Gemini (`@google/genai`) Search Grounding market brief endpoint with prompt delimiter isolation, timeout protection, text sanitization, and verified `http`/`https` source URL filtering.
  - `GET /api/maps/config` — Exposes the browser-restricted Google Maps JavaScript API key (`VITE_GOOGLE_MAPS_API_KEY`) when configured.
  - `POST /api/admin/roles`, `PATCH /api/admin/roles/:uid`, `PATCH /api/admin/inquiries/:inquiryId/status` — Strictly verified Firebase ID token endpoints enforcing `active`, `email_verified`, token revocation checks, same-origin protection, last-admin/self-modification guards, and enrolled MFA (`firebase.sign_in_second_factor`) backed by transactional Firestore `audit_logs`.

- **Database & Security (`Cloud Firestore` + `Firebase Auth`)**:
  - Client SDK initialized via `src/lib/firebase.ts` and `firebase-applet-config.json`.
  - Server-side `firebase-admin` SDK isolated in `server.ts` and `src/lib/admin-auth.ts`.
  - Least-privilege `firestore.rules` schema validation separating public read models (`portfolio_projects`, `services`, `articles`, `testimonials`, `client_logos`, `team_members`, `site_settings`), staff CMS editing, and admin-only collections (`inquiries`, `users`, `audit_logs`), paired with client hydration and mutation sanitization (`CmsContext.tsx`, `admin-cms.ts`).

---

## Technology Stack

| Layer | Technology | Version / Package |
| --- | --- | --- |
| UI Framework | React | `^19.0.1` |
| Language | TypeScript | `^6.0.3` |
| Build Tool & Dev Server | Vite (`@vitejs/plugin-react`) | `^8.3.0` |
| Styling | Tailwind CSS (`@tailwindcss/vite`, `tailwindcss`) | `^4.3.3` |
| Icons | Lucide React | `^0.546.0` |
| Backend Server | Express + `tsx` + `esbuild` | `^4.21.2` |
| Auth & Database | Firebase Client SDK + Firebase Admin SDK | `^13.3.0` / `^14.5.1` |
| Input Validation | Zod | `^4.6.7` |
| AI Grounding | `@google/genai` | `^3.3.0` |
| Maps Integration | `@vis.gl/react-google-maps` | `^1.10.2` |
| Security Rules Linting | ESLint + `@firebase/eslint-plugin-security-rules` | `^10.14.0` / `^0.0.2` |

---

## Project Tree

```text
.
├── .env.example
├── eslint.config.js
├── firebase-applet-config.json
├── firebase-blueprint.json
├── firebase.json
├── firestore.rules
├── index.html
├── metadata.json
├── package-lock.json
├── package.json
├── README.md
├── server.ts
├── tsconfig.json
├── vercel.json
├── vite.config.ts
├── docs/
│   ├── administrator-access.md
│   └── emulator-testing.md
├── public/
│   └── assets/
│       └── profile/
│           ├── brand/
│           ├── clients/
│           └── work/
├── scripts/
│   ├── provision-admin.ts
│   └── run-emulator-tests.mjs
├── src/
│   ├── App.tsx
│   ├── index.css
│   ├── main.tsx
│   ├── assets/
│   │   └── images/
│   ├── components/
│   │   ├── BrandLogo.tsx
│   │   ├── CursorDot.tsx
│   │   ├── FloatingActionDock.tsx
│   │   ├── Footer.tsx
│   │   ├── HeroBackdrop.tsx
│   │   ├── LiveCounter.tsx
│   │   ├── Navbar.tsx
│   │   ├── OfficeLocationsMap.tsx
│   │   ├── OptimizedImage.tsx
│   │   ├── ProjectInquiryForm.tsx
│   │   ├── ProjectInquiryModal.tsx
│   │   ├── ScrollReveal.tsx
│   │   ├── SearchGroundedBrief.tsx
│   │   ├── SeoHead.tsx
│   │   └── WorldwidePartnersMarquee.tsx
│   ├── context/
│   │   ├── AuthContext.tsx
│   │   ├── CmsContext.tsx
│   │   └── LanguageContext.tsx
│   ├── data/
│   │   ├── faqData.ts
│   │   ├── pageHeroes.ts
│   │   ├── projectDetails.ts
│   │   ├── projectSupplementalMedia.ts
│   │   ├── seedData.ts
│   │   ├── serviceDetails.ts
│   │   ├── sitemapSlugs.ts
│   │   ├── swahiliContent.ts
│   │   └── verifiedContact.ts
│   ├── lib/
│   │   ├── admin-auth.ts
│   │   ├── admin-cms.ts
│   │   ├── firebase.ts
│   │   ├── firestore-errors.ts
│   │   ├── gemini.ts
│   │   ├── i18n.test.ts
│   │   ├── i18n.ts
│   │   ├── inquiryServices.test.ts
│   │   ├── inquiryServices.ts
│   │   ├── motion.test.ts
│   │   ├── motion.ts
│   │   ├── portfolio.test.ts
│   │   ├── portfolio.ts
│   │   ├── routing.test.ts
│   │   ├── routing.ts
│   │   ├── seo.ts
│   │   ├── server-security.ts
│   │   ├── validation.test.ts
│   │   └── validation.ts
│   ├── pages/
│   │   ├── AboutPage.tsx
│   │   ├── AdminPage.tsx
│   │   ├── ArticlePage.tsx
│   │   ├── CaseStudyPage.tsx
│   │   ├── ContactPage.tsx
│   │   ├── EcosystemPage.tsx
│   │   ├── FaqPage.tsx
│   │   ├── HomePage.tsx
│   │   ├── InsightsPage.tsx
│   │   ├── LegalPage.tsx
│   │   ├── NotFoundPage.tsx
│   │   ├── ServiceDetailPage.tsx
│   │   ├── ServicesPage.tsx
│   │   ├── TeamPage.tsx
│   │   └── WorkPage.tsx
│   └── types/
│       └── cms.ts
└── tests/
    ├── admin-auth.test.mjs
    └── emulator/
        ├── expected-config.mjs
        ├── firestore-rules.test.mjs
        ├── helpers.mjs
        ├── inquiry.test.mjs
        ├── probe-mfa.mjs
        ├── probe.mjs
        ├── provisioning.test.mjs
        ├── rate-limit.test.mjs
        └── server-auth.test.mjs
```

---

## Setup & Running Locally

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Environment Configuration** (optional integrations):
   Copy `.env.example` to `.env` if supplying optional runtime keys:
   ```env
   VITE_GOOGLE_MAPS_API_KEY=   # Optional Google Maps JS API key for Contact map view
   GEMINI_API_KEY=             # Optional server-side Gemini API key for Insights research briefs
   ```

3. **Start Development Server** (`npm run dev` on port `3000`):
   ```bash
   npm run dev
   ```
   The Express + Vite middleware dev server boots at `http://localhost:3000` (health check at `http://localhost:3000/api/health`).

4. **Production Build & Start**:
   ```bash
   npm run build
   npm start
   ```

5. **Initial Admin Provisioning**:
   Follow [docs/administrator-access.md](docs/administrator-access.md) to bootstrap an MFA-enrolled Firebase user into Firestore `users/{uid}` via:
   ```bash
   EMA_EXPECTED_FIREBASE_PROJECT_ID=<verified-project-id> \
   EMA_ADMIN_UID=<verified-firebase-auth-uid> \
   EMA_ADMIN_PROVISIONING_CONFIRM=PROVISION_INITIAL_ADMIN \
   npm run admin:provision
   ```

---

## Running Tests & Verification

| Check | Command | Notes |
| --- | --- | --- |
| **Full Automated Test Suite** | `npm test` | Runs `test:auth` (`tests/admin-auth.test.mjs`) and `test:unit` (`portfolio.test.ts`, `motion.test.ts`, `inquiryServices.test.ts`, `validation.test.ts`, `i18n.test.ts`, `routing.test.ts`). |
| **Lint & Type Check** | `npm run lint` | Runs `tsc --noEmit` and ESLint across client and server sources. |
| **ESLint & Security Rules Lint** | `npx eslint .` | Lints TypeScript sources and audits `firestore.rules` with `@firebase/eslint-plugin-security-rules`. |
| **Dependency Vulnerability Audit** | `npm audit` | Audits the locked npm dependency tree against known security advisories. |
| **Production Build Verification** | `npm run build` | Bundles Vite frontend (`dist/`) and Express server (`server.js`). Run `npm run clean` to remove build outputs. |
| **Firebase Emulator Integration Suite** | `npm run test:emulator` | Orchestrates local Auth (`127.0.0.1:9099`) & Firestore (`127.0.0.1:8080`) emulators against `demo-exponential-local` (`tests/emulator/*.test.mjs`). **Prerequisite**: Requires Firebase CLI and a Java JDK (`java`) available on `PATH`. See [docs/emulator-testing.md](docs/emulator-testing.md). |
