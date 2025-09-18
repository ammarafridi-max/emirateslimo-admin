import { useMutation } from '@tanstack/react-query';
import { createVehicleApi } from '../../services/apiVehicles';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export function useCreateVehicle() {
  const navigate = useNavigate();
  const { mutate: createVehicle, isLoading: isCreatingVehicle } = useMutation({
    mutationFn: createVehicleApi,
    onSuccess: () => {
      toast.success('Vehicle created successfully');
      navigate('/vehicles');
    },
    onError: () => {
      toast.error('Vehicle could not be created');
    },
  });

  return { createVehicle, isCreatingVehicle };
}
