import { useQuery } from '@tanstack/react-query';

import { apiFetch } from '../lib/api';
import type { NewsArticle } from '../types/api';

interface NewsResponse {
  articles: NewsArticle[];
}

export function useNews(pageSize = 10, enabled = true) {
  return useQuery<NewsArticle[], Error>({
    queryKey: ['news', pageSize],
    queryFn: async () => {
      const res = await apiFetch<NewsResponse>('/news', {
        pageSize: String(pageSize),
      });
      return res.articles;
    },
    staleTime: 20 * 60_000, // 20 min — matches API cache TTL
    enabled,
  });
}
