import type { Competition, MatchDayItem, NewsItem } from '../types/home';

export const mockCompetitions: Competition[] = [
  { id: 'wc2026', name: 'Copa do Mundo 2026', category: 'Global Stage', icon: 'public', isActive: true },
  { id: 'ucl', name: 'Champions League', category: 'Club Elite', icon: 'star' },
  { id: 'pl', name: 'Premier League', category: 'Top Flight', icon: 'sports-soccer', isLive: true },
  { id: 'euro2024', name: 'Euro 2024', category: 'Europa', icon: 'flag' },
];

export const mockMatchDayItems: MatchDayItem[] = [
  {
    id: 1,
    status: 'live',
    stage: 'SEMIFINAL',
    minute: 72,
    homeTeam: {
      id: 6,
      name: 'Brasil',
      shortName: 'BRA',
      flagUrl: 'https://media.api-sports.io/flags/br.svg',
    },
    awayTeam: {
      id: 26,
      name: 'Argentina',
      shortName: 'ARG',
      flagUrl: 'https://media.api-sports.io/flags/ar.svg',
    },
    homeScore: 2,
    awayScore: 1,
  },
  {
    id: 2,
    status: 'upcoming',
    stage: 'SEMIFINAL',
    startTime: '20:00',
    homeTeam: {
      id: 2,
      name: 'França',
      shortName: 'FRA',
      flagUrl: 'https://media.api-sports.io/flags/fr.svg',
    },
    awayTeam: {
      id: 9,
      name: 'Espanha',
      shortName: 'ESP',
      flagUrl: 'https://media.api-sports.io/flags/es.svg',
    },
  },
];

export const mockNewsItems: NewsItem[] = [
  {
    id: '1',
    category: 'EDITORIAL',
    publishedAt: '2 HRS AGO',
    title: 'A REVOLUÇÃO TÁTICA QUE ESTÁ REMODELANDO AS QUARTAS DE FINAL',
    excerpt:
      'Formações fluidas e pressão alta estão transformando as estratégias defensivas nesta Copa do Mundo.',
    imageUrl: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=800',
  },
  {
    id: '2',
    category: 'ANÁLISE',
    publishedAt: '5 HRS AGO',
    title: 'OS ARTILHEIROS QUE PODEM DEFINIR O TÍTULO',
    excerpt: 'Confira os atacantes com melhor desempenho no torneio até agora.',
    imageUrl: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800',
  },
];
