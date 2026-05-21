import { fireEvent, render, screen } from '@testing-library/react-native';
import React from 'react';

import { mockTournaments } from '../../../mocks/home';
import { TournamentSelector } from '../TournamentSelector';

describe('TournamentSelector', () => {
  it('exibe todos os torneios', () => {
    render(
      <TournamentSelector
        tournaments={mockTournaments}
        selectedId="wc2026"
        onSelect={jest.fn()}
      />
    );
    expect(screen.getByText('Copa do Mundo 2026')).toBeTruthy();
    expect(screen.getByText('Euro 2024')).toBeTruthy();
    expect(screen.getByText('Copa América')).toBeTruthy();
    expect(screen.getByText('AFCON 2025')).toBeTruthy();
  });

  it('chama onSelect com o id correto ao pressionar um torneio', () => {
    const onSelect = jest.fn();
    render(
      <TournamentSelector
        tournaments={mockTournaments}
        selectedId="wc2026"
        onSelect={onSelect}
      />
    );
    fireEvent.press(screen.getByText('Euro 2024'));
    expect(onSelect).toHaveBeenCalledWith('euro2024');
  });

  it('indica visualmente o torneio selecionado', () => {
    render(
      <TournamentSelector
        tournaments={mockTournaments}
        selectedId="wc2026"
        onSelect={jest.fn()}
      />
    );
    const selected = screen.getByTestId('tournament-tab-wc2026');
    expect(selected.props.accessibilityState?.selected).toBe(true);
  });
});
