import test from 'node:test';
import assert from 'node:assert/strict';
import {
  CORE_SERVICE_ROUTES,
  CORE_SIX_SERVICES,
  filterProjectsByCategory,
  findProjectBySlug,
  findServiceRouteBySlug,
  getProjectsForService,
  getRelatedProjects,
  getServiceSlug,
  normalizeLegacyServiceTitle,
} from './portfolio.ts';
import { DEFAULT_PORTFOLIO_PROJECTS, DEFAULT_SERVICES } from '../data/seedData.ts';
import { PROJECT_DETAILS, getFallbackDetailForProject } from '../data/projectDetails.ts';
import { SERVICE_DETAILS } from '../data/serviceDetails.ts';

test('agency defines strictly the six core exclusive services', () => {
  assert.deepEqual(CORE_SIX_SERVICES, [
    'Social Media Management',
    'Content Creation & Marketing',
    'Influencer Marketing',
    'Media Buying',
    'Brand Activation',
    'Visual Design',
  ]);
  assert.equal(DEFAULT_SERVICES.length, 6);
  const serviceTitles = DEFAULT_SERVICES.map((s) => s.title);
  assert.deepEqual(serviceTitles, [...CORE_SIX_SERVICES]);
});

test('filterProjectsByCategory returns visible projects matching category', () => {
  const all = filterProjectsByCategory(DEFAULT_PORTFOLIO_PROJECTS, 'All');
  assert.equal(all.length, DEFAULT_PORTFOLIO_PROJECTS.length);

  const branding = filterProjectsByCategory(DEFAULT_PORTFOLIO_PROJECTS, 'Branding');
  assert.ok(branding.length >= 3);
  assert.ok(branding.every((p) => p.category === 'Branding'));
});

test('findProjectBySlug resolves Cinnamon Energies even with trailing slash', () => {
  const found = findProjectBySlug(
    DEFAULT_PORTFOLIO_PROJECTS,
    'cinnamon-energies-complete-brand-identity/'
  );
  assert.ok(found);
  assert.equal(found.clientName, 'Cinnamon Energies');
});

test('Cinnamon Energies has rich multi-section detail data', () => {
  const detail = PROJECT_DETAILS['cinnamon-energies-complete-brand-identity'];
  assert.ok(detail);
  assert.ok(detail.executiveOverview.length >= 2);
  assert.ok(detail.strategicObjectives.length >= 4);
  assert.ok(detail.specifications.length >= 5);
  assert.ok(detail.executionPhases.length === 4);
  assert.ok(detail.deliverableDetails.length >= 4);
  assert.ok(detail.documentedOutcomes.length >= 3);
});

test('getFallbackDetailForProject builds full detail structure for every project', () => {
  for (const project of DEFAULT_PORTFOLIO_PROJECTS) {
    const detail = PROJECT_DETAILS[project.slug] || getFallbackDetailForProject(project);
    assert.ok(detail.executiveOverview.length >= 2, `Missing overview for ${project.slug}`);
    assert.ok(detail.executionPhases.length === 4, `Missing 4 phases for ${project.slug}`);
    assert.ok(detail.deliverableDetails.length >= 1, `Missing deliverables for ${project.slug}`);
  }
});

test('getRelatedProjects excludes current slug and prioritizes matching category', () => {
  const related = getRelatedProjects(
    DEFAULT_PORTFOLIO_PROJECTS,
    'cinnamon-energies-complete-brand-identity',
    3
  );
  assert.equal(related.length, 3);
  assert.ok(related.every((p) => p.slug !== 'cinnamon-energies-complete-brand-identity'));
  assert.equal(related[0].category, 'Branding');
});

test('normalizeLegacyServiceTitle maps legacy labels cleanly to the six service names', () => {
  assert.equal(normalizeLegacyServiceTitle('Media Buy'), 'Media Buying');
  assert.equal(normalizeLegacyServiceTitle('Brand Activation & Events'), 'Brand Activation');
  assert.equal(normalizeLegacyServiceTitle('Visual Design & Brand Identity'), 'Visual Design');
  assert.equal(normalizeLegacyServiceTitle('Influencer Marketing'), 'Influencer Marketing');
});

test('all six core services have dedicated standalone pages, 5 process stages, and matching previous works', () => {
  assert.equal(CORE_SERVICE_ROUTES.length, 6);

  for (const serviceTitle of CORE_SIX_SERVICES) {
    const slug = getServiceSlug(serviceTitle);
    const route = findServiceRouteBySlug(slug);
    assert.ok(route, `Missing route metadata for ${serviceTitle}`);

    const detail = SERVICE_DETAILS[slug];
    assert.ok(detail, `Missing rich service detail record for ${slug}`);
    assert.equal(detail.title, serviceTitle);
    assert.equal(detail.processStages.length, 5, `Expected 5 process stages for ${slug}`);
    assert.ok(detail.deliverablesScope.length >= 6, `Expected >=6 deliverables for ${slug}`);
    assert.ok(detail.extendedOverview.length >= 2, `Expected multi-paragraph overview for ${slug}`);

    const previousWorks = getProjectsForService(DEFAULT_PORTFOLIO_PROJECTS, slug, 6);
    assert.ok(previousWorks.length >= 3, `Expected >=3 previous works for ${slug}`);
  }

  const activationWorks = getProjectsForService(DEFAULT_PORTFOLIO_PROJECTS, 'brand-activation', 6);
  assert.ok(
    activationWorks.some((p) => p.category === 'Brand Activations'),
    'Brand Activation page must include Brand Activations case studies'
  );
  assert.ok(
    activationWorks.some((p) => p.slug.includes('galitos')),
    'Brand Activation page must include Galito’s activations'
  );
});
