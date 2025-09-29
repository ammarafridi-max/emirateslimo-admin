import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createPricingRuleApi } from '../../services/apiPricingRules';
import toast from 'react-hot-toast';

export function useCreatePricingRule() {
  const queryClient = useQueryClient();

  const { mutate: createPricingRule, isLoading: isCreatingPricingRule } =
    useMutation({
      mutationFn: createPricingRuleApi,
      onSuccess: () => {
        toast.success('Pricing rule created successfully');
        queryClient.invalidateQueries({ queryKey: ['pricing-rules'] });
      },
      onError: () => {
        toast.error('Pricing rule could not be created');
      },
    });

  return { createPricingRule, isCreatingPricingRule };
}
