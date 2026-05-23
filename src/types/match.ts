export type MatchStatus = 'live' | 'finished' | 'scheduled';
export type MatchDetailTab = 'events' | 'lineups' | 'stats' | 'summary';

export interface MatchEvent {
  minute: number;
  type: 'goal' | 'yellow_card' | 'red_card' | 'substitution';
  team: 'home' | 'away';
  playerName: string;
  playerOut?: string;
  description?: string;
}

export interface Team {
  id: number;
  name: string;
  shortName: string;
  flagUrl: string;
}

export interface MatchStatItem {
  label: string;
  homeValue: number | string;
  awayValue: number | string;
  homePercent: number;
}

export interface WinProbability {
  home: number;
  draw: number;
  away: number;
}

export interface LineupPlayer {
  number: number;
  name: string;
  scored?: boolean;
}

export interface TeamLineup {
  formation: string;
  starters: LineupPlayer[];
  bench: LineupPlayer[];
}

export interface MatchLineup {
  home: TeamLineup;
  away: TeamLineup;
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

export interface MatchDetails extends LiveMatch {
  venue: string;
  stats: MatchStatItem[];
  winProbability?: WinProbability;
  lineup?: MatchLineup;
}
