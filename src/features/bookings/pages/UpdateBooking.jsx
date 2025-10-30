import { Helmet } from 'react-helmet-async';
import BookingForm from '../components/BookingForm';

export default function UpdateBooking() {
  return (
    <>
      <Helmet>
        <title>Update Booking | Emirates Limo Admin</title>
      </Helmet>
      <BookingForm />
    </>
  );
}
