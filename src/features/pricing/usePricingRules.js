import { useQuery } from '@tanstack/react-query';
import { getAllPricingRulesApi } from '../../services/apiPricingRules';

export function usePricingRules() {
  const {
    data: pricingRules,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['pricing-rules'],
    queryFn: getAllPricingRulesApi,
    keepPreviousData: true,
    staleTime: 5 * 60 * 1000,
  });

  return { pricingRules: pricingRules ?? [], isLoading, isError, error };
}
