import { render, screen } from '@testing-library/react-native';
import React from 'react';

import { mockScorers } from '../../../mocks/stats';
import { TopPlayerCard } from '../TopPlayerCard';

const player = mockScorers[0]; // L. Messi, 7 gols

describe('TopPlayerCard', () => {
  it('exibe o número 1 como watermark', () => {
    render(<TopPlayerCard player={player} rank={1} statLabel="GOLS" />);
    expect(screen.getByTestId('rank-watermark')).toBeTruthy();
  });

  it('exibe o nome do jogador', () => {
    render(<TopPlayerCard player={player} rank={1} statLabel="GOLS" />);
    expect(screen.getByText('L. Messi')).toBeTruthy();
  });

  it('exibe o país do jogador', () => {
    render(<TopPlayerCard player={player} rank={1} statLabel="GOLS" />);
    expect(screen.getByText('Argentina')).toBeTruthy();
  });

  it('exibe a posição e partidas', () => {
    render(<TopPlayerCard player={player} rank={1} statLabel="GOLS" />);
    expect(screen.getByText('Atacante · Partidas: 5')).toBeTruthy();
  });

  it('exibe o label da estatística', () => {
    render(<TopPlayerCard player={player} rank={1} statLabel="GOLS" />);
    expect(screen.getByText('GOLS')).toBeTruthy();
  });

  it('exibe o valor da estatística', () => {
    render(<TopPlayerCard player={player} rank={1} statLabel="GOLS" />);
    expect(screen.getByText('7')).toBeTruthy();
  });
});
