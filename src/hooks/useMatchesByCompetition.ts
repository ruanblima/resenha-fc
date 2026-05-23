import { useInfiniteQuery } from '@tanstack/react-query';

import { apiFetch } from '../lib/api';
import type { MatchSummary, PaginatedResponse } from '../types/api';

type MatchesPage = PaginatedResponse<MatchSummary>;

export function useMatchesByCompetition(competitionId: string) {
  return useInfiniteQuery<MatchesPage, Error>({
    queryKey: ['matches', competitionId],
    queryFn: async ({ pageParam }) => {
      console.log('[useMatchesByCompetition] fetching page', pageParam, 'for', competitionId);
      try {
        const result = await apiFetch<MatchesPage>('/matches', {
          competition: competitionId,
          page: pageParam as number,
        });
        console.log('[useMatchesByCompetition] success:', result);
        return result;
      } catch (err) {
        console.error('[useMatchesByCompetition] error:', err);
        throw err;
      }
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.pagination.hasNextPage ? lastPage.pagination.page + 1 : undefined,
    staleTime: 60_000,
  });
}
