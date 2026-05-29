import { fireEvent, render, screen } from '@testing-library/react-native';
import React from 'react';

import { NewsCard } from '../NewsCard';
import type { NewsArticle } from '../../../types/api';

const mockArticle: NewsArticle = {
  id: 'abc123',
  title: 'A REVOLUÇÃO TÁTICA QUE ESTÁ REMODELANDO AS QUARTAS DE FINAL',
  excerpt:
    'Formações fluidas e pressão alta estão transformando as estratégias defensivas nesta Copa do Mundo.',
  imageUrl: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=800',
  url: 'https://example.com/article/1',
  source: 'ESPN',
  publishedAt: '2026-05-28T10:00:00Z',
  publishedAgo: '2h atrás',
};

describe('NewsCard', () => {
  it('exibe a fonte da notícia', () => {
    render(<NewsCard news={mockArticle} />);
    expect(screen.getByText('ESPN')).toBeTruthy();
  });

  it('exibe o tempo de publicação', () => {
    render(<NewsCard news={mockArticle} />);
    expect(screen.getByText('2h atrás')).toBeTruthy();
  });

  it('exibe o título da notícia', () => {
    render(<NewsCard news={mockArticle} />);
    expect(
      screen.getByText('A REVOLUÇÃO TÁTICA QUE ESTÁ REMODELANDO AS QUARTAS DE FINAL')
    ).toBeTruthy();
  });

  it('chama onPress ao tocar no card', () => {
    const onPress = jest.fn();
    render(<NewsCard news={mockArticle} onPress={onPress} />);
    fireEvent.press(screen.getByTestId('news-card'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });
});
