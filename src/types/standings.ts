export interface StandingEntry {
  rank: number;
  team: { id: number; name: string; shortName: string; flagUrl: string };
  points: number;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDiff: number;
  qualified: boolean;
}

export interface StandingGroup {
  name: string;
  entries: StandingEntry[];
}

export interface CompetitionStandings {
  groups: StandingGroup[];
}
