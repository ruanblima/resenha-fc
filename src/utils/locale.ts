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
 * Returns the ISO 3166-1 alpha-2 country code from the device locale.
 * e.g. 'pt-BR' → 'BR', 'en-US' → 'US'
 */
export function getDeviceCountryCode(): string {
  try {
    const locale = Intl.DateTimeFormat().resolvedOptions().locale; // e.g. 'pt-BR'
    const parts = locale.split('-');
    return parts[parts.length - 1].toUpperCase();
  } catch {
    return '';
  }
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
