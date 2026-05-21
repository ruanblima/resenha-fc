import { render, screen } from '@testing-library/react-native';
import React from 'react';

import { mockMatchDetails } from '../../../mocks/matchDetails';
import { MatchStatsPanel } from '../MatchStatsPanel';

const match = mockMatchDetails[0];

describe('MatchStatsPanel', () => {
  it('exibe o título da seção', () => {
    render(
      <MatchStatsPanel
        stats={match.stats}
        homeShortName={match.homeTeam.shortName}
        awayShortName={match.awayTeam.shortName}
      />
    );
    expect(screen.getByText('ESTATÍSTICAS PRINCIPAIS')).toBeTruthy();
  });

  it('exibe os labels das estatísticas', () => {
    render(
      <MatchStatsPanel
        stats={match.stats}
        homeShortName={match.homeTeam.shortName}
        awayShortName={match.awayTeam.shortName}
      />
    );
    expect(screen.getByText('Posse de Bola')).toBeTruthy();
    expect(screen.getByText('Finalizações')).toBeTruthy();
    expect(screen.getByText('Faltas')).toBeTruthy();
  });

  it('exibe os valores do time da casa', () => {
    render(
      <MatchStatsPanel
        stats={match.stats}
        homeShortName={match.homeTeam.shortName}
        awayShortName={match.awayTeam.shortName}
      />
    );
    expect(screen.getByText('58%')).toBeTruthy();
    expect(screen.getByText('14')).toBeTruthy();
  });

  it('exibe os valores do time visitante', () => {
    render(
      <MatchStatsPanel
        stats={match.stats}
        homeShortName={match.homeTeam.shortName}
        awayShortName={match.awayTeam.shortName}
      />
    );
    expect(screen.getByText('42%')).toBeTruthy();
    expect(screen.getByText('8')).toBeTruthy();
  });
});
