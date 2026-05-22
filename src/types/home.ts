import type MaterialIconsType from '@expo/vector-icons/MaterialIcons';
import type { ComponentProps } from 'react';
import type { Team } from './match';

export type MaterialIconName = ComponentProps<typeof MaterialIconsType>['name'];

export interface Competition {
  id: string;
  name: string;
  category: string;
  icon: MaterialIconName;
  region?: string;
  isActive?: boolean;
  isLive?: boolean;
}

export interface League {
  id: string;
  name: string;
  icon: MaterialIconName;
  isFeatured?: boolean;
}

export interface CountryLeagues {
  id: string;
  name: string;
  leagues: League[];
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
  venue?: string;
}

export interface CompetitionMatch extends MatchDayItem {
  competitionId: string;
}

export interface NewsItem {
  id: string;
  category: string;
  publishedAt: string;
  title: string;
  excerpt: string;
  imageUrl: string;
}
