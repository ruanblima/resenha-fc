import { useQuery } from '@tanstack/react-query';

import { apiFetch } from '../lib/api';
import type { MatchSummary } from '../types/api';

export interface HomeFeed {
  live: MatchSummary[];
  upcoming: MatchSummary[];
}

export function useHomeFeed(competitionId: string) {
  return useQuery<HomeFeed, Error>({
    queryKey: ['home-feed', competitionId],
    queryFn: () => apiFetch<HomeFeed>('/matches/today', { competition: competitionId }),
    staleTime: 60_000,
  });
}
