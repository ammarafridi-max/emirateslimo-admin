// useDuplicateAvailabilityRule.js
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { duplicateAvailabilityRuleApi } from '../services/availabilityRulesApi';
import toast from 'react-hot-toast';

export function useDuplicateAvailabilityRule() {
  const queryClient = useQueryClient();

  const {
    mutate: duplicateAvailabilityRule,
    isLoading: isDuplicatingAvailabilityRule,
  } = useMutation({
    mutationFn: duplicateAvailabilityRuleApi,
    onSuccess: () => {
      toast.success('Availability rule duplicated successfully');
      queryClient.invalidateQueries({ queryKey: ['availability-rules'] });
    },
    onError: () => {
      toast.error('Availability rule could not be duplicated');
    },
  });

  return { duplicateAvailabilityRule, isDuplicatingAvailabilityRule };
}
