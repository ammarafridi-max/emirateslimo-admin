import { useQuery } from '@tanstack/react-query';
import { getAllVehiclesApi } from '../../services/apiVehicles';

export function useVehicles() {
  const {
    data: vehicles,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['vehicles'],
    queryFn: getAllVehiclesApi,
    keepPreviousData: true,
    staleTime: 5 * 60 * 1000,
  });

  return { vehicles, isLoading, isError, error };
}
