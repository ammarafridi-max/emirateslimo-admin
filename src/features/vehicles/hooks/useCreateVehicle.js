import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createVehicleApi } from '../services/vehicleApi';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export function useCreateVehicle() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: createVehicle, isLoading: isCreatingVehicle } = useMutation({
    mutationFn: createVehicleApi,
    onSuccess: () => {
      toast.success('Vehicle created successfully');
      queryClient.invalidateQueries({ queryKey: ['vehicles'] });
      navigate('/vehicles');
    },
    onError: () => {
      toast.error('Vehicle could not be created');
    },
  });

  return { createVehicle, isCreatingVehicle };
}
