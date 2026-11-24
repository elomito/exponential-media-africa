import test from 'node:test';
import assert from 'node:assert/strict';
import { EN_STRINGS, SW_STRINGS, getUiStrings, normalizeLanguage } from './i18n.ts';
import { formatSeoDescription, formatSeoTitle } from './seo.ts';
import {
  SW_ARTICLE_CATEGORIES,
  SW_ARTICLES,
  SW_CATEGORIES,
  SW_CORE_VALUES,
  SW_DIVISIONS,
  SW_IMPACT_LABELS,
  SW_PROJECTS,
  SW_SERVICES,
  SW_SERVICE_DETAIL_EXTRAS,
  SW_SERVICE_SLUGS,
  SW_TEAM_SLOTS,
  SW_TERRITORY_MARKETS,
} from '../data/swahiliContent.ts';
import {
  CORE_VALUES,
  DEFAULT_ARTICLES,
  DEFAULT_PORTFOLIO_PROJECTS,
  DEFAULT_SERVICES,
  DIVISIONS,
  TERRITORY_MARKETS,
} from '../data/seedData.ts';
import { CORE_SERVICE_ROUTES } from './portfolio.ts';

function collectShapeKeys(obj: unknown, prefix = ''): string[] {
  if (Array.isArray(obj)) {
    return [`${prefix}[]`];
  }
  if (obj && typeof obj === 'object') {
    const keys: string[] = [];
    for (const [k, v] of Object.entries(obj)) {
      const next = prefix ? `${prefix}.${k}` : k;
      keys.push(...collectShapeKeys(v, next));
    }
    return keys.sort();
  }
  return [prefix];
}

test('EN_STRINGS and SW_STRINGS share identical nested structural keys and non-empty strings', () => {
  assert.deepEqual(collectShapeKeys(EN_STRINGS), collectShapeKeys(SW_STRINGS));
  assert.equal(EN_STRINGS.research.topics.length, SW_STRINGS.research.topics.length);
  assert.equal(EN_STRINGS.home.introStrips.length, SW_STRINGS.home.introStrips.length);
  assert.equal(EN_STRINGS.home.workflowStages.length, SW_STRINGS.home.workflowStages.length);
  assert.equal(EN_STRINGS.about.whyReasons.length, SW_STRINGS.about.whyReasons.length);
  assert.equal(EN_STRINGS.insights.heroHighlights.length, SW_STRINGS.insights.heroHighlights.length);
});

test('getUiStrings and normalizeLanguage select language cleanly', () => {
  assert.equal(normalizeLanguage('sw'), 'sw');
  assert.equal(normalizeLanguage('en'), 'en');
  assert.equal(normalizeLanguage(null), 'en');
  assert.equal(normalizeLanguage('de'), 'en');
  assert.equal(getUiStrings('en'), EN_STRINGS);
  assert.equal(getUiStrings('sw'), SW_STRINGS);
});

test('Swahili translation dictionaries cover all core services, divisions, markets, values, and default content', () => {
  for (const srv of DEFAULT_SERVICES) {
    assert.ok(SW_SERVICES[srv.title]?.title, `Missing SW_SERVICES entry for ${srv.title}`);
  }
  for (const route of CORE_SERVICE_ROUTES) {
    assert.ok(SW_SERVICE_SLUGS[route.slug], `Missing SW_SERVICE_SLUGS entry for ${route.slug}`);
    assert.ok(
      SW_SERVICE_DETAIL_EXTRAS[route.slug],
      `Missing SW_SERVICE_DETAIL_EXTRAS entry for ${route.slug}`
    );
  }
  for (const div of DIVISIONS) {
    assert.ok(SW_DIVISIONS[div.id]?.name, `Missing SW_DIVISIONS entry for ${div.id}`);
  }
  for (const market of TERRITORY_MARKETS) {
    assert.ok(
      SW_TERRITORY_MARKETS[market.country]?.country,
      `Missing SW_TERRITORY_MARKETS entry for ${market.country}`
    );
  }
  for (const val of CORE_VALUES) {
    assert.ok(SW_CORE_VALUES[val.id]?.title, `Missing SW_CORE_VALUES entry for ${val.id}`);
  }
  for (const project of DEFAULT_PORTFOLIO_PROJECTS) {
    assert.ok(SW_PROJECTS[project.slug]?.title, `Missing SW_PROJECTS entry for ${project.slug}`);
    assert.ok(SW_CATEGORIES[project.category], `Missing SW_CATEGORIES entry for ${project.category}`);
  }
  for (const article of DEFAULT_ARTICLES) {
    assert.ok(SW_ARTICLES[article.slug]?.title, `Missing SW_ARTICLES entry for ${article.slug}`);
    assert.ok(
      SW_ARTICLE_CATEGORIES[article.category],
      `Missing SW_ARTICLE_CATEGORIES entry for ${article.category}`
    );
  }

  assert.ok(Object.keys(SW_IMPACT_LABELS).length >= 3);
  assert.ok(Object.keys(SW_TEAM_SLOTS).length >= 4);
});

