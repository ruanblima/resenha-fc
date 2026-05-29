import type { MatchSummary } from '../types/api';
import type { Competition, CountryLeagues, MatchDayItem, NewsItem } from '../types/home';
import type { CompetitionStandings } from '../types/standings';

export const mockCompetitions: Competition[] = [
  { id: 'wc2026',             name: 'Copa do Mundo 2026',  category: 'Fase de Grupos',  icon: 'emoji-events', region: 'Americas', location: 'EUA, Canadá & México', isActive: true },
  { id: 'ucl',                name: 'Champions League',    category: 'Fase de Liga',    icon: 'star',         region: 'Europa',   location: 'Europa' },
  { id: 'libertadores',       name: 'Copa Libertadores',   category: 'Fase de Grupos',  icon: 'emoji-events', region: 'América',  location: 'América do Sul' },
  { id: 'europa-league',      name: 'Liga Europa',         category: 'Fase de Liga',    icon: 'star',         region: 'Europa',   location: 'Europa' },
  { id: 'sul-americana',      name: 'Copa Sul-Americana',  category: 'Fase de Grupos',  icon: 'emoji-events', region: 'América',  location: 'América do Sul' },
  { id: 'conference-league',  name: 'Conference League',   category: 'Fase de Liga',    icon: 'star',         region: 'Europa',   location: 'Europa' },
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

export const mockLiveMatches: MatchSummary[] = [
  {
    id: 101,
    competitionId: 'wc2026',
    status: 'live',
    stage: 'Semifinal',
    minute: 72,
    homeTeam: { id: 6, name: 'Brasil', shortName: 'BRA', flagUrl: 'https://flagcdn.com/w80/br.png' },
    awayTeam: { id: 2, name: 'França', shortName: 'FRA', flagUrl: 'https://flagcdn.com/w80/fr.png' },
    homeScore: 2,
    awayScore: 1,
  },
  {
    id: 102,
    competitionId: 'wc2026',
    status: 'live',
    stage: 'Semifinal',
    minute: 38,
    homeTeam: { id: 9, name: 'Espanha', shortName: 'ESP', flagUrl: 'https://flagcdn.com/w80/es.png' },
    awayTeam: { id: 11, name: 'Alemanha', shortName: 'GER', flagUrl: 'https://flagcdn.com/w80/de.png' },
    homeScore: 0,
    awayScore: 0,
  },
];

export const mockTodayMatches: MatchSummary[] = [
  {
    id: 201,
    competitionId: 'wc2026',
    status: 'upcoming',
    stage: 'Grupo A',
    startTime: '16:00',
    homeTeam: { id: 3, name: 'Portugal', shortName: 'POR', flagUrl: 'https://flagcdn.com/w80/pt.png' },
    awayTeam: { id: 7, name: 'Marrocos', shortName: 'MAR', flagUrl: 'https://flagcdn.com/w80/ma.png' },
  },
  {
    id: 202,
    competitionId: 'wc2026',
    status: 'upcoming',
    stage: 'Grupo B',
    startTime: '20:00',
    homeTeam: { id: 4, name: 'Inglaterra', shortName: 'ENG', flagUrl: 'https://flagcdn.com/w80/gb-eng.png' },
    awayTeam: { id: 5, name: 'Argentina', shortName: 'ARG', flagUrl: 'https://flagcdn.com/w80/ar.png' },
  },
  {
    id: 203,
    competitionId: 'wc2026',
    status: 'upcoming',
    stage: 'Grupo C',
    startTime: '22:00',
    homeTeam: { id: 8, name: 'Holanda', shortName: 'NED', flagUrl: 'https://flagcdn.com/w80/nl.png' },
    awayTeam: { id: 10, name: 'Croácia', shortName: 'CRO', flagUrl: 'https://flagcdn.com/w80/hr.png' },
  },
];

export const mockGroupStandings: CompetitionStandings = {
  type: 'groups',
  groups: [
    {
      name: 'Grupo A',
      entries: [
        { rank: 1, team: { id: 1, name: 'Brasil', shortName: 'BRA', imageUrl: 'https://flagcdn.com/w80/br.png' }, points: 9, played: 3, won: 3, drawn: 0, lost: 0, goalsFor: 7, goalsAgainst: 2, goalDiff: 5, zone: 'qualify' },
        { rank: 2, team: { id: 2, name: 'Sérvia', shortName: 'SRB', imageUrl: 'https://flagcdn.com/w80/rs.png' }, points: 6, played: 3, won: 2, drawn: 0, lost: 1, goalsFor: 5, goalsAgainst: 3, goalDiff: 2, zone: 'qualify' },
        { rank: 3, team: { id: 3, name: 'Suíça', shortName: 'SUI', imageUrl: 'https://flagcdn.com/w80/ch.png' }, points: 3, played: 3, won: 1, drawn: 0, lost: 2, goalsFor: 3, goalsAgainst: 5, goalDiff: -2, zone: null },
        { rank: 4, team: { id: 4, name: 'Camarões', shortName: 'CMR', imageUrl: 'https://flagcdn.com/w80/cm.png' }, points: 1, played: 3, won: 0, drawn: 1, lost: 2, goalsFor: 2, goalsAgainst: 7, goalDiff: -5, zone: null },
      ],
    },
    {
      name: 'Grupo B',
      entries: [
        { rank: 1, team: { id: 5, name: 'Inglaterra', shortName: 'ENG', imageUrl: 'https://flagcdn.com/w80/gb-eng.png' }, points: 7, played: 3, won: 2, drawn: 1, lost: 0, goalsFor: 6, goalsAgainst: 2, goalDiff: 4, zone: 'qualify' },
        { rank: 2, team: { id: 6, name: 'EUA', shortName: 'USA', imageUrl: 'https://flagcdn.com/w80/us.png' }, points: 5, played: 3, won: 1, drawn: 2, lost: 0, goalsFor: 4, goalsAgainst: 2, goalDiff: 2, zone: 'qualify' },
        { rank: 3, team: { id: 7, name: 'Irã', shortName: 'IRN', imageUrl: 'https://flagcdn.com/w80/ir.png' }, points: 3, played: 3, won: 1, drawn: 0, lost: 2, goalsFor: 4, goalsAgainst: 7, goalDiff: -3, zone: null },
        { rank: 4, team: { id: 8, name: 'País de Gales', shortName: 'WAL', imageUrl: 'https://flagcdn.com/w80/gb-wls.png' }, points: 1, played: 3, won: 0, drawn: 1, lost: 2, goalsFor: 1, goalsAgainst: 4, goalDiff: -3, zone: null },
      ],
    },
    {
      name: 'Grupo C',
      entries: [
        { rank: 1, team: { id: 9, name: 'Argentina', shortName: 'ARG', imageUrl: 'https://flagcdn.com/w80/ar.png' }, points: 6, played: 3, won: 2, drawn: 0, lost: 1, goalsFor: 5, goalsAgainst: 2, goalDiff: 3, zone: 'qualify' },
        { rank: 2, team: { id: 10, name: 'Polônia', shortName: 'POL', imageUrl: 'https://flagcdn.com/w80/pl.png' }, points: 4, played: 3, won: 1, drawn: 1, lost: 1, goalsFor: 3, goalsAgainst: 3, goalDiff: 0, zone: 'qualify' },
        { rank: 3, team: { id: 11, name: 'México', shortName: 'MEX', imageUrl: 'https://flagcdn.com/w80/mx.png' }, points: 4, played: 3, won: 1, drawn: 1, lost: 1, goalsFor: 2, goalsAgainst: 3, goalDiff: -1, zone: null },
        { rank: 4, team: { id: 12, name: 'Arábia Saudita', shortName: 'KSA', imageUrl: 'https://flagcdn.com/w80/sa.png' }, points: 3, played: 3, won: 1, drawn: 0, lost: 2, goalsFor: 3, goalsAgainst: 4, goalDiff: -1, zone: null },
      ],
    },
    {
      name: 'Grupo D',
      entries: [
        { rank: 1, team: { id: 13, name: 'França', shortName: 'FRA', imageUrl: 'https://flagcdn.com/w80/fr.png' }, points: 6, played: 3, won: 2, drawn: 0, lost: 1, goalsFor: 6, goalsAgainst: 3, goalDiff: 3, zone: 'qualify' },
        { rank: 2, team: { id: 14, name: 'Austrália', shortName: 'AUS', imageUrl: 'https://flagcdn.com/w80/au.png' }, points: 6, played: 3, won: 2, drawn: 0, lost: 1, goalsFor: 5, goalsAgainst: 4, goalDiff: 1, zone: 'qualify' },
        { rank: 3, team: { id: 15, name: 'Tunísia', shortName: 'TUN', imageUrl: 'https://flagcdn.com/w80/tn.png' }, points: 4, played: 3, won: 1, drawn: 1, lost: 1, goalsFor: 3, goalsAgainst: 4, goalDiff: -1, zone: null },
        { rank: 4, team: { id: 16, name: 'Dinamarca', shortName: 'DEN', imageUrl: 'https://flagcdn.com/w80/dk.png' }, points: 1, played: 3, won: 0, drawn: 1, lost: 2, goalsFor: 1, goalsAgainst: 4, goalDiff: -3, zone: null },
      ],
    },
  ],
};

export const mockNewsItems: NewsItem[] = [
  {
    id: '1',
    category: 'EDITORIAL',
    publishedAt: '2 HRS AGO',
    readTime: '4 MIN',
    title: 'A REVOLUÇÃO TÁTICA QUE ESTÁ REMODELANDO AS QUARTAS DE FINAL',
    excerpt:
      'Formações fluidas e pressão alta estão transformando as estratégias defensivas nesta Copa do Mundo.',
    imageUrl: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=800',
  },
  {
    id: '2',
    category: 'ANÁLISE',
    publishedAt: '5 HRS AGO',
    readTime: '2 MIN',
    title: 'OS ARTILHEIROS QUE PODEM DEFINIR O TÍTULO',
    excerpt: 'Confira os atacantes com melhor desempenho no torneio até agora.',
    imageUrl: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800',
  },
  {
    id: '3',
    category: 'ÚLTIMAS',
    publishedAt: '8 HRS AGO',
    readTime: '3 MIN',
    title: 'BRASIL DEFINE ESTRATÉGIA PARA O MATA-MATA',
    excerpt: 'Comissão técnica trabalha em ajustes táticos após fase de grupos.',
    imageUrl: 'https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?w=800',
  },
];
