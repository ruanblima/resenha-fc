import { fireEvent, render, screen } from '@testing-library/react-native';
import React from 'react';

import { mockNewsItems } from '../../../mocks/home';
import { NewsCard } from '../NewsCard';

const news = mockNewsItems[0];

describe('NewsCard', () => {
  it('exibe a categoria da notícia', () => {
    render(<NewsCard news={news} />);
    expect(screen.getByText('EDITORIAL')).toBeTruthy();
  });

  it('exibe o tempo de publicação', () => {
    render(<NewsCard news={news} />);
    expect(screen.getByText('2 HRS AGO')).toBeTruthy();
  });

  it('exibe o título da notícia', () => {
    render(<NewsCard news={news} />);
    expect(
      screen.getByText('A REVOLUÇÃO TÁTICA QUE ESTÁ REMODELANDO AS QUARTAS DE FINAL')
    ).toBeTruthy();
  });

  it('exibe o resumo da notícia', () => {
    render(<NewsCard news={news} />);
    expect(
      screen.getByText(
        'Formações fluidas e pressão alta estão transformando as estratégias defensivas nesta Copa do Mundo.'
      )
    ).toBeTruthy();
  });

  it('chama onPress ao tocar no card', () => {
    const onPress = jest.fn();
    render(<NewsCard news={news} onPress={onPress} />);
    fireEvent.press(screen.getByTestId('news-card'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });
});
