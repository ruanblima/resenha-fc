import { render, screen } from '@testing-library/react-native';
import React from 'react';

import { mockLiveMatches } from '../../../mocks/matches';
import { LiveMatchCard } from '../LiveMatchCard';

const match = mockLiveMatches[0]; // Argentina 2 x 1 França, 75'

describe('LiveMatchCard', () => {
  it('exibe os nomes dos times', () => {
    render(<LiveMatchCard match={match} />);
    expect(screen.getByText('Argentina')).toBeTruthy();
    expect(screen.getByText('França')).toBeTruthy();
  });

  it('exibe o placar do time da casa', () => {
    render(<LiveMatchCard match={match} />);
    expect(screen.getByText('2')).toBeTruthy();
  });

  it('exibe o placar do time visitante', () => {
    render(<LiveMatchCard match={match} />);
    expect(screen.getByText('1')).toBeTruthy();
  });

  it('exibe o minuto atual do jogo', () => {
    render(<LiveMatchCard match={match} />);
    expect(screen.getByText("75'")).toBeTruthy();
  });

  it('exibe o nome da fase no header do card', () => {
    render(<LiveMatchCard match={match} />);
    expect(screen.getByText('FINAL')).toBeTruthy();
  });

  it('exibe os minutos dos gols do time da casa', () => {
    render(<LiveMatchCard match={match} />);
    expect(screen.getByText("23'")).toBeTruthy();
    expect(screen.getByText("36'")).toBeTruthy();
  });

  it('exibe os minutos dos gols do time visitante', () => {
    render(<LiveMatchCard match={match} />);
    expect(screen.getByText("55'")).toBeTruthy();
  });

  it('exibe o separador VS entre os times', () => {
    render(<LiveMatchCard match={match} />);
    expect(screen.getByText('VS')).toBeTruthy();
  });

  it('chama onPress ao tocar no card', () => {
    const onPress = jest.fn();
    render(<LiveMatchCard match={match} onPress={onPress} />);
    screen.getByText('Argentina').parent?.props.onPress?.();
  });
});
