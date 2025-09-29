import Breadcrumb from '../../components/Breadcrumb';
import PageHeading from '../../components/PageHeading';
import Table from '../../components/Table';

export default function Bookings() {
  return (
    <>
      <Breadcrumb
        paths={[
          { label: 'Home', href: '/' },
          { label: 'Bookings', href: '/bookings' },
        ]}
      />
      <PageHeading className="mb-5 flex gap-6 items-center">
        <span>Bookings</span>
        {/* <PrimaryLink to="/vehicles/create" size="small">
          Create Vehicle
        </PrimaryLink> */}
      </PageHeading>
      <Table $columntemplate="1fr 1fr 1fr 1fr 1fr">
        <Table.Head>
          <Table.Heading>Date Created</Table.Heading>
          <Table.Heading>Passenger</Table.Heading>
          <Table.Heading>Amount</Table.Heading>
          <Table.Heading>Vehicle</Table.Heading>
          <Table.Heading>Trip Information</Table.Heading>
        </Table.Head>
        {/* {zones?.map((zone) => (
          <Table.Row key={zone._id} href={`/zones/${zone._id}`}>
            <Table.Item>
              <div>{zone.name}</div>
              <div className="flex gap-2">
                <Table.DeleteLink onClick={() => deleteZone(zone._id)} />
                <Table.DuplicateLink onClick={() => duplicateZone(zone)} />
              </div>
            </Table.Item>
          </Table.Row>
        ))} */}
      </Table>
    </>
  );
}
