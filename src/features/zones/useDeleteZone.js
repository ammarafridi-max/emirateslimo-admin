import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteZoneApi } from '../../services/apiZones';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export function useDeleteZone() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: deleteZone, isLoading: isDeleting } = useMutation({
    mutationFn: async (id) => {
      const confirmDelete = window.confirm(
        'Are you sure you want to delete this zone?'
      );
      if (!confirmDelete) throw new Error('Delete cancelled');
      return deleteZoneApi(id);
    },
    onSuccess: () => {
      toast.success('Zone deleted successfully');
      queryClient.invalidateQueries({ queryKey: ['zones'] }); // refresh list
      navigate('/zones');
    },
    onError: (err) => {
      toast.error(err.message || 'Failed to delete zone');
    },
  });

  return { deleteZone, isDeleting };
}
