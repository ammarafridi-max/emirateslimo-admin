import { useMutation } from '@tanstack/react-query';
import { deleteAvailabilityRuleApi } from '../services/availabilityRulesApi';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export function useDeleteAvailabilityRule() {
  const navigate = useNavigate();
  const {
    mutate: deleteAvailabilityRule,
    isLoading: isDeletingAvailabilityRule,
  } = useMutation({
    mutationFn: async (id) => {
      const confirmDelete = window.confirm(
        'Are you sure you want to delete this availability rule?'
      );
      if (!confirmDelete) throw new Error('Delete cancelled');
      return deleteAvailabilityRuleApi(id);
    },
    onSuccess: () => {
      toast.success('availability rule deleted successfully');
      navigate('/availability-rules');
    },
    onError: () => {
      toast.error('Availability rule could not be deleted');
    },
  });

  return { deleteAvailabilityRule, isDeletingAvailabilityRule };
}
