import { render, screen } from '@testing-library/react-native';
import React from 'react';

import { mockGroupStanding } from '../../../mocks/stats';
import { GroupStandingsCard } from '../GroupStandingsCard';

describe('GroupStandingsCard', () => {
  it('exibe o título com a letra do grupo', () => {
    render(<GroupStandingsCard standing={mockGroupStanding} />);
    expect(screen.getByText('Grupo C')).toBeTruthy();
  });

  it('exibe os headers da tabela', () => {
    render(<GroupStandingsCard standing={mockGroupStanding} />);
    expect(screen.getByText('TIME')).toBeTruthy();
    expect(screen.getByText('J')).toBeTruthy();
    expect(screen.getByText('SG')).toBeTruthy();
    expect(screen.getByText('PTS')).toBeTruthy();
  });

  it('exibe todos os times do grupo', () => {
    render(<GroupStandingsCard standing={mockGroupStanding} />);
    expect(screen.getByText('ARG')).toBeTruthy();
    expect(screen.getByText('POL')).toBeTruthy();
    expect(screen.getByText('MEX')).toBeTruthy();
    expect(screen.getByText('KSA')).toBeTruthy();
  });

  it('exibe os pontos dos times', () => {
    render(<GroupStandingsCard standing={mockGroupStanding} />);
    expect(screen.getByText('6')).toBeTruthy();
    expect(screen.getAllByText('4')).toHaveLength(2);
    // "3" aparece múltiplas vezes (jogos + pontos do KSA)
    expect(screen.getAllByText('3').length).toBeGreaterThanOrEqual(1);
  });

  it('exibe o saldo de gols', () => {
    render(<GroupStandingsCard standing={mockGroupStanding} />);
    expect(screen.getByText('+3')).toBeTruthy();
    expect(screen.getByText('0')).toBeTruthy();
    expect(screen.getByText('-1')).toBeTruthy();
    expect(screen.getByText('-2')).toBeTruthy();
  });
});
