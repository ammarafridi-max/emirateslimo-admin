import { Helmet } from 'react-helmet-async';
import Breadcrumb from '../../../components/Breadcrumb';
import PageHeading from '../../../components/PageHeading';
import Table from '../../../components/Table';

export default function Bookings() {
  // 🔹 Sample booking data (replace later with API)
  const bookings = [
    {
      id: 'B001',
      createdAt: '2025-10-22T09:30:00Z',
      passenger: 'John Smith',
      amount: 320,
      vehicle: 'Mercedes S-Class',
      tripInfo: 'Dubai Airport → Downtown Dubai',
    },
    {
      id: 'B002',
      createdAt: '2025-10-21T14:00:00Z',
      passenger: 'Emma Johnson',
      amount: 540,
      vehicle: 'Tesla Model X',
      tripInfo: 'Abu Dhabi → Dubai Marina',
    },
    {
      id: 'B003',
      createdAt: '2025-10-20T19:45:00Z',
      passenger: 'Ahmed Khan',
      amount: 420,
      vehicle: 'BMW 7 Series',
      tripInfo: 'Sharjah → Dubai Mall',
    },
    {
      id: 'B004',
      createdAt: '2025-10-19T08:15:00Z',
      passenger: 'Sofia Williams',
      amount: 260,
      vehicle: 'Lexus ES',
      tripInfo: 'Dubai Marina → Palm Jumeirah',
    },
  ];

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
        <span className="text-[26px] font-semibold text-gray-900">
          Bookings
        </span>
      </PageHeading>

      {/* Table Container */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        {bookings?.length > 0 ? (
          <Table $columntemplate="1.5fr_1.5fr_1fr_1.5fr_2.5fr">
            <Table.Head>
              <Table.Heading>Date Created</Table.Heading>
              <Table.Heading>Passenger</Table.Heading>
              <Table.Heading textAlign="right">Amount (AED)</Table.Heading>
              <Table.Heading>Vehicle</Table.Heading>
              <Table.Heading>Trip Information</Table.Heading>
            </Table.Head>

            {bookings.map((b) => (
              <Table.Row key={b.id} href={`/bookings/${b.id}`}>
                <Table.Item>
                  {new Date(b.createdAt).toLocaleDateString('en-GB', {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </Table.Item>
                <Table.Item>{b.passenger}</Table.Item>
                <Table.Item
                  textAlign="right"
                  className="font-medium text-gray-800"
                >
                  {b.amount.toLocaleString()}
                </Table.Item>
                <Table.Item className="text-gray-700">{b.vehicle}</Table.Item>
                <Table.Item className="text-gray-600">{b.tripInfo}</Table.Item>
              </Table.Row>
            ))}
          </Table>
        ) : (
          <div className="text-center py-12 text-gray-500 text-sm">
            No bookings found.
          </div>
        )}
      </div>
    </>
  );
}
