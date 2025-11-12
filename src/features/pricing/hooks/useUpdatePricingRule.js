import { useMutation } from '@tanstack/react-query';
import { updatePricingRuleApi } from '../services/pricingRuleApi';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export function useUpdatePricingRule() {
  const navigate = useNavigate();
  const { mutate: updatePricingRule, isLoading: isUpdatingPricingRule } =
    useMutation({
      mutationFn: updatePricingRuleApi,
      onSuccess: () => {
        navigate('/pricing');
        toast.success('Pricing rule updated successfully');
      },
      onError: () => {
        toast.error('Pricing rule could not be updated');
      },
    });

  return { updatePricingRule, isUpdatingPricingRule };
}
