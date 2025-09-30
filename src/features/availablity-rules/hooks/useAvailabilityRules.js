import { useQuery } from '@tanstack/react-query';
import { getAllAvailabilityRulesApi } from '../services/availabilityRulesApi';

export function useAvailabilityRules() {
  const {
    data: availabilityRules,
    isLoading: isLoadingAvailabilityRules,
    isError,
    error,
  } = useQuery({
    queryKey: ['availability-rules'],
    queryFn: getAllAvailabilityRulesApi,
    keepPreviousData: true,
    staleTime: 5 * 60 * 1000,
  });

  return {
    availabilityRules: availabilityRules ?? [],
    isLoadingAvailabilityRules,
    isError,
    error,
  };
}
