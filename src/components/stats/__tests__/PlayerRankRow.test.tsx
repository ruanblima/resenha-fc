import { render, screen } from '@testing-library/react-native';
import React from 'react';

import { mockScorers } from '../../../mocks/stats';
import { PlayerRankRow } from '../PlayerRankRow';

const player = mockScorers[1]; // K. Mbappé, 6 gols

describe('PlayerRankRow', () => {
  it('exibe o número do ranking', () => {
    render(<PlayerRankRow player={player} rank={2} />);
    expect(screen.getByText('2')).toBeTruthy();
  });

  it('exibe o nome do jogador', () => {
    render(<PlayerRankRow player={player} rank={2} />);
    expect(screen.getByText('K. Mbappé')).toBeTruthy();
  });

  it('exibe o país do jogador', () => {
    render(<PlayerRankRow player={player} rank={2} />);
    expect(screen.getByText('França')).toBeTruthy();
  });

  it('exibe o valor da estatística', () => {
    render(<PlayerRankRow player={player} rank={2} />);
    expect(screen.getByText('6')).toBeTruthy();
  });
});
