import { useQuery } from '@tanstack/react-query';
import { getBookingsApi } from '../services/bookingApi';

export function useBookings() {
  const { data: bookings, isLoading: isLoadingBookings } = useQuery({
    queryFn: getBookingsApi,
    queryKey: ['bookings'],
  });

  return { bookings, isLoadingBookings };
}
