import { useMutation } from '@tanstack/react-query';
import { deleteVehicleApi } from '../../services/apiVehicles';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export function useDeleteVehicle() {
  const navigate = useNavigate();
  const { mutate: deleteVehicle, isLoading: isDeletingVehicle } = useMutation({
    mutationFn: deleteVehicleApi,
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
