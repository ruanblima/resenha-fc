import { fireEvent, render, screen } from '@testing-library/react-native';
import React from 'react';

import { StatsTabs } from '../StatsTabs';

describe('StatsTabs', () => {
  it('exibe as três abas', () => {
    render(
      <StatsTabs selected="scorers" onSelect={jest.fn()} />
    );
    expect(screen.getByText('ARTILHEIROS')).toBeTruthy();
    expect(screen.getByText('ASSISTÊNCIAS')).toBeTruthy();
    expect(screen.getByText('CARTÕES')).toBeTruthy();
  });

  it('indica a aba ativa visualmente', () => {
    render(<StatsTabs selected="scorers" onSelect={jest.fn()} />);
    expect(screen.getByTestId('stats-tab-scorers').props.accessibilityState?.selected).toBe(true);
    expect(screen.getByTestId('stats-tab-assists').props.accessibilityState?.selected).toBe(false);
  });

  it('chama onSelect com a categoria correta', () => {
    const onSelect = jest.fn();
    render(<StatsTabs selected="scorers" onSelect={onSelect} />);
    fireEvent.press(screen.getByText('ASSISTÊNCIAS'));
    expect(onSelect).toHaveBeenCalledWith('assists');
  });
});
