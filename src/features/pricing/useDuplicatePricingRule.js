import { useMutation, useQueryClient } from '@tanstack/react-query';
import { duplicatePricingRuleApi } from '../../services/apiPricingRules';
import toast from 'react-hot-toast';

export function useDuplicatePricingRule() {
  const queryClient = useQueryClient();

  const { mutate: duplicatePricingRule, isLoading: isDuplicatingPricingRule } =
    useMutation({
      mutationFn: duplicatePricingRuleApi,
      onSuccess: () => {
        toast.success('Pricing rule duplicated successfully');
        queryClient.invalidateQueries({ queryKey: ['pricing-rule'] });
      },
      onError: () => {
        toast.error('Pricing rule could not be duplicated');
      },
    });

  return { duplicatePricingRule, isDuplicatingPricingRule };
}
