import { useQuery } from '@tanstack/react-query';
import { getBookingApi } from '../services/bookingApi';

export function useBooking(id) {
  const { data: booking, isLoading: isLoadingBooking } = useQuery({
    queryKey: ['booking'],
    queryFn: () => getBookingApi(id),
  });

  return { booking, isLoadingBooking };
}
