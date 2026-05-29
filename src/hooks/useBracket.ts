import { useQuery } from '@tanstack/react-query';

import { apiFetch } from '../lib/api';
import type { BracketData } from '../types/api';

export function useBracket(competitionId: string) {
  return useQuery<BracketData, Error>({
    queryKey: ['bracket', competitionId],
    queryFn: () => apiFetch<BracketData>('/matches/bracket', { competition: competitionId }),
    staleTime: 5 * 60_000, // 5 minutes — bracket data changes rarely
  });
}
