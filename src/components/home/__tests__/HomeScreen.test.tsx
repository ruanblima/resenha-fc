import { render, screen } from '@testing-library/react-native';
import React from 'react';

import { mockMatchDayItems, mockNewsItems, mockTournaments } from '../../../mocks/home';
import { HomeScreen } from '../HomeScreen';

describe('HomeScreen', () => {
  it('exibe o título da seção de jogos do dia', () => {
    render(
      <HomeScreen
        tournaments={mockTournaments}
        selectedTournamentId="wc2026"
        onSelectTournament={jest.fn()}
        matchDayItems={mockMatchDayItems}
        newsItems={mockNewsItems}
      />
    );
    expect(screen.getByText('JOGOS DO DIA')).toBeTruthy();
  });

  it('exibe o título da seção de notícias', () => {
    render(
      <HomeScreen
        tournaments={mockTournaments}
        selectedTournamentId="wc2026"
        onSelectTournament={jest.fn()}
        matchDayItems={mockMatchDayItems}
        newsItems={mockNewsItems}
      />
    );
    expect(screen.getByText('ÚLTIMAS NOTÍCIAS')).toBeTruthy();
  });

  it('exibe os cards de jogos do dia', () => {
    render(
      <HomeScreen
        tournaments={mockTournaments}
        selectedTournamentId="wc2026"
        onSelectTournament={jest.fn()}
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
        tournaments={mockTournaments}
        selectedTournamentId="wc2026"
        onSelectTournament={jest.fn()}
        matchDayItems={mockMatchDayItems}
        newsItems={mockNewsItems}
      />
    );
    expect(screen.getByText('EDITORIAL')).toBeTruthy();
  });

  it('exibe o seletor de torneios', () => {
    render(
      <HomeScreen
        tournaments={mockTournaments}
        selectedTournamentId="wc2026"
        onSelectTournament={jest.fn()}
        matchDayItems={mockMatchDayItems}
        newsItems={mockNewsItems}
      />
    );
    expect(screen.getByText('Copa do Mundo 2026')).toBeTruthy();
  });
});
