export type MatchStatus = 'live' | 'finished' | 'scheduled';

export interface MatchEvent {
  minute: number;
  type: 'goal' | 'yellow_card' | 'red_card' | 'substitution';
  team: 'home' | 'away';
  playerName: string;
}

export interface Team {
  id: number;
  name: string;
  shortName: string;
  flagUrl: string;
}

export interface LiveMatch {
  id: number;
  status: MatchStatus;
  minute: number;
  competition: string;
  stage: string;
  homeTeam: Team;
  awayTeam: Team;
  homeScore: number;
  awayScore: number;
  events: MatchEvent[];
}
