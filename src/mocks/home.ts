import type { Competition, CountryLeagues, MatchDayItem, NewsItem } from '../types/home';

export const mockCompetitions: Competition[] = [
  { id: 'wc2026', name: 'Copa do Mundo 2026', category: 'Fase de Grupos', icon: 'emoji-events', region: 'Americas', location: 'EUA, Canadá & México', isActive: true },
  { id: 'ucl', name: 'Champions League', category: 'Fase de Liga', icon: 'star', region: 'Europe', location: 'Europa' },
  { id: 'pl', name: 'Premier League', category: 'Top Flight', icon: 'sports-soccer', region: 'England', location: 'Inglaterra', isLive: true },
  { id: 'euro2024', name: 'Euro 2024', category: 'Fase de Grupos', icon: 'flag', region: 'Europe', location: 'Europa' },
  { id: 'brasileirao', name: 'Brasileirão Série A', category: 'Campeonato Brasileiro', icon: 'sports-soccer', region: 'Brazil', location: 'Brasil' },
  { id: 'serie-b', name: 'Brasileirão Série B', category: 'Campeonato Brasileiro', icon: 'sports-soccer', region: 'Brazil', location: 'Brasil' },
];

export const mockCountryLeagues: CountryLeagues[] = [
  {
    id: 'brazil',
    name: 'Brasil',
    leagues: [
      { id: 'brasileirao', name: 'Série A', icon: 'sports-soccer' },
      { id: 'serie-b', name: 'Série B', icon: 'sports-soccer' },
      { id: 'copa-brasil', name: 'Copa do Brasil', icon: 'emoji-events' },
    ],
  },
  {
    id: 'england',
    name: 'Inglaterra',
    leagues: [
      { id: 'pl', name: 'Premier League', icon: 'verified', isFeatured: true },
      { id: 'fa-cup', name: 'FA Cup', icon: 'emoji-events' },
      { id: 'efl-cup', name: 'EFL Cup', icon: 'sports-soccer' },
    ],
  },
  {
    id: 'spain',
    name: 'Espanha',
    leagues: [
      { id: 'la-liga', name: 'La Liga', icon: 'sports-soccer' },
      { id: 'copa-del-rey', name: 'Copa del Rey', icon: 'emoji-events' },
    ],
  },
  {
    id: 'italy',
    name: 'Itália',
    leagues: [
      { id: 'serie-a-it', name: 'Serie A', icon: 'sports-soccer' },
      { id: 'coppa-italia', name: 'Coppa Italia', icon: 'emoji-events' },
    ],
  },
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
