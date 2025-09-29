import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateZoneApi } from '../services/zoneApi';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export function useUpdateZone() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: updateZone, isLoading: isUpdating } = useMutation({
    mutationFn: ({ id, zoneData }) => updateZoneApi(id, zoneData),
    onSuccess: (updatedZone) => {
      toast.success(`Zone "${updatedZone.name}" updated successfully`);
      queryClient.invalidateQueries({ queryKey: ['zones'] }); // refresh list
    },
    onError: (err) => {
      toast.error(err.message || 'Failed to update zone');
    },
  });

  return { updateZone, isUpdating };
}
