import test from 'node:test';
import assert from 'node:assert/strict';
import {
  CURSOR_DOT_HALF_PX,
  CURSOR_HALO_HALF_PX,
  computeCursorTransform,
  countArticleWords,
  getAlternatingSectionSurface,
  interpolateDisplayCountValue,
  isSupportedCursorPointer,
  parseArticleSections,
  parseCountDisplay,
  partitionPortfolioBands,
  shouldAutoHideCursorAfterEnd,
  shouldDismissDrawerOnSwipeUp,
  verifyAlternatingSequence,
} from './motion.ts';
import { getUiStrings, normalizeLanguage } from './i18n.ts';
import { CORE_SERVICE_ROUTES, CORE_SIX_SERVICES } from './portfolio.ts';
import { FAQ_CATEGORIES, FAQ_ITEMS } from '../data/faqData.ts';
import { SW_IMPACT_LABELS, SW_SERVICES, SW_SERVICE_SLUGS } from '../data/swahiliContent.ts';
import { DEFAULT_ARTICLES, DEFAULT_PORTFOLIO_PROJECTS } from '../data/seedData.ts';
import { ORDERED_SERVICE_DETAILS } from '../data/serviceDetails.ts';

test('alternating section surfaces alternate strictly starting with red after hero', () => {
  assert.equal(getAlternatingSectionSurface(0), 'red');
  assert.equal(getAlternatingSectionSurface(1), 'white');
  assert.equal(getAlternatingSectionSurface(2), 'red');
  assert.equal(verifyAlternatingSequence(['red', 'white', 'red', 'white', 'red']), true);
  assert.equal(verifyAlternatingSequence(['white', 'red']), false);
  assert.equal(verifyAlternatingSequence(['red', 'red', 'white']), false);
});

test('partitionPortfolioBands splits portfolio cleanly into uniform red and white bands', () => {
  const bands = partitionPortfolioBands(DEFAULT_PORTFOLIO_PROJECTS);
  assert.equal(bands.redBand.length + bands.whiteBand.length, DEFAULT_PORTFOLIO_PROJECTS.length);
  assert.ok(bands.redBand.length > 0);
  assert.ok(bands.whiteBand.length > 0);
  assert.equal(bands.redBand.length % 3, 0, 'Red band row aligns cleanly in 3-column grid');

  const smallSubset = DEFAULT_PORTFOLIO_PROJECTS.slice(0, 2);
  const smallBands = partitionPortfolioBands(smallSubset);
  assert.equal(smallBands.redBand.length, 2);
  assert.equal(smallBands.whiteBand.length, 0);
});

test('all insights articles contain detailed structured sections, headings, and lists', () => {
  assert.ok(DEFAULT_ARTICLES.length >= 4);

  for (const article of DEFAULT_ARTICLES) {
    const blocks = parseArticleSections(article.body);
    const headings = blocks.filter((b) => b.type === 'heading');
    const lists = blocks.filter((b) => b.type === 'list');
    const paragraphs = blocks.filter((b) => b.type === 'paragraph');
    const wordCount = countArticleWords(article);

    assert.ok(headings.length >= 3, `Expected >= 3 headings in article ${article.slug}`);
    assert.ok(lists.length >= 1, `Expected >= 1 checklist/list block in article ${article.slug}`);
    assert.ok(paragraphs.length >= 4, `Expected >= 4 body paragraphs in article ${article.slug}`);
    assert.ok(wordCount >= 350, `Expected rich long-form depth (>= 350 words) in ${article.slug}, got ${wordCount}`);
  }
});

test('parseCountDisplay and interpolateDisplayCountValue accurately parse and animate counters', () => {
  assert.deepEqual(parseCountDisplay('27'), { target: 27, prefix: '', suffix: '' });
  assert.deepEqual(parseCountDisplay('5 Countries'), { target: 5, prefix: '', suffix: ' Countries' });
  assert.deepEqual(parseCountDisplay('6 Services'), { target: 6, prefix: '', suffix: ' Services' });
  assert.deepEqual(parseCountDisplay('15 Showcases'), { target: 15, prefix: '', suffix: ' Showcases' });
  assert.deepEqual(parseCountDisplay('Kilimani'), { target: null, prefix: '', suffix: '' });

  assert.equal(interpolateDisplayCountValue(27, '', '', 0), '0');
  assert.equal(interpolateDisplayCountValue(27, '', '', -0.5), '0');
  assert.equal(interpolateDisplayCountValue(27, '', '', 0.5), '24');
  assert.equal(interpolateDisplayCountValue(27, '', '', 1), '27');
  assert.equal(interpolateDisplayCountValue(27, '', '', 1.5), '27');

  assert.equal(interpolateDisplayCountValue(15, '', ' Showcases', 0), '0 Showcases');
  assert.equal(interpolateDisplayCountValue(15, '', ' Showcases', 1), '15 Showcases');

  assert.deepEqual(parseCountDisplay('Nchi 5'), { target: 5, prefix: 'Nchi ', suffix: '' });
  assert.deepEqual(parseCountDisplay('Huduma 6'), { target: 6, prefix: 'Huduma ', suffix: '' });
  assert.deepEqual(parseCountDisplay('Miradi 15'), { target: 15, prefix: 'Miradi ', suffix: '' });
  assert.equal(interpolateDisplayCountValue(5, 'Nchi ', '', 0), 'Nchi 0');
  assert.equal(interpolateDisplayCountValue(5, 'Nchi ', '', 1), 'Nchi 5');
});

