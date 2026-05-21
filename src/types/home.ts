import type { Team } from './match';

export interface Competition {
  id: string;
  name: string;
  category: string;
  icon: string;
  isActive?: boolean;
  isLive?: boolean;
}

export interface MatchDayItem {
  id: number;
  status: 'live' | 'upcoming' | 'finished';
  stage: string;
  homeTeam: Team;
  awayTeam: Team;
  homeScore?: number;
  awayScore?: number;
  minute?: number;
  startTime?: string;
}

export interface NewsItem {
  id: string;
  category: string;
  publishedAt: string;
  title: string;
  excerpt: string;
  imageUrl: string;
}
