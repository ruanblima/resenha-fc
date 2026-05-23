export interface MatchTeam {
  id: number;
  name: string;
  shortName: string;
  flagUrl: string;
}

export type MatchStatus = 'live' | 'upcoming' | 'finished';

export interface MatchSummary {
  id: number;
  competitionId: string;
  status: MatchStatus;
  stage: string;
  homeTeam: MatchTeam;
  awayTeam: MatchTeam;
  homeScore?: number;
  awayScore?: number;
  minute?: number;
  startTime?: string;
  venue?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    total: number;
    hasNextPage: boolean;
  };
}
