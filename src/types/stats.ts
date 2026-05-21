export type StatCategory = 'scorers' | 'assists' | 'cards';

export interface PlayerStat {
  id: string;
  name: string;
  country: string;
  position: string;
  matchesPlayed: number;
  value: number;
  photoUrl?: string;
}

export interface GroupTeam {
  shortName: string;
  played: number;
  goalDiff: number;
  points: number;
  qualified: boolean;
}

export interface GroupStanding {
  group: string;
  teams: GroupTeam[];
}
