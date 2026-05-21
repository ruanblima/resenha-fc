import { render, screen } from '@testing-library/react-native';
import React from 'react';

import { mockMatchDetails } from '../../../mocks/matchDetails';
import { WinProbabilityCard } from '../WinProbabilityCard';

const match = mockMatchDetails[0]; // BRA 78%, EMPATE 15%, FRA 7%

describe('WinProbabilityCard', () => {
  it('exibe o título', () => {
    render(
      <WinProbabilityCard
        probability={match.winProbability!}
        homeShortName={match.homeTeam.shortName}
        awayShortName={match.awayTeam.shortName}
      />
    );
    expect(screen.getByText('PROBABILIDADE DE VITÓRIA')).toBeTruthy();
  });

  it('exibe a probabilidade do time da casa', () => {
    render(
      <WinProbabilityCard
        probability={match.winProbability!}
        homeShortName={match.homeTeam.shortName}
        awayShortName={match.awayTeam.shortName}
      />
    );
    expect(screen.getByText('78%')).toBeTruthy();
    expect(screen.getByText('BRA')).toBeTruthy();
  });

  it('exibe a probabilidade de empate', () => {
    render(
      <WinProbabilityCard
        probability={match.winProbability!}
        homeShortName={match.homeTeam.shortName}
        awayShortName={match.awayTeam.shortName}
      />
    );
    expect(screen.getByText('15%')).toBeTruthy();
    expect(screen.getByText('EMPATE')).toBeTruthy();
  });

  it('exibe a probabilidade do time visitante', () => {
    render(
      <WinProbabilityCard
        probability={match.winProbability!}
        homeShortName={match.homeTeam.shortName}
        awayShortName={match.awayTeam.shortName}
      />
    );
    expect(screen.getByText('7%')).toBeTruthy();
    expect(screen.getByText('FRA')).toBeTruthy();
  });
});
