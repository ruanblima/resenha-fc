import { render, screen } from '@testing-library/react-native';
import React from 'react';

import { mockMatchDetails } from '../../../mocks/matchDetails';
import { MatchScoreboardHero } from '../MatchScoreboardHero';

const match = mockMatchDetails[0]; // BRA 2x1 FRA, 72'

describe('MatchScoreboardHero', () => {
  it('exibe as siglas dos dois times', () => {
    render(<MatchScoreboardHero match={match} />);
    expect(screen.getByText('BRA')).toBeTruthy();
    expect(screen.getByText('FRA')).toBeTruthy();
  });

  it('exibe o placar do time da casa', () => {
    render(<MatchScoreboardHero match={match} />);
    expect(screen.getByText('2')).toBeTruthy();
  });

  it('exibe o placar do time visitante', () => {
    render(<MatchScoreboardHero match={match} />);
    expect(screen.getByText('1')).toBeTruthy();
  });

  it('exibe o badge LIVE com o minuto', () => {
    render(<MatchScoreboardHero match={match} />);
    expect(screen.getByText("72'")).toBeTruthy();
    expect(screen.getByText('LIVE')).toBeTruthy();
  });

  it('exibe a fase e o estádio', () => {
    render(<MatchScoreboardHero match={match} />);
    expect(screen.getByText('SEMIFINAL • Estádio Lusail')).toBeTruthy();
  });

  it('exibe os nomes dos artilheiros da casa', () => {
    render(<MatchScoreboardHero match={match} />);
    expect(screen.getAllByText("Vinícius Jr. 24'").length).toBeGreaterThanOrEqual(1);
  });

  it('exibe os artilheiros do time visitante', () => {
    render(<MatchScoreboardHero match={match} />);
    expect(screen.getByText("Mbappé 41'")).toBeTruthy();
  });
});
