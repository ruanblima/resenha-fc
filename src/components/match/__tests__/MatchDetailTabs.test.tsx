import { fireEvent, render, screen } from '@testing-library/react-native';
import React from 'react';

import { MatchDetailTabs } from '../MatchDetailTabs';

describe('MatchDetailTabs', () => {
  it('exibe todas as abas', () => {
    render(<MatchDetailTabs selected="events" onSelect={jest.fn()} />);
    expect(screen.getByText('LANCES')).toBeTruthy();
    expect(screen.getByText('ESCALAÇÕES')).toBeTruthy();
    expect(screen.getByText('ESTATÍSTICAS')).toBeTruthy();
    expect(screen.getByText('RESUMO')).toBeTruthy();
  });

  it('marca a aba ativa corretamente', () => {
    render(<MatchDetailTabs selected="stats" onSelect={jest.fn()} />);
    expect(screen.getByTestId('match-tab-stats').props.accessibilityState?.selected).toBe(true);
    expect(screen.getByTestId('match-tab-events').props.accessibilityState?.selected).toBe(false);
  });

  it('chama onSelect com a aba correta', () => {
    const onSelect = jest.fn();
    render(<MatchDetailTabs selected="events" onSelect={onSelect} />);
    fireEvent.press(screen.getByText('ESTATÍSTICAS'));
    expect(onSelect).toHaveBeenCalledWith('stats');
  });
});
