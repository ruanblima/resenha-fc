export interface StandingEntry {
  rank: number;
  team: { id: number; name: string; shortName: string; imageUrl: string };
  points: number;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDiff: number;
  zone: string | null;
}

export interface StandingGroup {
  name: string;
  entries: StandingEntry[];
}

export interface CompetitionStandings {
  type: 'groups' | 'league';
  groups: StandingGroup[];
}
