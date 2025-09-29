import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createZoneApi } from '../services/zoneApi';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export function useCreateZone() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: createZone, isLoading: isCreating } = useMutation({
    mutationFn: createZoneApi,
    onSuccess: (newZone) => {
      toast.success(`Zone "${newZone.name}" created successfully`);
      queryClient.invalidateQueries({ queryKey: ['zones'] }); // refresh zones list
      navigate('/zones');
    },
    onError: (err) => {
      toast.error(err.message || 'Failed to create zone');
    },
  });

  return { createZone, isCreating };
}
