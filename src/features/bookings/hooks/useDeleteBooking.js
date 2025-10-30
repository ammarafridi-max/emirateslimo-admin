import { useMutation } from '@tanstack/react-query';
import { deleteBookingApi } from '../services/bookingApi';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export function useDeleteBooking() {
  const navigate = useNavigate();
  const { mutate: deleteBooking, isPending: isDeletingBooking } = useMutation({
    mutationFn: (id) => deleteBookingApi(id),
    onSuccess: (success) => {
      console.log(success);
      toast.success('Booking deleted');
      navigate('/bookings');
    },
    onError: (err) => {
      console.log(err);
      toast.error('Booking could not be deleted');
    },
  });

  return { deleteBooking, isDeletingBooking };
}