test('all static routes define unique, well-sized EN and SW SEO titles and descriptions', () => {
  for (const [lang, dict] of [
    ['en', EN_STRINGS.seo],
    ['sw', SW_STRINGS.seo],
  ] as const) {
    const titleKeys = Object.keys(dict).filter((k) => k.endsWith('Title')) as Array<
      keyof typeof dict
    >;
    const descKeys = Object.keys(dict).filter((k) => k.endsWith('Description')) as Array<
      keyof typeof dict
    >;

    const titles = titleKeys.map((k) => dict[k]);
    const descriptions = descKeys.map((k) => dict[k]);

    assert.equal(new Set(titles).size, titles.length, `Duplicate ${lang} SEO titles found`);
    assert.equal(
      new Set(descriptions).size,
      descriptions.length,
      `Duplicate ${lang} SEO descriptions found`
    );

    for (const k of titleKeys) {
      const len = dict[k].length;
      assert.ok(len >= 30 && len <= 72, `${lang}.${k} length ${len} out of 30..72 SEO range`);
    }
    for (const k of descKeys) {
      const len = dict[k].length;
      assert.ok(len >= 100 && len <= 165, `${lang}.${k} length ${len} out of 100..165 SEO range`);
    }
  }

  assert.equal(
    formatSeoTitle('<b>About Us</b>'),
    'About Us — Exponential Marketing Agency'
  );
  assert.equal(
    formatSeoTitle('Exponential Marketing Agency — Brand Growth'),
    'Exponential Marketing Agency — Brand Growth'
  );
  const clipped = formatSeoDescription(
    'Word '.repeat(45).trim()
  );
  assert.ok(clipped.length <= 160);
});

test('every page component updates document head via SeoHead and Insights hero mirrors strategist to the right', async () => {
  const fs = await import('node:fs');
  const path = await import('node:path');
  const pagesDir = path.join(process.cwd(), 'src/pages');
  const pageFiles = fs.readdirSync(pagesDir).filter((f) => f.endsWith('.tsx'));
  assert.equal(pageFiles.length, 15);

  for (const file of pageFiles) {
    const source = fs.readFileSync(path.join(pagesDir, file), 'utf8');
    assert.equal(source.includes('<SeoHead'), true, `${file} must render <SeoHead>`);
    assert.equal(source.includes('title='), true, `${file} <SeoHead> must specify title`);
    assert.equal(source.includes('description='), true, `${file} <SeoHead> must specify description`);
    assert.equal(source.includes('path='), true, `${file} <SeoHead> must specify path`);
  }

  const insightsSource = fs.readFileSync(path.join(pagesDir, 'InsightsPage.tsx'), 'utf8');
  const scaleMatches = insightsSource.match(/-scale-x-100/g) || [];
  assert.equal(
    scaleMatches.length,
    2,
    'InsightsPage hero mobile and desktop visuals must horizontally flip strategist onto right side'
  );
});
