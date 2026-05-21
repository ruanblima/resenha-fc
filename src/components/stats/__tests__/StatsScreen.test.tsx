import { fireEvent, render, screen } from '@testing-library/react-native';
import React from 'react';

import { mockGroupStanding, mockScorers } from '../../../mocks/stats';
import { StatsScreen } from '../StatsScreen';

describe('StatsScreen', () => {
  it('exibe o título da página', () => {
    render(
      <StatsScreen
        players={mockScorers}
        selectedCategory="scorers"
        onSelectCategory={jest.fn()}
        groupStanding={mockGroupStanding}
        statLabel="GOLS"
      />
    );
    expect(screen.getByText('Estatísticas')).toBeTruthy();
  });

  it('exibe as abas de categoria', () => {
    render(
      <StatsScreen
        players={mockScorers}
        selectedCategory="scorers"
        onSelectCategory={jest.fn()}
        groupStanding={mockGroupStanding}
        statLabel="GOLS"
      />
    );
    expect(screen.getByText('ARTILHEIROS')).toBeTruthy();
    expect(screen.getByText('ASSISTÊNCIAS')).toBeTruthy();
    expect(screen.getByText('CARTÕES')).toBeTruthy();
  });

  it('exibe o jogador destaque (rank 1)', () => {
    render(
      <StatsScreen
        players={mockScorers}
        selectedCategory="scorers"
        onSelectCategory={jest.fn()}
        groupStanding={mockGroupStanding}
        statLabel="GOLS"
      />
    );
    expect(screen.getByText('L. Messi')).toBeTruthy();
    expect(screen.getByText('7')).toBeTruthy();
  });

  it('exibe os demais jogadores no ranking', () => {
    render(
      <StatsScreen
        players={mockScorers}
        selectedCategory="scorers"
        onSelectCategory={jest.fn()}
        groupStanding={mockGroupStanding}
        statLabel="GOLS"
      />
    );
    expect(screen.getByText('K. Mbappé')).toBeTruthy();
    expect(screen.getByText('J. Álvarez')).toBeTruthy();
    expect(screen.getByText('O. Giroud')).toBeTruthy();
  });

  it('exibe a tabela de classificação do grupo', () => {
    render(
      <StatsScreen
        players={mockScorers}
        selectedCategory="scorers"
        onSelectCategory={jest.fn()}
        groupStanding={mockGroupStanding}
        statLabel="GOLS"
      />
    );
    expect(screen.getByText('Grupo C')).toBeTruthy();
  });

  it('chama onSelectCategory ao trocar de aba', () => {
    const onSelectCategory = jest.fn();
    render(
      <StatsScreen
        players={mockScorers}
        selectedCategory="scorers"
        onSelectCategory={onSelectCategory}
        groupStanding={mockGroupStanding}
        statLabel="GOLS"
      />
    );
    fireEvent.press(screen.getByText('ASSISTÊNCIAS'));
    expect(onSelectCategory).toHaveBeenCalledWith('assists');
  });
});
