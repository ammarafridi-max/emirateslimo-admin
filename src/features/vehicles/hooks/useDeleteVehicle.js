import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { deleteVehicleApi } from '../services/vehicleApi';
import toast from 'react-hot-toast';

export function useDeleteVehicle() {
  const navigate = useNavigate();
  const { mutate: deleteVehicle, isLoading: isDeletingVehicle } = useMutation({
    mutationFn: async (id) => {
      const confirmDelete = window.confirm(
        'Are you sure you want to delete this vehicle?'
      );
      if (!confirmDelete) throw new Error('Delete cancelled');
      return deleteVehicleApi(id);
    },
    onSuccess: () => {
      toast.success('Vehicle deleted successfully');
      navigate('/vehicles');
    },
    onError: () => {
      toast.error('Vehicle could not be deleted');
    },
  });

  return { deleteVehicle, isDeletingVehicle };
}
