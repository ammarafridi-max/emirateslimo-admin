import { useQuery } from '@tanstack/react-query';
import { getAvailabilityRuleApi } from '../services/availabilityRulesApi';

export function useAvailabilityRule(id) {
  const { data: availabilityRule, isLoading: isLoadingAvailabilityRule } =
    useQuery({
      queryKey: ['availability-rule', id],
      queryFn: () => getAvailabilityRuleApi(id),
      enabled: !!id,
      staleTime: 60 * 1000,
    });

  return { availabilityRule, isLoadingAvailabilityRule };
}
