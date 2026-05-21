import { render, screen } from '@testing-library/react-native';
import React from 'react';

import { mockMatchDetails } from '../../../mocks/matchDetails';
import { MatchTimeline } from '../MatchTimeline';

const match = mockMatchDetails[0];

describe('MatchTimeline', () => {
  it('exibe o título da seção', () => {
    render(<MatchTimeline events={match.events} homeTeam={match.homeTeam} awayTeam={match.awayTeam} />);
    expect(screen.getByText('LANCES DA PARTIDA')).toBeTruthy();
  });

  it('exibe os minutos dos eventos', () => {
    render(<MatchTimeline events={match.events} homeTeam={match.homeTeam} awayTeam={match.awayTeam} />);
    expect(screen.getByText("68'")).toBeTruthy();
    expect(screen.getByText("42'")).toBeTruthy();
    expect(screen.getByText("24'")).toBeTruthy();
  });

  it('exibe os nomes dos jogadores nos eventos', () => {
    render(<MatchTimeline events={match.events} homeTeam={match.homeTeam} awayTeam={match.awayTeam} />);
    expect(screen.getAllByText('Vinícius Jr.').length).toBeGreaterThan(0);
    expect(screen.getByText('Casemiro')).toBeTruthy();
    expect(screen.getByText('Mbappé')).toBeTruthy();
  });

  it('exibe informações de substituição', () => {
    render(<MatchTimeline events={match.events} homeTeam={match.homeTeam} awayTeam={match.awayTeam} />);
    expect(screen.getByText('Dembélé')).toBeTruthy();
    expect(screen.getByText('Giroud')).toBeTruthy();
  });

  it('exibe a descrição do evento de gol', () => {
    render(<MatchTimeline events={match.events} homeTeam={match.homeTeam} awayTeam={match.awayTeam} />);
    expect(screen.getByText('Chute preciso no ângulo direito de fora da área. Assistência de Neymar.')).toBeTruthy();
  });
});
