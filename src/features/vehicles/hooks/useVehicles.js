import { useQuery } from '@tanstack/react-query';
import { getAllVehiclesApi } from '../services/vehicleApi';

export function useVehicles() {
  const {
    data: vehicles,
    isLoading: isLoadingVehicles,
    isError,
    error,
  } = useQuery({
    queryKey: ['vehicles'],
    queryFn: getAllVehiclesApi,
    keepPreviousData: true,
    staleTime: 5 * 60 * 1000,
  });

  return { vehicles: vehicles ?? [], isLoadingVehicles, isError, error };
}
