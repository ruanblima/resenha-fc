import { fireEvent, render, screen } from '@testing-library/react-native';
import React from 'react';

import { mockMatchDayItems } from '../../../mocks/home';
import { MatchDayCard } from '../MatchDayCard';

const liveMatch = mockMatchDayItems[0]; // BRA 2x1 ARG, 72', LIVE
const upcomingMatch = mockMatchDayItems[1]; // FRA vs ESP, 20:00, upcoming

describe('MatchDayCard - jogo ao vivo', () => {
  it('exibe as siglas dos times', () => {
    render(<MatchDayCard match={liveMatch} />);
    expect(screen.getByText('BRA')).toBeTruthy();
    expect(screen.getByText('ARG')).toBeTruthy();
  });

  it('exibe o placar do time da casa', () => {
    render(<MatchDayCard match={liveMatch} />);
    expect(screen.getByText('2')).toBeTruthy();
  });

  it('exibe o placar do time visitante', () => {
    render(<MatchDayCard match={liveMatch} />);
    expect(screen.getByText('1')).toBeTruthy();
  });

  it('exibe o minuto do jogo', () => {
    render(<MatchDayCard match={liveMatch} />);
    expect(screen.getByText("72'")).toBeTruthy();
  });

  it('exibe o badge LIVE', () => {
    render(<MatchDayCard match={liveMatch} />);
    expect(screen.getByText('LIVE')).toBeTruthy();
  });

  it('exibe a fase da partida', () => {
    render(<MatchDayCard match={liveMatch} />);
    expect(screen.getByText('SEMIFINAL')).toBeTruthy();
  });
});

describe('MatchDayCard - jogo futuro', () => {
  it('exibe as siglas dos times', () => {
    render(<MatchDayCard match={upcomingMatch} />);
    expect(screen.getByText('FRA')).toBeTruthy();
    expect(screen.getByText('ESP')).toBeTruthy();
  });

  it('exibe VS para jogo não iniciado', () => {
    render(<MatchDayCard match={upcomingMatch} />);
    expect(screen.getByText('VS')).toBeTruthy();
  });

  it('exibe o horário do jogo', () => {
    render(<MatchDayCard match={upcomingMatch} />);
    expect(screen.getByText('20:00 GMT')).toBeTruthy();
  });

  it('não exibe badge LIVE para jogo futuro', () => {
    render(<MatchDayCard match={upcomingMatch} />);
    expect(screen.queryByText('LIVE')).toBeNull();
  });
});

describe('MatchDayCard - interação', () => {
  it('chama onPress ao tocar no card', () => {
    const onPress = jest.fn();
    render(<MatchDayCard match={liveMatch} onPress={onPress} />);
    fireEvent.press(screen.getByTestId('match-day-card'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });
});
