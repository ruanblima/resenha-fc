import { render, screen } from '@testing-library/react-native';
import React from 'react';

import { mockMatchDetails } from '../../../mocks/matchDetails';
import { MatchLineupsPanel } from '../MatchLineupsPanel';

const match = mockMatchDetails[0];
const lineup = match.lineup!;

describe('MatchLineupsPanel', () => {
  it('exibe os nomes dos times', () => {
    render(
      <MatchLineupsPanel
        lineup={lineup}
        homeTeam={match.homeTeam}
        awayTeam={match.awayTeam}
      />
    );
    expect(screen.getByText('BRASIL')).toBeTruthy();
    expect(screen.getByText('FRANÇA')).toBeTruthy();
  });

  it('exibe as formações táticas', () => {
    render(
      <MatchLineupsPanel
        lineup={lineup}
        homeTeam={match.homeTeam}
        awayTeam={match.awayTeam}
      />
    );
    expect(screen.getByText('4-3-3')).toBeTruthy();
    expect(screen.getByText('4-2-3-1')).toBeTruthy();
  });

  it('exibe jogadores titulares do time da casa', () => {
    render(
      <MatchLineupsPanel
        lineup={lineup}
        homeTeam={match.homeTeam}
        awayTeam={match.awayTeam}
      />
    );
    expect(screen.getByText('Alisson')).toBeTruthy();
    expect(screen.getByText('Marquinhos')).toBeTruthy();
    expect(screen.getAllByText('Vinícius Jr.').length).toBeGreaterThan(0);
  });

  it('exibe jogadores titulares do time visitante', () => {
    render(
      <MatchLineupsPanel
        lineup={lineup}
        homeTeam={match.homeTeam}
        awayTeam={match.awayTeam}
      />
    );
    expect(screen.getByText('Maignan')).toBeTruthy();
    expect(screen.getAllByText('Mbappé').length).toBeGreaterThan(0);
  });

  it('exibe os reservas', () => {
    render(
      <MatchLineupsPanel
        lineup={lineup}
        homeTeam={match.homeTeam}
        awayTeam={match.awayTeam}
      />
    );
    expect(screen.getAllByText('RESERVAS').length).toBe(2);
    expect(screen.getByText('Ederson (GK)')).toBeTruthy();
    expect(screen.getByText('Giroud')).toBeTruthy();
  });

  it('exibe o número da camisa dos jogadores', () => {
    render(
      <MatchLineupsPanel
        lineup={lineup}
        homeTeam={match.homeTeam}
        awayTeam={match.awayTeam}
      />
    );
    expect(screen.getByText('1')).toBeTruthy();
    expect(screen.getByText('16')).toBeTruthy();
  });
});
