import { render, screen } from '@testing-library/react-native';
import React from 'react';

import { mockCompetitions, mockMatchDayItems, mockNewsItems } from '../../../mocks/home';
import { HomeScreen } from '../HomeScreen';

describe('HomeScreen', () => {
  it('exibe o título da seção de jogos do dia', () => {
    render(
      <HomeScreen
        competitions={mockCompetitions}
        matchDayItems={mockMatchDayItems}
        newsItems={mockNewsItems}
      />
    );
    expect(screen.getByText('JOGOS DO DIA')).toBeTruthy();
  });

  it('exibe o título da seção de notícias', () => {
    render(
      <HomeScreen
        competitions={mockCompetitions}
        matchDayItems={mockMatchDayItems}
        newsItems={mockNewsItems}
      />
    );
    expect(screen.getByText('ÚLTIMAS NOTÍCIAS')).toBeTruthy();
  });

  it('exibe os cards de jogos do dia', () => {
    render(
      <HomeScreen
        competitions={mockCompetitions}
        matchDayItems={mockMatchDayItems}
        newsItems={mockNewsItems}
      />
    );
    expect(screen.getByText('BRA')).toBeTruthy();
    expect(screen.getByText('FRA')).toBeTruthy();
  });

  it('exibe os cards de notícias', () => {
    render(
      <HomeScreen
        competitions={mockCompetitions}
        matchDayItems={mockMatchDayItems}
        newsItems={mockNewsItems}
      />
    );
    expect(screen.getByText('EDITORIAL')).toBeTruthy();
  });

  it('exibe o carrossel de competições', () => {
    render(
      <HomeScreen
        competitions={mockCompetitions}
        matchDayItems={mockMatchDayItems}
        newsItems={mockNewsItems}
      />
    );
    expect(screen.getByText('Copa do Mundo 2026')).toBeTruthy();
    expect(screen.getByText('Champions League')).toBeTruthy();
  });

  it('exibe a contagem de jogos ao vivo', () => {
    render(
      <HomeScreen
        competitions={mockCompetitions}
        matchDayItems={mockMatchDayItems}
        newsItems={mockNewsItems}
      />
    );
    expect(screen.getByText('1 AO VIVO')).toBeTruthy();
  });
});
