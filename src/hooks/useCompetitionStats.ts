import { useQuery } from '@tanstack/react-query';

import { apiFetch } from '../lib/api';
import type { CompetitionStats, StatType } from '../types/playerStats';

export function useCompetitionStats(competitionId: string, type: StatType) {
  return useQuery<CompetitionStats, Error>({
    queryKey: ['stats', competitionId, type],
    queryFn: () =>
      apiFetch<CompetitionStats>('/matches/stats', { competition: competitionId, type }),
    staleTime: 10 * 60_000,
  });
}
