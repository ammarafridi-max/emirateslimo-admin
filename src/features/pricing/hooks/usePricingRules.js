import { useQuery } from '@tanstack/react-query';
import { getAllPricingRulesApi } from '../services/pricingRuleApi';

export function usePricingRules() {
  const {
    data: pricingRules,
    isLoading: isLoadingPricingRules,
    isError,
    error,
  } = useQuery({
    queryKey: ['pricing-rules'],
    queryFn: getAllPricingRulesApi,
    keepPreviousData: true,
    staleTime: 5 * 60 * 1000,
  });

  return {
    pricingRules: pricingRules ?? [],
    isLoadingPricingRules,
    isError,
    error,
  };
}
