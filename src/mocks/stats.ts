import type { GroupStanding, PlayerStat } from '../types/stats';

export const mockScorers: PlayerStat[] = [
  {
    id: '1',
    name: 'L. Messi',
    country: 'Argentina',
    position: 'Atacante',
    matchesPlayed: 5,
    value: 7,
  },
  {
    id: '2',
    name: 'K. Mbappé',
    country: 'França',
    position: 'Atacante',
    matchesPlayed: 5,
    value: 6,
  },
  {
    id: '3',
    name: 'J. Álvarez',
    country: 'Argentina',
    position: 'Atacante',
    matchesPlayed: 5,
    value: 4,
  },
  {
    id: '4',
    name: 'O. Giroud',
    country: 'França',
    position: 'Atacante',
    matchesPlayed: 5,
    value: 4,
  },
];

export const mockAssists: PlayerStat[] = [
  {
    id: '1',
    name: 'K. De Bruyne',
    country: 'Bélgica',
    position: 'Meio-campo',
    matchesPlayed: 4,
    value: 5,
  },
  {
    id: '2',
    name: 'L. Messi',
    country: 'Argentina',
    position: 'Atacante',
    matchesPlayed: 5,
    value: 4,
  },
  {
    id: '3',
    name: 'T. Müller',
    country: 'Alemanha',
    position: 'Meio-campo',
    matchesPlayed: 4,
    value: 3,
  },
  {
    id: '4',
    name: 'L. Modrić',
    country: 'Croácia',
    position: 'Meio-campo',
    matchesPlayed: 4,
    value: 3,
  },
];

export const mockCards: PlayerStat[] = [
  {
    id: '1',
    name: 'S. Dest',
    country: 'EUA',
    position: 'Lateral',
    matchesPlayed: 4,
    value: 3,
  },
  {
    id: '2',
    name: 'W. Fofana',
    country: 'França',
    position: 'Zagueiro',
    matchesPlayed: 5,
    value: 2,
  },
  {
    id: '3',
    name: 'A. Witsel',
    country: 'Bélgica',
    position: 'Meio-campo',
    matchesPlayed: 4,
    value: 2,
  },
  {
    id: '4',
    name: 'G. Magallán',
    country: 'Argentina',
    position: 'Zagueiro',
    matchesPlayed: 3,
    value: 2,
  },
];

export const mockGroupStanding: GroupStanding = {
  group: 'C',
  teams: [
    { shortName: 'ARG', played: 3, goalDiff: 3, points: 6, qualified: true },
    { shortName: 'POL', played: 3, goalDiff: 0, points: 4, qualified: true },
    { shortName: 'MEX', played: 3, goalDiff: -1, points: 4, qualified: false },
    { shortName: 'KSA', played: 3, goalDiff: -2, points: 3, qualified: false },
  ],
};

export const statCategoryLabels: Record<string, string> = {
  scorers: 'ARTILHEIROS',
  assists: 'ASSISTÊNCIAS',
  cards: 'CARTÕES',
};

export const statValueLabel: Record<string, string> = {
  scorers: 'GOLS',
  assists: 'ASSIST.',
  cards: 'CARTÕES',
};
