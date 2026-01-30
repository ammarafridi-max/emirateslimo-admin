import { Helmet } from 'react-helmet-async';
import { useBookings } from '../hooks/useBookings';
import Loading from '../../../components/Loading';
import Breadcrumb from '../../../components/Breadcrumb';
import PageHeading from '../../../components/PageHeading';
import PrimaryLink from '../../../components/PrimaryLink';
import Table from '../../../components/Table';
import SuccessPill from '../../../components/SuccessPill';
import DangerPill from '../../../components/DangerPill';
import BookingsFilter from '../components/BookingsFilter';

export default function Bookings() {
  const { bookings, isLoadingBookings } = useBookings();
  if (isLoadingBookings) return <Loading />;

  return (
    <>
      <Helmet>
        <title>Bookings</title>
      </Helmet>

      <Breadcrumb
        paths={[
          { label: 'Home', href: '/' },
          { label: 'Bookings', href: '/bookings' },
        ]}
      />

      <div className="mb-6 flex flex-wrap gap-4 items-center justify-between">
        <PageHeading>Bookings</PageHeading>
        <PrimaryLink to="/bookings/calendar" size="small">
          Calendar
        </PrimaryLink>
      </div>

      <BookingsFilter />

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        {bookings?.length > 0 ? (
          <Table $columntemplate="2fr 7fr 1fr">
            <Table.Head>
              <Table.Heading>Booking</Table.Heading>
              <Table.Heading>Trip Information</Table.Heading>
              <Table.Heading textAlign="right">Amount</Table.Heading>
            </Table.Head>

            {bookings.map((b) => (
              <Table.Row key={b._id} href={`/bookings/${b._id}`}>
                <Table.Item>
                  <div className="flex flex-col gap-1">
                    <span className="font-normal text-gray-900 capitalize">{b.tripType} trip</span>
                    <span className="text-sm text-gray-500">{b.bookingRef}</span>
                    <span className="text-sm text-gray-500">
                      {new Date(b.createdAt).toLocaleString('en-GB', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                    <span className="text-gray-800 font-medium">
                      {b.bookingDetails?.firstName} {b.bookingDetails?.lastName}
                    </span>
                  </div>
                </Table.Item>

                <Table.Item>
                  <div className="flex flex-col gap-0.5">
                    <div className="text-gray-700 font-medium">
                      {b.pickup?.name || b.pickup?.address}
                      {b.dropoff.name && ' > ' + (b.dropoff?.name || b.dropoff?.address)}
                    </div>
                    <div className="text-sm font-light text-primary-500">
                      {'  '}
                      {b?.pickup?.zone?.name}
                      {b?.dropoff?.zone?.name && ' > ' + b?.dropoff?.zone?.name}
                    </div>
                    <div className="text-sm font-light text-primary-500">
                      {new Date(b.pickupDate).toLocaleString('en-GB', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
                      })}{' '}
                      • {b.pickupTime}
                    </div>
                    <div className="text-sm font-light text-primary-500">
                      {b.vehicle?.brand} {b.vehicle?.model}
                    </div>
                  </div>
                </Table.Item>

                <Table.Item textAlign="right">
                  <div className="flex flex-col items-end gap-1">
                    <span className="font-semibold text-gray-900">
                      {b?.orderSummary?.currency.toUpperCase()} {b?.orderSummary?.total?.toLocaleString()}
                    </span>
                    {b.payment?.status.toUpperCase() === 'PAID' ? (
                      <SuccessPill>PAID</SuccessPill>
                    ) : (
                      <DangerPill>UNPAID</DangerPill>
                    )}
                  </div>
                </Table.Item>
              </Table.Row>
            ))}
          </Table>
        ) : (
          <div className="p-6 text-center text-gray-500">No bookings found</div>
        )}
      </div>
    </>
  );
}
