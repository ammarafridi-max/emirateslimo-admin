import { useMutation } from '@tanstack/react-query';
import { updateVehicleApi } from '../../services/apiVehicles';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export function useUpdateVehicle() {
  const navigate = useNavigate();
  const { mutate: updateVehicle, isLoading: isUpdatingVehicle } = useMutation({
    mutationFn: updateVehicleApi,
    onSuccess: () => {
      toast.success('Vehicle updated successfully');
      navigate('/vehicles');
    },
    onError: () => {
      toast.error('Vehicle could not be updated');
    },
  });

  return { updateVehicle, isUpdatingVehicle };
}
