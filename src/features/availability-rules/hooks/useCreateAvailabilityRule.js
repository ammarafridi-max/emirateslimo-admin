import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createAvailabilityRuleApi } from '../services/availabilityRulesApi';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export function useCreateAvailabilityRule() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const {
    mutate: createAvailabilityRule,
    isLoading: isCreatingAvailabilityRule,
  } = useMutation({
    mutationFn: createAvailabilityRuleApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['availability-rules'] });
      toast.success('Availability rule created successfully');
      navigate('/availability-rules');
    },
    onError: () => {
      toast.error('Availability rule could not be created');
    },
  });

  return { createAvailabilityRule, isCreatingAvailabilityRule };
}
