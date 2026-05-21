import { fireEvent, render, screen } from '@testing-library/react-native';
import React from 'react';

import { mockMatchDetails } from '../../../mocks/matchDetails';
import { MatchDetailScreen } from '../MatchDetailScreen';

const match = mockMatchDetails[0];

describe('MatchDetailScreen', () => {
  it('exibe o scoreboard com times e placar', () => {
    render(<MatchDetailScreen match={match} />);
    expect(screen.getByText('BRA')).toBeTruthy();
    expect(screen.getByText('FRA')).toBeTruthy();
    expect(screen.getByText('2')).toBeTruthy();
  });

  it('exibe as abas de navegação', () => {
    render(<MatchDetailScreen match={match} />);
    expect(screen.getByText('LANCES')).toBeTruthy();
    expect(screen.getByText('ESTATÍSTICAS')).toBeTruthy();
  });

  it('mostra a timeline de lances por padrão', () => {
    render(<MatchDetailScreen match={match} />);
    expect(screen.getByText('LANCES DA PARTIDA')).toBeTruthy();
    expect(screen.getAllByText('Vinícius Jr.').length).toBeGreaterThan(0);
  });

  it('exibe as estatísticas ao trocar para a aba ESTATÍSTICAS', () => {
    render(<MatchDetailScreen match={match} />);
    fireEvent.press(screen.getByText('ESTATÍSTICAS'));
    expect(screen.getByText('ESTATÍSTICAS PRINCIPAIS')).toBeTruthy();
    expect(screen.getByText('Posse de Bola')).toBeTruthy();
  });

  it('exibe a probabilidade de vitória na aba ESTATÍSTICAS', () => {
    render(<MatchDetailScreen match={match} />);
    fireEvent.press(screen.getByText('ESTATÍSTICAS'));
    expect(screen.getByText('PROBABILIDADE DE VITÓRIA')).toBeTruthy();
    expect(screen.getByText('78%')).toBeTruthy();
  });
});
