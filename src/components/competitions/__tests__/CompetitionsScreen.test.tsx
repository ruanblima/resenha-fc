import { fireEvent, render, screen } from '@testing-library/react-native';
import React from 'react';

import { mockCompetitions, mockCountryLeagues } from '../../../mocks/home';
import { CompetitionsScreen } from '../CompetitionsScreen';

describe('CompetitionsScreen', () => {
  it('exibe o título da seção internacional', () => {
    render(
      <CompetitionsScreen
        featuredCompetitions={mockCompetitions}
        countryLeagues={mockCountryLeagues}
      />
    );
    expect(screen.getByText('INTERNACIONAL')).toBeTruthy();
  });

  it('exibe os cards de competições em destaque', () => {
    render(
      <CompetitionsScreen
        featuredCompetitions={mockCompetitions}
        countryLeagues={mockCountryLeagues}
      />
    );
    expect(screen.getByText('Copa do Mundo 2026')).toBeTruthy();
    expect(screen.getByText('Champions League')).toBeTruthy();
  });

  it('exibe badge ATIVO na competição ativa', () => {
    render(
      <CompetitionsScreen
        featuredCompetitions={mockCompetitions}
        countryLeagues={mockCountryLeagues}
      />
    );
    expect(screen.getByText('ATIVO')).toBeTruthy();
  });

  it('exibe a região da competição', () => {
    render(
      <CompetitionsScreen
        featuredCompetitions={mockCompetitions}
        countryLeagues={mockCountryLeagues}
      />
    );
    expect(screen.getByText('Americas')).toBeTruthy();
    expect(screen.getAllByText('Europe').length).toBeGreaterThan(0);
  });

  it('exibe o título da seção países', () => {
    render(
      <CompetitionsScreen
        featuredCompetitions={mockCompetitions}
        countryLeagues={mockCountryLeagues}
      />
    );
    expect(screen.getByText('PAÍSES')).toBeTruthy();
  });

  it('exibe os países com seus acordeões', () => {
    render(
      <CompetitionsScreen
        featuredCompetitions={mockCompetitions}
        countryLeagues={mockCountryLeagues}
      />
    );
    expect(screen.getByText('Brasil')).toBeTruthy();
    expect(screen.getByText('Inglaterra')).toBeTruthy();
    expect(screen.getByText('Espanha')).toBeTruthy();
    expect(screen.getByText('Itália')).toBeTruthy();
  });

  it('expande o acordeão ao pressionar um país', () => {
    render(
      <CompetitionsScreen
        featuredCompetitions={mockCompetitions}
        countryLeagues={mockCountryLeagues}
      />
    );
    fireEvent.press(screen.getByText('Brasil'));
    expect(screen.getByText('Série A')).toBeTruthy();
    expect(screen.getByText('Copa do Brasil')).toBeTruthy();
  });

  it('chama onSelectLeague ao pressionar uma liga', () => {
    const onSelectLeague = jest.fn();
    render(
      <CompetitionsScreen
        featuredCompetitions={mockCompetitions}
        countryLeagues={mockCountryLeagues}
        onSelectLeague={onSelectLeague}
      />
    );
    fireEvent.press(screen.getByText('Brasil'));
    fireEvent.press(screen.getByText('Série A'));
    expect(onSelectLeague).toHaveBeenCalledWith('serie-a');
  });

  it('chama onSelectCompetition ao pressionar uma competição em destaque', () => {
    const onSelectCompetition = jest.fn();
    render(
      <CompetitionsScreen
        featuredCompetitions={mockCompetitions}
        countryLeagues={mockCountryLeagues}
        onSelectCompetition={onSelectCompetition}
      />
    );
    fireEvent.press(screen.getByTestId('featured-competition-wc2026'));
    expect(onSelectCompetition).toHaveBeenCalledWith('wc2026');
  });

  it('destaca a liga com badge TOP', () => {
    render(
      <CompetitionsScreen
        featuredCompetitions={mockCompetitions}
        countryLeagues={mockCountryLeagues}
      />
    );
    fireEvent.press(screen.getByText('Inglaterra'));
    expect(screen.getByText('TOP')).toBeTruthy();
  });
});
