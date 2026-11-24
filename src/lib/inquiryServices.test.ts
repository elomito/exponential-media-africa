import test from 'node:test';
import assert from 'node:assert/strict';
import {
  findDivisionIdsForServices,
  getSelectedServicesForDivision,
  resolveCanonicalServiceName,
  toggleDivisionSelection,
  toggleSubServiceSelection,
} from './inquiryServices';

test('findDivisionIdsForServices resolves parent pillars in canonical order', () => {
  const active = findDivisionIdsForServices(['Brand Activation', 'Visual Design']);
  assert.deepEqual(active, ['creative', 'emtc']);
});

test('resolveCanonicalServiceName preserves canonical casing regardless of input case', () => {
  assert.equal(resolveCanonicalServiceName('media buying'), 'Media Buying');
  assert.equal(resolveCanonicalServiceName('Commercial photography'), 'Commercial photography');
});

test('toggleDivisionSelection activates and clears a pillar together with its sub-services', () => {
  const first = toggleDivisionSelection([], [], 'marketing');
  assert.deepEqual(first.activeDivisionIds, ['marketing']);
  assert.deepEqual(first.selectedServices, []);

  const withSubs = toggleSubServiceSelection(
    toggleSubServiceSelection(first.selectedServices, 'Social Media Management'),
    'Media Buying'
  );
  assert.deepEqual(withSubs, ['Social Media Management', 'Media Buying']);

  const second = toggleDivisionSelection(first.activeDivisionIds, withSubs, 'creative');
  assert.deepEqual(second.activeDivisionIds, ['creative', 'marketing']);

  const withCreativeSub = toggleSubServiceSelection(second.selectedServices, 'Visual Design');
  const afterUncheck = toggleDivisionSelection(
    second.activeDivisionIds,
    withCreativeSub,
    'marketing'
  );
  assert.deepEqual(afterUncheck.activeDivisionIds, ['creative']);
  assert.deepEqual(afterUncheck.selectedServices, ['Visual Design']);
});

test('getSelectedServicesForDivision isolates selected items per pillar and respects max cap', () => {
  let list: string[] = ['Visual Design', 'Media Buying', 'Brand Activation'];
  assert.deepEqual(getSelectedServicesForDivision(list, 'creative'), ['Visual Design']);
  assert.deepEqual(getSelectedServicesForDivision(list, 'marketing'), ['Media Buying']);
  assert.deepEqual(getSelectedServicesForDivision(list, 'emtc'), ['Brand Activation']);
  assert.deepEqual(getSelectedServicesForDivision(list, 'estudios'), []);

  for (let i = 0; i < 25; i++) {
    list = toggleSubServiceSelection(list, `Custom Option ${i}`, 20);
  }
  assert.equal(list.length, 20);
});
