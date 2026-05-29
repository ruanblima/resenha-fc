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
  /** Penalty shootout score — only present when the match was decided by penalties */
  penaltyHomeScore?: number;
  penaltyAwayScore?: number;
  minute?: number;
  startTime?: string;
  /** ISO date YYYY-MM-DD */
  date?: string;
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

export interface BracketRound {
  name: string;
  matches: MatchSummary[];
}

export interface BracketData {
  rounds: BracketRound[];
}

export interface NewsArticle {
  id: string;
  title: string;
  excerpt: string;
  imageUrl: string | null;
  url: string;
  source: string;
  publishedAt: string;   // ISO 8601
  publishedAgo: string;  // "2h atrás", "3 dias atrás"
}
