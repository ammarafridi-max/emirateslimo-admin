import { useMutation } from '@tanstack/react-query';
import { updateAvailabilityRuleApi } from '../services/availabilityRulesApi';
import toast from 'react-hot-toast';

export function useUpdateAvailabilityRule() {
  const {
    mutate: updateAvailabilityRule,
    isLoading: isUpdatingAvailabilityRule,
  } = useMutation({
    mutationFn: updateAvailabilityRuleApi,
    onSuccess: () => {
      toast.success('Availability rule updated successfully');
    },
    onError: () => {
      toast.error('Availability rule could not be updated');
    },
  });

  return { updateAvailabilityRule, isUpdatingAvailabilityRule };
}
