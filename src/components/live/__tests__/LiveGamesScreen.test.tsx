import { render, screen } from '@testing-library/react-native';
import React from 'react';

import { mockLiveMatches } from '../../../mocks/matches';
import { LiveGamesScreen } from '../LiveGamesScreen';

describe('LiveGamesScreen', () => {
  it('exibe o título "AO VIVO"', () => {
    render(<LiveGamesScreen matches={mockLiveMatches} />);
    expect(screen.getByText('AO VIVO')).toBeTruthy();
  });

  it('exibe o subtítulo com fixtures em andamento', () => {
    render(<LiveGamesScreen matches={mockLiveMatches} />);
    expect(screen.getByText(/em andamento/i)).toBeTruthy();
  });

  it('renderiza um card para cada partida ao vivo', () => {
    render(<LiveGamesScreen matches={mockLiveMatches} />);
    expect(screen.getAllByText('VS').length).toBe(mockLiveMatches.length);
  });

  it('exibe mensagem quando não há jogos ao vivo', () => {
    render(<LiveGamesScreen matches={[]} />);
    expect(screen.getByText(/nenhum jogo/i)).toBeTruthy();
  });

  it('exibe o total de jogos ao vivo no header', () => {
    render(<LiveGamesScreen matches={mockLiveMatches} />);
    expect(screen.getByText(`${mockLiveMatches.length} ao vivo`)).toBeTruthy();
  });
});
