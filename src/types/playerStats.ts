export type StatType = 'scorers' | 'assists' | 'yellowcards' | 'redcards';

export interface PlayerStatEntry {
  rank: number;
  player: {
    id: number;
    name: string;
    photo: string;
    nationality: string;
  };
  team: {
    id: number;
    name: string;
    logo: string;
  };
  value: number;
  games: number;
  goals: number;
  assists: number;
  yellowCards: number;
  redCards: number;
}

export interface CompetitionStats {
  type: StatType;
  players: PlayerStatEntry[];
}