test('all six core services define valid local work photos and complete Swahili translations', () => {
  assert.equal(CORE_SERVICE_ROUTES.length, 6);
  for (const route of CORE_SERVICE_ROUTES) {
    assert.ok(route.photoUrl.startsWith('/assets/profile/work/'));
    assert.ok(CORE_SIX_SERVICES.includes(route.title));
    assert.ok(SW_SERVICES[route.title]?.title, `Missing Swahili service title for ${route.title}`);
    assert.ok(SW_SERVICES[route.title]?.problemSolved, `Missing Swahili problemSolved for ${route.title}`);
    assert.ok(SW_SERVICE_SLUGS[route.slug], `Missing Swahili service slug label for ${route.slug}`);
  }
  assert.equal(SW_IMPACT_LABELS.geographicReach.prefix, 'Nchi ');
  assert.equal(SW_IMPACT_LABELS.projectsCompleted.prefix, 'Huduma ');
  assert.equal(SW_IMPACT_LABELS.campaignsExecuted.prefix, 'Miradi ');
});

test('FAQ catalogue and EN/SW UI string dictionaries are complete', () => {
  assert.ok(FAQ_CATEGORIES.length >= 5);
  assert.ok(FAQ_ITEMS.length >= 8);
  for (const item of FAQ_ITEMS) {
    assert.ok(item.questionEn.length > 10 && item.answerEn.length > 30);
    assert.ok(item.questionSw.length > 10 && item.answerSw.length > 30);
  }

  assert.equal(normalizeLanguage('sw'), 'sw');
  assert.equal(normalizeLanguage('en'), 'en');
  assert.equal(normalizeLanguage('fr'), 'en');

  const en = getUiStrings('en');
  const sw = getUiStrings('sw');
  assert.equal(en.footer.exploreLinks.faq, 'FAQ');
  assert.ok(en.home.clientPerspectivesHeading.length > 0);
  assert.ok(sw.home.clientPerspectivesHeading.length > 0);
  assert.ok(sw.footer.exploreLinks.faq.length > 0);
  assert.ok(sw.footer.backToTop.length > 0);
  assert.ok(sw.nav.letsTalk.length > 0);

  for (const dict of [en, sw]) {
    const landingHeadings = [
      `${dict.home.heroLine1} ${dict.home.heroLine2}`,
      dict.about.heroTitle,
      dict.work.heroTitle,
      dict.insights.heroTitle,
      dict.contact.heroTitle,
    ];
    for (const heading of landingHeadings) {
      const wordCount = heading.trim().split(/\s+/).length;
      assert.ok(
        wordCount >= 3 && wordCount <= 5,
        `Expected 3-5 word uniform hero heading, got ${wordCount} ("${heading}")`
      );
    }
  }
});

