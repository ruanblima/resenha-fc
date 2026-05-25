import { useQuery } from '@tanstack/react-query';

import { apiFetch } from '../lib/api';
import type { CompetitionStandings } from '../types/standings';

export function useCompetitionStandings(competitionId: string) {
  return useQuery<CompetitionStandings, Error>({
    queryKey: ['standings', competitionId],
    queryFn: () => apiFetch<CompetitionStandings>('/matches/standings', { competition: competitionId }),
    staleTime: 5 * 60_000,
    enabled: !!competitionId,
  });
}
