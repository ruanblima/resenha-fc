import type { LiveMatch } from '../types/match';

export const mockLiveMatches: LiveMatch[] = [
  {
    id: 1,
    status: 'live',
    minute: 75,
    competition: 'Copa do Mundo FIFA',
    stage: 'FINAL',
    homeTeam: {
      id: 26,
      name: 'Argentina',
      shortName: 'ARG',
      flagUrl: 'https://media.api-sports.io/flags/ar.svg',
    },
    awayTeam: {
      id: 2,
      name: 'França',
      shortName: 'FRA',
      flagUrl: 'https://media.api-sports.io/flags/fr.svg',
    },
    homeScore: 2,
    awayScore: 1,
    events: [
      { minute: 23, type: 'goal', team: 'home', playerName: 'Di María' },
      { minute: 36, type: 'goal', team: 'home', playerName: 'Messi' },
      { minute: 55, type: 'goal', team: 'away', playerName: 'Mbappé' },
    ],
  },
  {
    id: 2,
    status: 'live',
    minute: 12,
    competition: 'Copa do Mundo FIFA',
    stage: 'SEMIFINAL',
    homeTeam: {
      id: 6,
      name: 'Brasil',
      shortName: 'BRA',
      flagUrl: 'https://media.api-sports.io/flags/br.svg',
    },
    awayTeam: {
      id: 5,
      name: 'Alemanha',
      shortName: 'GER',
      flagUrl: 'https://media.api-sports.io/flags/de.svg',
    },
    homeScore: 0,
    awayScore: 1,
    events: [{ minute: 8, type: 'goal', team: 'away', playerName: 'Müller' }],
  },
  {
    id: 3,
    status: 'live',
    minute: 45,
    competition: 'Copa do Mundo FIFA',
    stage: 'QUARTAS DE FINAL',
    homeTeam: {
      id: 9,
      name: 'Espanha',
      shortName: 'ESP',
      flagUrl: 'https://media.api-sports.io/flags/es.svg',
    },
    awayTeam: {
      id: 10,
      name: 'Inglaterra',
      shortName: 'ENG',
      flagUrl: 'https://media.api-sports.io/flags/gb-eng.svg',
    },
    homeScore: 1,
    awayScore: 1,
    events: [
      { minute: 22, type: 'goal', team: 'home', playerName: 'Yamal' },
      { minute: 41, type: 'goal', team: 'away', playerName: 'Kane' },
    ],
  },
];