test('all referenced local brand, client, portfolio, and hero image assets exist on disk', async () => {
  const fs = await import('node:fs');
  const path = await import('node:path');
  const {
    DEFAULT_CLIENT_LOGOS,
    OFFICIAL_BRAND_ASSETS,
  } = await import('../data/seedData.ts');
  const { PROJECT_SUPPLEMENTAL_MEDIA, OFFICIAL_LOGO_URL } = await import(
    '../data/projectSupplementalMedia.ts'
  );

  const root = process.cwd();
  const assertPublicAssetExists = (assetPath: string, label: string) => {
    if (assetPath.startsWith('/assets/')) {
      const diskPath = path.join(root, 'public', assetPath);
      assert.equal(fs.existsSync(diskPath), true, `Missing public asset for ${label}: ${diskPath}`);
    }
  };

  assertPublicAssetExists(OFFICIAL_BRAND_ASSETS.logoUrl, 'OFFICIAL_BRAND_ASSETS.logoUrl');
  assertPublicAssetExists(
    '/assets/profile/brand/exp-logo-white.png',
    'OFFICIAL_BRAND_ASSETS.footerLogoUrl'
  );
  assertPublicAssetExists(
    '/assets/profile/brand/exp-logo-red.png',
    'OFFICIAL_BRAND_ASSETS.headerLogoUrl'
  );
  assertPublicAssetExists(OFFICIAL_BRAND_ASSETS.markUrl, 'OFFICIAL_BRAND_ASSETS.markUrl');
  assertPublicAssetExists(OFFICIAL_BRAND_ASSETS.darkLockupUrl, 'OFFICIAL_BRAND_ASSETS.darkLockupUrl');
  assertPublicAssetExists(OFFICIAL_BRAND_ASSETS.aboutWhoWeAreUrl, 'OFFICIAL_BRAND_ASSETS.aboutWhoWeAreUrl');
  assertPublicAssetExists(OFFICIAL_LOGO_URL, 'OFFICIAL_LOGO_URL');
  assert.equal(
    fs.existsSync(path.join(root, 'src/assets/images/red_insights_workspace_analytics.png')),
    true,
    'Insights landing-page workspace hero asset must exist'
  );
  assertPublicAssetExists(
    OFFICIAL_BRAND_ASSETS.logoUrl,
    'BrandLogo PNG'
  );

  for (const route of CORE_SERVICE_ROUTES) {
    assertPublicAssetExists(route.photoUrl, `CORE_SERVICE_ROUTES[${route.slug}]`);
  }
  assert.equal(ORDERED_SERVICE_DETAILS.length, 6);
  const serviceHeroUrls = ORDERED_SERVICE_DETAILS.map((detail) => detail.heroImageUrl);
  assert.equal(
    new Set(serviceHeroUrls).size,
    6,
    'All six service detail landing pages must use distinct hero assets'
  );
  for (const detail of ORDERED_SERVICE_DETAILS) {
    assert.ok(
      detail.heroImageUrl.startsWith('/assets/profile/service-heroes/') && detail.heroImageUrl.endsWith('.png'),
      `Expected a committed service hero PNG for ${detail.slug}, got ${detail.heroImageUrl}`
    );
    assertPublicAssetExists(detail.heroImageUrl, `SERVICE_DETAILS[${detail.slug}].heroImageUrl`);
    const imageBytes = fs.readFileSync(path.join(root, 'public', detail.heroImageUrl));
    assert.equal(
      imageBytes[0] === 0x89 && imageBytes[1] === 0x50 && imageBytes[2] === 0x4e && imageBytes[3] === 0x47,
      true,
      `Service hero image must be a valid PNG for ${detail.slug}`
    );
  }
  for (const project of DEFAULT_PORTFOLIO_PROJECTS) {
    assertPublicAssetExists(project.imageUrl, `portfolio[${project.slug}]`);
  }
  for (const article of DEFAULT_ARTICLES) {
    assertPublicAssetExists(article.imageUrl, `article[${article.slug}]`);
  }
  for (const logo of DEFAULT_CLIENT_LOGOS) {
    assert.ok(logo.logoUrl, `clientLogo[${logo.id}] must define logoUrl`);
    assertPublicAssetExists(logo.logoUrl, `clientLogo[${logo.id}]`);
  }
  for (const [slug, entry] of Object.entries(PROJECT_SUPPLEMENTAL_MEDIA)) {
    for (const item of entry.gallery) {
      assertPublicAssetExists(item.imageUrl, `supplemental[${slug}]`);
    }
  }

  const indexHtml = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
  const htmlAssetMatches = indexHtml.match(/\/assets\/[^"'`\s)]+/g) || [];
  for (const ref of htmlAssetMatches) {
    assertPublicAssetExists(ref, `index.html(${ref})`);
  }
  assert.equal(
    fs.existsSync(path.join(root, 'src/assets/images/about_hero_clean_right_1795433191137.jpg')),
    true,
    'Team page hero asset must exist'
  );
  assert.equal(
    fs.existsSync(path.join(root, 'src/assets/images/about_who_we_are_executive.png')),
    true,
    'Cropped executive portrait asset for Who We Are must exist'
  );
});

test('all major site page band sequences start with red after hero and strictly alternate red and white', () => {
  assert.equal(
    verifyAlternatingSequence([
      'red',
      'white',
      'red',
      'white',
      'red',
      'white',
      'red',
    ]),
    true,
    'HomePage 7 alternating bands (Recent Work, Cohesive Growth, Six Services, How We Deliver, Latest Insights, Trusted Brands, Final CTA)'
  );
  assert.equal(
    verifyAlternatingSequence(['red', 'white', 'red', 'white', 'red', 'white', 'red', 'white']),
    true,
    'AboutPage 8 alternating bands (including Trusted by Leading Brands below Why Choose Us)'
  );
  assert.equal(
    verifyAlternatingSequence(['red', 'white', 'red', 'white', 'red', 'white', 'red']),
    true,
    'EcosystemPage 7 alternating bands'
  );
  assert.equal(
    verifyAlternatingSequence(['red', 'white', 'red']),
    true,
    'WorkPage, InsightsPage, ContactPage, TeamPage, FaqPage 3 bands'
  );
  assert.equal(
    verifyAlternatingSequence(['red', 'white', 'red', 'white', 'red']),
    true,
    'ServicesPage & ServiceDetailPage 5 bands'
  );
  assert.equal(
    verifyAlternatingSequence(['red']),
    true,
    'LegalPage uses a unified full-red background for Privacy Policy and Terms'
  );
});

test('LegalPage uses a fully red background without intermediate white bands', async () => {
  const fs = await import('node:fs');
  const path = await import('node:path');
  const legalSource = fs.readFileSync(
    path.join(process.cwd(), 'src/pages/LegalPage.tsx'),
    'utf8'
  );
  assert.equal(legalSource.includes('bg-[#B81118] text-white'), true);
  assert.equal(legalSource.includes('bg-white text-[#2A1214]'), false);
});

test('CursorDot supports desktop and mobile touch pointers with compact geometry', () => {
  assert.equal(isSupportedCursorPointer('mouse'), true);
  assert.equal(isSupportedCursorPointer('pen'), true);
  assert.equal(isSupportedCursorPointer('touch'), true);
  assert.equal(isSupportedCursorPointer(''), true);
  assert.equal(isSupportedCursorPointer('unknown'), false);

  assert.equal(shouldAutoHideCursorAfterEnd('touch'), true);
  assert.equal(shouldAutoHideCursorAfterEnd('mouse'), false);
  assert.equal(shouldAutoHideCursorAfterEnd('pen'), false);

  assert.equal(
    computeCursorTransform(100, 200, CURSOR_HALO_HALF_PX, 1),
    'translate3d(88px, 188px, 0) scale(1)'
  );
  assert.equal(
    computeCursorTransform(100, 200, CURSOR_DOT_HALF_PX, 1.35),
    'translate3d(95px, 195px, 0) scale(1.35)'
  );

  assert.equal(shouldDismissDrawerOnSwipeUp(-70, 10, true), true);
  assert.equal(shouldDismissDrawerOnSwipeUp(-70, 10, false), false);
  assert.equal(shouldDismissDrawerOnSwipeUp(-30, 5, true), false);
  assert.equal(shouldDismissDrawerOnSwipeUp(-70, 90, true), false);
});

test('all public section h2 subtitles match Recent work font scale (text-2xl sm:text-4xl)', async () => {
  const fs = await import('node:fs');
  const path = await import('node:path');
  const filesToCheck = [
    'src/pages/HomePage.tsx',
    'src/pages/AboutPage.tsx',
    'src/pages/ServicesPage.tsx',
    'src/pages/ServiceDetailPage.tsx',
    'src/pages/WorkPage.tsx',
    'src/pages/CaseStudyPage.tsx',
    'src/pages/EcosystemPage.tsx',
    'src/pages/TeamPage.tsx',
    'src/pages/InsightsPage.tsx',
    'src/pages/FaqPage.tsx',
    'src/pages/ContactPage.tsx',
    'src/components/WorldwidePartnersMarquee.tsx',
    'src/components/SearchGroundedBrief.tsx',
  ];

  for (const relPath of filesToCheck) {
    const source = fs.readFileSync(path.join(process.cwd(), relPath), 'utf8');
    const h2Matches = [...source.matchAll(/<h2\b[\s\S]*?>/g)];
    assert.ok(h2Matches.length > 0, `Expected at least one h2 in ${relPath}`);
    for (const match of h2Matches) {
      const tag = match[0];
      if (relPath === 'src/pages/TeamPage.tsx' && tag.includes('text-2xl font-display')) {
        continue;
      }
      assert.equal(
        tag.includes('text-2xl sm:text-4xl'),
        true,
        `Expected uniform text-2xl sm:text-4xl scale on h2 in ${relPath}: ${tag}`
      );
      assert.equal(
        tag.includes('sm:text-5xl') || tag.includes('lg:text-[2.75rem]'),
        false,
        `Unexpected oversized section subtitle class on h2 in ${relPath}: ${tag}`
      );
    }
  }
});
