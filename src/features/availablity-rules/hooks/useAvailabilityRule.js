import { useQuery } from '@tanstack/react-query';
import { getAvailabilityRuleApi } from '../services/availabilityRulesApi';

export function useAvailabilityRule(id) {
  const { data: availabilityRule, isLoading: isLoadingAvailabilityRule } =
    useQuery({
      queryKey: ['availability-rule', id],
      queryFn: () => getAvailabilityRuleApi(id),
      enabled: !!id, // only fetch when id exists
    });

  return { availabilityRule, isLoadingAvailabilityRule };
}
