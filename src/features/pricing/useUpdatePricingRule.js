import { useMutation } from '@tanstack/react-query';
import { updatePricingRuleApi } from '../../services/apiPricingRules';
import toast from 'react-hot-toast';

export function useUpdatePricingRule() {
  const { mutate: updatePricingRule, isLoading: isUpdatingPricingRule } =
    useMutation({
      mutationFn: updatePricingRuleApi,
      onSuccess: () => {
        toast.success('Pricing rule updated successfully');
      },
      onError: () => {
        toast.error('Pricing rule could not be updated');
      },
    });

  return { updatePricingRule, isUpdatingPricingRule };
}
