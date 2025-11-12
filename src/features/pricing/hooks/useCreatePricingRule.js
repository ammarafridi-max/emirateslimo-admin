import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createPricingRuleApi } from '../services/pricingRuleApi';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export function useCreatePricingRule() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: createPricingRule, isLoading: isCreatingPricingRule } =
    useMutation({
      mutationFn: createPricingRuleApi,
      onSuccess: () => {
        navigate('/pricing');
        toast.success('Pricing rule created successfully');
        queryClient.invalidateQueries({ queryKey: ['pricing-rules'] });
      },
      onError: () => {
        toast.error('Pricing rule could not be created');
      },
    });

  return { createPricingRule, isCreatingPricingRule };
}
