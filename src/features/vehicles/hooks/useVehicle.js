import { useQuery } from '@tanstack/react-query';
import { getVehicleApi } from '../services/vehicleApi';

export function useVehicle(id) {
  return useQuery({
    queryKey: ['vehicle', id],
    queryFn: () => getVehicleApi(id),
    enabled: !!id, // only fetch when id exists
  });
}
