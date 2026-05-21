import { fireEvent, render, screen } from '@testing-library/react-native';
import React from 'react';

import { mockCompetitions } from '../../../mocks/home';
import { CompetitionCarousel } from '../CompetitionCarousel';

describe('CompetitionCarousel', () => {
  it('exibe todas as competições', () => {
    render(<CompetitionCarousel competitions={mockCompetitions} />);
    expect(screen.getByText('Copa do Mundo 2026')).toBeTruthy();
    expect(screen.getByText('Champions League')).toBeTruthy();
    expect(screen.getByText('Premier League')).toBeTruthy();
    expect(screen.getByText('Euro 2024')).toBeTruthy();
  });

  it('chama onSelect ao pressionar uma competição', () => {
    const onSelect = jest.fn();
    render(<CompetitionCarousel competitions={mockCompetitions} onSelect={onSelect} />);
    fireEvent.press(screen.getByTestId('competition-card-ucl'));
    expect(onSelect).toHaveBeenCalledWith('ucl');
  });

  it('indica visualmente a competição ativa', () => {
    render(<CompetitionCarousel competitions={mockCompetitions} />);
    const active = screen.getByTestId('competition-card-wc2026');
    expect(active.props.accessibilityState?.selected).toBe(true);
  });

  it('exibe badge AO VIVO na competição com isLive', () => {
    render(<CompetitionCarousel competitions={mockCompetitions} />);
    expect(screen.getByText('AO VIVO')).toBeTruthy();
  });

  it('exibe as categorias das competições', () => {
    render(<CompetitionCarousel competitions={mockCompetitions} />);
    expect(screen.getByText('GLOBAL STAGE')).toBeTruthy();
    expect(screen.getByText('CLUB ELITE')).toBeTruthy();
  });
});
