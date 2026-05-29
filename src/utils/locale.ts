import { getLocales } from 'expo-localization';
import type { StandingGroup } from '../types/standings';

/**
 * Maps ISO 3166-1 alpha-2 country codes → team short names used in standings.
 * Add more entries as needed.
 */
const COUNTRY_CODE_TO_SHORT: Record<string, string> = {
  BR: 'BRA',
  AR: 'ARG',
  FR: 'FRA',
  DE: 'GER',
  ES: 'ESP',
  PT: 'POR',
  IT: 'ITA',
  NL: 'NED',
  HR: 'CRO',
  EN: 'ENG',
  GB: 'ENG', // en-GB fallback
  US: 'USA',
  MX: 'MEX',
  UY: 'URU',
  CO: 'COL',
  JP: 'JPN',
  KR: 'KOR',
  MA: 'MAR',
  SN: 'SEN',
  NG: 'NGA',
  PL: 'POL',
  CH: 'SUI',
  RS: 'SRB',
  DK: 'DEN',
  SE: 'SWE',
  AU: 'AUS',
};

/**
 * Returns the full device locale string using expo-localization (reliable on RN/Hermes).
 * e.g. 'pt-BR', 'en-US'
 */
export function getDeviceLocale(): string {
  try {
    return getLocales()[0]?.languageTag ?? '';
  } catch {
    return '';
  }
}

/**
 * Returns the ISO 3166-1 alpha-2 region code from the device locale.
 * e.g. 'pt-BR' → 'BR', 'en-US' → 'US'
 */
export function getDeviceCountryCode(): string {
  try {
    return getLocales()[0]?.regionCode?.toUpperCase() ?? '';
  } catch {
    return '';
  }
}

/**
 * Returns true if the device locale is pt-BR (Brazilian Portuguese).
 */
export function isPtBR(): boolean {
  const locale = getLocales()[0];
  return locale?.languageCode === 'pt' && locale?.regionCode === 'BR';
}

/**
 * Returns the team short name for the current device locale.
 * e.g. 'pt-BR' → 'BRA'
 */
export function getDeviceTeamShortName(): string | null {
  const code = getDeviceCountryCode();
  return COUNTRY_CODE_TO_SHORT[code] ?? null;
}

/**
 * Reorders groups so the user's country group appears first.
 * If the user's country is not found, returns the original order.
 */
export function sortGroupsByUserCountry(groups: StandingGroup[]): StandingGroup[] {
  const teamShort = getDeviceTeamShortName();
  if (!teamShort) return groups;

  const userGroupIndex = groups.findIndex((g) =>
    g.entries.some((e) => e.team.shortName === teamShort)
  );

  if (userGroupIndex <= 0) return groups; // already first or not found

  const reordered = [...groups];
  const [userGroup] = reordered.splice(userGroupIndex, 1);
  reordered.unshift(userGroup);
  return reordered;
}
