import { useQuery } from '@tanstack/react-query';
import { getVehicleApi } from '../../services/apiVehicles';

export function useVehicle(id) {
  return useQuery({
    queryKey: ['vehicle', id],
    queryFn: () => getVehicleApi(id),
    enabled: !!id, // only fetch when id exists
  });
}
