import { useMutation } from '@tanstack/react-query';
import { deletePricingRuleApi } from '../services/pricingRuleApi';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export function useDeletePricingRule() {
  const navigate = useNavigate();
  const { mutate: deletePricingRule, isLoading: isDeletingPricingRule } =
    useMutation({
      mutationFn: async (id) => {
        const confirmDelete = window.confirm(
          'Are you sure you want to delete this pricing rule?'
        );
        if (!confirmDelete) throw new Error('Delete cancelled');
        return deletePricingRuleApi(id);
      },
      onSuccess: () => {
        toast.success('Pricing rule deleted successfully');
        navigate('/pricing');
      },
      onError: () => {
        toast.error('Pricing rule could not be deleted');
      },
    });

  return { deletePricingRule, isDeletingPricingRule };
}
