import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import { useBooking } from '../hooks/useBooking';
import Breadcrumb from '../../../components/Breadcrumb';
import PageHeading from '../../../components/PageHeading';
import Input from '../../../components/FormElements/Input';
import Label from '../../../components/FormElements/Label';
import Loading from '../../../components/Loading';
import PrimaryButton from '../../../components/PrimaryButton';

export default function BookingForm() {
  const { id } = useParams();
  const { booking, isLoadingBooking } = useBooking(id);
  const [activeTab, setActiveTab] = useState('booking');

  if (isLoadingBooking) return <Loading />;
  if (!booking) return <p>No booking found.</p>;

  const { pickup, dropoff, bookingDetails, orderSummary, vehicle } = booking;

  return (
    <>
      <Helmet>
        <title>Booking #{booking.bookingRef}</title>
      </Helmet>

      <Breadcrumb
        paths={[
          { label: 'Home', href: '/' },
          { label: 'Bookings', href: '/bookings' },
          { label: booking.bookingRef, href: `/bookings/${booking.id}` },
        ]}
      />

      <PageHeading className="mb-5 flex justify-between items-center">
        <span>Booking #{booking.bookingRef}</span>
        <PrimaryButton size="small">Edit Booking</PrimaryButton>
      </PageHeading>

      {/* Tabs */}
      <div className="flex gap-2 text-sm mb-5">
        {['booking', 'passenger', 'vehicle'].map((item) => (
          <button
            key={item}
            onClick={() => setActiveTab(item)}
            type="button"
            className={`px-3 py-2 rounded-sm duration-300 cursor-pointer outline-0 ${
              activeTab === item
                ? 'bg-primary-900 text-white'
                : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
            }`}
          >
            {item === 'booking' && 'Booking Info'}
            {item === 'passenger' && 'Passenger & Payment'}
            {item === 'vehicle' && 'Vehicle & Zones'}
          </button>
        ))}
      </div>

      {/* Tab content container */}
      <div className="min-h-[450px] bg-white p-7 rounded-xl shadow-lg overflow-scroll">
        {activeTab === 'booking' && <BookingInfoTab booking={booking} />}
        {activeTab === 'passenger' && (
          <PassengerPaymentTab
            bookingDetails={bookingDetails}
            orderSummary={orderSummary}
          />
        )}
        {activeTab === 'vehicle' && (
          <VehicleZonesTab
            vehicle={vehicle}
            pickup={pickup}
            dropoff={dropoff}
          />
        )}
      </div>
    </>
  );
}

/* ---------- TAB 1 ---------- */
function BookingInfoTab({ booking }) {
  return (
    <div className="flex flex-col gap-4">
      <FormRow>
        <Label>Booking Reference</Label>
        <Input className="col-span-3" value={booking.bookingRef} disabled />
      </FormRow>
      <FormRow>
        <Label>Trip Type</Label>
        <Input className="col-span-3" value={booking.tripType} disabled />
      </FormRow>
      <FormRow>
        <Label>Pickup Date</Label>
        <Input className="col-span-3" value={booking.pickupDate} disabled />
      </FormRow>
      <FormRow>
        <Label>Pickup Time</Label>
        <Input className="col-span-3" value={booking.pickupTime} disabled />
      </FormRow>
      <FormRow>
        <Label>Created At</Label>
        <Input
          className="col-span-3"
          value={new Date(booking.createdAt).toLocaleString()}
          disabled
        />
      </FormRow>
    </div>
  );
}

/* ---------- TAB 2 ---------- */
function PassengerPaymentTab({ bookingDetails, orderSummary }) {
  return (
    <div className="flex flex-col gap-4">
      <FormRow>
        <Label>Passenger Name</Label>
        <Input
          className="col-span-3"
          value={`${bookingDetails.firstName} ${bookingDetails.lastName}`}
          disabled
        />
      </FormRow>
      <FormRow>
        <Label>Email</Label>
        <Input className="col-span-3" value={bookingDetails.email} disabled />
      </FormRow>

      <FormRow>
        <Label>Phone</Label>
        <Input
          className="col-span-3"
          value={bookingDetails.phoneNumber}
          disabled
        />
      </FormRow>
      <FormRow>
        <Label>Flight Number</Label>
        <Input
          className="col-span-3"
          value={bookingDetails.flightNumber || '-'}
          disabled
        />
      </FormRow>

      <FormRow>
        <Label>Arrival Time</Label>
        <Input
          className="col-span-3"
          value={bookingDetails.arrivalTime || '-'}
          disabled
        />
      </FormRow>
      <FormRow>
        <Label>Message</Label>
        <Input
          className="col-span-3"
          value={bookingDetails.message || '-'}
          disabled
        />
      </FormRow>

      {/* Payment Info */}
      <FormRow>
        <Label>Payment Method</Label>
        <Input
          className="col-span-3"
          value={bookingDetails.payment.method.toUpperCase()}
          disabled
        />
      </FormRow>
      <FormRow>
        <Label>Payment Status</Label>
        <Input
          className="col-span-3"
          value={bookingDetails.payment.status}
          disabled
        />
      </FormRow>
      <FormRow>
        <Label>Transaction ID</Label>
        <Input
          className="col-span-3"
          value={bookingDetails.payment.transactionId || '-'}
          disabled
        />
      </FormRow>
      <FormRow>
        <Label>Total Amount</Label>
        <Input
          className="col-span-3"
          value={`${orderSummary.total} ${orderSummary.currency.toUpperCase()}`}
          disabled
        />
      </FormRow>
    </div>
  );
}

/* ---------- TAB 3 ---------- */
function VehicleZonesTab({ vehicle, pickup, dropoff }) {
  return (
    <div className="flex flex-col gap-4">
      <FormRow>
        <Label>Vehicle</Label>
        <Input
          className="col-span-3"
          value={`${vehicle.brand} ${vehicle.model} (${vehicle.class} ${vehicle.type})`}
          disabled
        />
      </FormRow>

      <FormRow>
        <Label>Pickup</Label>
        <Input
          className="col-span-3"
          value={`${pickup.name} - ${pickup.address}` || '-'}
          disabled
        />
      </FormRow>

      <FormRow>
        <Label>Pickup Zone</Label>
        <Input
          className="col-span-3"
          value={`${pickup?.zone?.name}` || '-'}
          disabled
        />
      </FormRow>

      <FormRow>
        <Label>Dropoff</Label>
        <Input
          className="col-span-3"
          value={`${dropoff.name} - ${dropoff.address}` || '-'}
          disabled
        />
      </FormRow>

      <FormRow>
        <Label>Dropoff Zone</Label>
        <Input
          className="col-span-3"
          value={`${dropoff?.zone?.name}` || '-'}
          disabled
        />
      </FormRow>
    </div>
  );
}

function FormRow({ children }) {
  return <div className="grid grid-cols-4 items-center">{children}</div>;
}
