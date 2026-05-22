import { fireEvent, render, screen } from '@testing-library/react-native';
import React from 'react';

import { getMatchesByCompetition } from '../../../mocks/competitionMatches';
import { mockCompetitions } from '../../../mocks/home';
import { CompetitionMatchesScreen } from '../CompetitionMatchesScreen';

const wc2026 = mockCompetitions.find((c) => c.id === 'wc2026')!;
const wc2026Matches = getMatchesByCompetition('wc2026');

describe('CompetitionMatchesScreen', () => {
  it('exibe o chip de filtro padrão "Todos"', () => {
    render(<CompetitionMatchesScreen competition={wc2026} matches={wc2026Matches} />);
    expect(screen.getByText('Todos')).toBeTruthy();
  });

  it('exibe os chips de rodadas únicas', () => {
    render(<CompetitionMatchesScreen competition={wc2026} matches={wc2026Matches} />);
    expect(screen.getByText('Grupo A')).toBeTruthy();
    expect(screen.getByText('Grupo B')).toBeTruthy();
  });

  it('exibe os chips de todas as rodadas disponíveis', () => {
    render(<CompetitionMatchesScreen competition={wc2026} matches={wc2026Matches} />);
    expect(screen.getAllByText(/Grupo/).length).toBeGreaterThan(0);
  });

  it('exibe partidas ao vivo com badge LIVE', () => {
    render(<CompetitionMatchesScreen competition={wc2026} matches={wc2026Matches} />);
    expect(screen.getByText(/LIVE/)).toBeTruthy();
  });

  it('exibe os times das partidas', () => {
    render(<CompetitionMatchesScreen competition={wc2026} matches={wc2026Matches} />);
    expect(screen.getByText('BRA')).toBeTruthy();
    expect(screen.getByText('FRA')).toBeTruthy();
  });

  it('exibe VS para partidas futuras', () => {
    render(<CompetitionMatchesScreen competition={wc2026} matches={wc2026Matches} />);
    expect(screen.getAllByText('VS').length).toBeGreaterThan(0);
  });

  it('exibe placar para partidas finalizadas', () => {
    render(<CompetitionMatchesScreen competition={wc2026} matches={wc2026Matches} />);
    expect(screen.getByText('GER')).toBeTruthy();
    expect(screen.getByText('MEX')).toBeTruthy();
  });

  it('exibe o venue da partida', () => {
    render(<CompetitionMatchesScreen competition={wc2026} matches={wc2026Matches} />);
    expect(screen.getByText(/MetLife Stadium/)).toBeTruthy();
  });

  it('filtra partidas ao selecionar uma rodada', () => {
    render(<CompetitionMatchesScreen competition={wc2026} matches={wc2026Matches} />);
    fireEvent.press(screen.getByText('Grupo B'));
    expect(screen.getByText('USA')).toBeTruthy();
    expect(screen.queryByText('BRA')).toBeNull();
  });

  it('exibe todas as partidas ao selecionar Todos', () => {
    render(<CompetitionMatchesScreen competition={wc2026} matches={wc2026Matches} />);
    fireEvent.press(screen.getByText('Grupo B'));
    fireEvent.press(screen.getByText('Todos'));
    expect(screen.getByText('BRA')).toBeTruthy();
    expect(screen.getByText('USA')).toBeTruthy();
  });

  it('chama onPressMatch ao pressionar uma partida', () => {
    const onPressMatch = jest.fn();
    render(
      <CompetitionMatchesScreen
        competition={wc2026}
        matches={wc2026Matches}
        onPressMatch={onPressMatch}
      />
    );
    fireEvent.press(screen.getByTestId('competition-match-101'));
    expect(onPressMatch).toHaveBeenCalledWith(101);
  });
});
