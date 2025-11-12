import { Helmet } from 'react-helmet-async';
import { useBookings } from '../hooks/useBookings';
import Loading from '../../../components/Loading';
import Breadcrumb from '../../../components/Breadcrumb';
import PageHeading from '../../../components/PageHeading';
import Table from '../../../components/Table';
import { useDeleteBooking } from '../hooks/useDeleteBooking';
import Filter from '../components/Filter';

export default function Bookings() {
  const { bookings, isLoadingBookings } = useBookings();
  const { deleteBooking, isDeletingBooking } = useDeleteBooking();

  if (isLoadingBookings) return <Loading />;

  return (
    <>
      <Helmet>
        <title>Bookings</title>
      </Helmet>

      {/* Breadcrumb */}
      <Breadcrumb
        paths={[
          { label: 'Home', href: '/' },
          { label: 'Bookings', href: '/bookings' },
        ]}
      />

      {/* Page Heading */}
      <PageHeading className="mb-6 flex gap-6 items-center justify-between">
        Bookings
      </PageHeading>

      <Filter />

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        {bookings?.length > 0 ? (
          <Table $columntemplate="2fr 6fr 1fr 1fr">
            <Table.Head>
              <Table.Heading>Booking</Table.Heading>
              <Table.Heading>Trip Information</Table.Heading>
              <Table.Heading textAlign="right">Amount</Table.Heading>
            </Table.Head>

            {bookings.map((b) => (
              <Table.Row key={b._id} href={`/bookings/${b._id}`}>
                {/* Booking Information */}
                <Table.Item>
                  <div className="flex flex-col gap-1">
                    <span className="font-normal text-gray-900 capitalize">
                      {b.tripType} trip
                    </span>
                    <span className="text-sm text-gray-500">
                      {b.bookingRef}
                    </span>
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

                {/* Trip Information */}
                <Table.Item>
                  <div className="flex flex-col gap-1">
                    <div className="text-gray-700 font-medium">
                      {b.pickup?.name || b.pickup?.address}
                      {' > '}
                      {b.dropoff?.name || b.dropoff?.address}
                    </div>
                    <div className="text-sm text-primary-400">
                      <span className="font-medium text-gray-900">Zones:</span>
                      {'  '}
                      {b?.pickup?.zone?.name} {' > '} {b?.dropoff?.zone?.name}
                    </div>
                    <div className="text-sm text-primary-400">
                      <span className="font-medium text-gray-900">Pickup:</span>{' '}
                      {b.pickupDate} • {b.pickupTime}
                    </div>
                    <div className="text-sm text-primary-400">
                      <span className="font-medium text-gray-900">
                        Vehicle:
                      </span>{' '}
                      {b.vehicle?.brand} {b.vehicle?.model}
                    </div>
                  </div>
                </Table.Item>

                {/* Amount */}
                <Table.Item textAlign="right">
                  <div className="flex flex-col items-end gap-1">
                    <span className="font-semibold text-gray-900">
                      {b?.orderSummary?.currency.toUpperCase()}{' '}
                      {b?.orderSummary?.total?.toLocaleString()}
                    </span>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold w-fit ${
                        b.bookingDetails?.payment?.status === 'PAID'
                          ? 'bg-green-100 text-green-700'
                          : b.bookingDetails?.payment?.status === 'PENDING'
                            ? 'bg-yellow-100 text-yellow-700'
                            : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {b.bookingDetails?.payment?.status || 'UNPAID'}
                    </span>
                  </div>
                </Table.Item>

                <Table.Item>
                  <Table.DeleteLink
                    onClick={() => deleteBooking(b?._id)}
                    isDeleting={isDeletingBooking}
                  />
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
