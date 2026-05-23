import { useQuery } from '@tanstack/react-query';

import { apiFetch } from '../lib/api';
import type { MatchDetails } from '../types/match';

export function useMatchDetail(fixtureId: number) {
  return useQuery<MatchDetails, Error>({
    queryKey: ['match', fixtureId],
    queryFn: () => apiFetch<MatchDetails>(`/matches/${fixtureId}`),
    staleTime: 30_000,
    enabled: fixtureId > 0,
  });
}
