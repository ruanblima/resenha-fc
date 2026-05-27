import { render, screen } from '@testing-library/react-native';
import React from 'react';

import { mockNewsItems } from '../../../mocks/home';
import type { MatchSummary } from '../../../types/api';
import { HomeScreen } from '../HomeScreen';

const mockLiveMatch: MatchSummary = {
  id: 1,
  competitionId: 'wc2026',
  status: 'live',
  stage: 'Semifinal',
  minute: 72,
  homeTeam: { id: 6, name: 'Brasil', shortName: 'BRA', flagUrl: 'https://flagcdn.com/w80/br.png' },
  awayTeam: { id: 2, name: 'França', shortName: 'FRA', flagUrl: 'https://flagcdn.com/w80/fr.png' },
  homeScore: 2,
  awayScore: 1,
};

const mockUpcomingMatch: MatchSummary = {
  id: 2,
  competitionId: 'wc2026',
  status: 'upcoming',
  stage: 'Semifinal',
  startTime: '20:00',
  homeTeam: { id: 9, name: 'Espanha', shortName: 'ESP', flagUrl: 'https://flagcdn.com/w80/es.png' },
  awayTeam: { id: 11, name: 'Alemanha', shortName: 'GER', flagUrl: 'https://flagcdn.com/w80/de.png' },
};

describe('HomeScreen', () => {
  it('exibe a seção "AO VIVO AGORA" quando há jogos ao vivo', () => {
    render(
      <HomeScreen
        live={[mockLiveMatch]}
        upcoming={[]}
        newsItems={[]}
      />
    );
    expect(screen.getByText('AO VIVO AGORA')).toBeTruthy();
  });

  it('não exibe a seção "AO VIVO AGORA" quando não há jogos ao vivo', () => {
    render(
      <HomeScreen
        live={[]}
        upcoming={[]}
        newsItems={[]}
      />
    );
    expect(screen.queryByText('AO VIVO AGORA')).toBeNull();
  });

  it('exibe a seção "JOGOS DE HOJE" quando há jogos do dia', () => {
    render(
      <HomeScreen
        live={[]}
        upcoming={[mockUpcomingMatch]}
        newsItems={[]}
      />
    );
    expect(screen.getByText('JOGOS DE HOJE')).toBeTruthy();
  });

  it('não exibe a seção "JOGOS DE HOJE" quando não há jogos', () => {
    render(
      <HomeScreen
        live={[]}
        upcoming={[]}
        newsItems={[]}
      />
    );
    expect(screen.queryByText('JOGOS DE HOJE')).toBeNull();
  });

  it('exibe os times do jogo ao vivo', () => {
    render(
      <HomeScreen
        live={[mockLiveMatch]}
        upcoming={[]}
        newsItems={[]}
      />
    );
    expect(screen.getByText('BRA')).toBeTruthy();
    expect(screen.getByText('FRA')).toBeTruthy();
  });

  it('exibe os times do jogo de hoje', () => {
    render(
      <HomeScreen
        live={[]}
        upcoming={[mockUpcomingMatch]}
        newsItems={[]}
      />
    );
    expect(screen.getByText('ESP')).toBeTruthy();
    expect(screen.getByText('GER')).toBeTruthy();
  });

  it('exibe a seção de notícias', () => {
    render(
      <HomeScreen
        live={[]}
        upcoming={[]}
        newsItems={mockNewsItems}
      />
    );
    expect(screen.getByText('NOTÍCIAS')).toBeTruthy();
    expect(screen.getByText('EDITORIAL')).toBeTruthy();
  });

  it('exibe o card "Explorar o Hub"', () => {
    render(
      <HomeScreen
        live={[]}
        upcoming={[]}
        newsItems={[]}
      />
    );
    expect(screen.getByText('Copa do Mundo 2026')).toBeTruthy();
  });
});
