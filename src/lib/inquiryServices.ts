import { DIVISIONS } from '../data/seedData';
import type { DivisionMeta } from '../types/cms';

export type DivisionId = DivisionMeta['id'];

function normalizeText(value: string): string {
  return value.trim().toLowerCase();
}

/**
 * Returns the canonical ordered list of division IDs that own at least one
 * service in `selectedServices`.
 */
export function findDivisionIdsForServices(selectedServices: readonly string[]): DivisionId[] {
  const normalizedSelected = new Set(selectedServices.map(normalizeText).filter(Boolean));
  if (normalizedSelected.size === 0) return [];

  return DIVISIONS.filter((division) =>
    division.services.some((srv) => normalizedSelected.has(normalizeText(srv)))
  ).map((division) => division.id);
}

/**
 * Resolves the canonical service label matching `input` (case-insensitive),
 * or returns `input` trimmed if no exact canonical division service matches.
 */
export function resolveCanonicalServiceName(input: string): string {
  const trimmed = input.trim();
  if (!trimmed) return '';
  const target = normalizeText(trimmed);

  for (const division of DIVISIONS) {
    const match = division.services.find((srv) => normalizeText(srv) === target);
    if (match) return match;
  }
  return trimmed;
}

/**
 * Toggles a primary service pillar (division). Unchecking a pillar removes all
 * of its sub-services from `selectedServices`. Checking preserves existing items
 * and orders active pillars canonically.
 */
export function toggleDivisionSelection(
  activeDivisionIds: readonly DivisionId[],
  selectedServices: readonly string[],
  divisionId: DivisionId
): { activeDivisionIds: DivisionId[]; selectedServices: string[] } {
  const isActive = activeDivisionIds.includes(divisionId);

  if (isActive) {
    const division = DIVISIONS.find((d) => d.id === divisionId);
    const removedSet = new Set((division?.services || []).map(normalizeText));
    return {
      activeDivisionIds: activeDivisionIds.filter((id) => id !== divisionId),
      selectedServices: selectedServices.filter((srv) => !removedSet.has(normalizeText(srv))),
    };
  }

  const nextSet = new Set<DivisionId>([...activeDivisionIds, divisionId]);
  return {
    activeDivisionIds: DIVISIONS.map((d) => d.id).filter((id) => nextSet.has(id)),
    selectedServices: [...selectedServices],
  };
}

/**
 * Toggles a specific sub-service inside `selectedServices`, enforcing `maxItems`.
 */
export function toggleSubServiceSelection(
  selectedServices: readonly string[],
  service: string,
  maxItems = 20
): string[] {
  const canonical = resolveCanonicalServiceName(service);
  if (!canonical) return [...selectedServices];

  if (selectedServices.includes(canonical)) {
    return selectedServices.filter((item) => item !== canonical);
  }
  if (selectedServices.length >= maxItems) {
    return [...selectedServices];
  }
  return [...selectedServices, canonical];
}

/**
 * Filters `selectedServices` to those belonging to a specific `divisionId`.
 */
export function getSelectedServicesForDivision(
  selectedServices: readonly string[],
  divisionId: DivisionId
): string[] {
  const division = DIVISIONS.find((d) => d.id === divisionId);
  if (!division) return [];
  const divisionSet = new Set(division.services.map(normalizeText));
  return selectedServices.filter((srv) => divisionSet.has(normalizeText(srv)));
}
