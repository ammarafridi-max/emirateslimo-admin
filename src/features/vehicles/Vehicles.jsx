import { useVehicles } from './useVehicles';
import { useDeleteVehicle } from './useDeleteVehicle';
import Breadcrumb from '../../components/Breadcrumb';
import PageHeading from '../../components/PageHeading';
import Table from '../../components/Table';
import PrimaryLink from '../../components/PrimaryLink';
import { useDuplicateVehicle } from './useDuplicateVehicle';

export default function Vehicles() {
  const { vehicles } = useVehicles();
  const { deleteVehicle, isDeletingVehicle } = useDeleteVehicle();
  const { duplicateVehicle, isDuplicatingVehicle } = useDuplicateVehicle();

  return (
    <>
      <Breadcrumb
        paths={[
          { label: 'Home', href: '/' },
          { label: 'Vehicles', href: '/vehicles' },
        ]}
      />
      <PageHeading className="mb-5 flex gap-6 items-center">
        <span>Vehicles</span>
        <PrimaryLink to="/vehicles/create" size="small">
          Create Vehicle
        </PrimaryLink>
      </PageHeading>
      <Table $columntemplate="3fr_1.25fr_1.25fr_1.5fr_1.5fr_3.5fr">
        <Table.Head>
          <Table.Heading>Vehicle</Table.Heading>
          <Table.Heading textAlign="center">Passengers</Table.Heading>
          <Table.Heading textAlign="center">Luggage</Table.Heading>
          <Table.Heading textAlign="center">Type</Table.Heading>
          <Table.Heading textAlign="center">Class</Table.Heading>
          <Table.Heading>Pricing</Table.Heading>
        </Table.Head>
        {vehicles?.map((vehicle) => (
          <Table.Row href={`/vehicles/${vehicle._id}`}>
            <Table.Item>
              <div>
                {vehicle?.year} {vehicle?.brand} {vehicle?.model}
              </div>
              <div className="flex gap-2">
                <Table.DeleteLink onClick={() => deleteVehicle(vehicle?._id)} />
                <Table.DuplicateLink
                  onClick={() => duplicateVehicle(vehicle?._id)}
                />
              </div>
            </Table.Item>
            <Table.Item textAlign="center">{vehicle?.passengers}</Table.Item>
            <Table.Item textAlign="center">{vehicle?.luggage}</Table.Item>
            <Table.Item textAlign="center">{vehicle?.type}</Table.Item>
            <Table.Item textAlign="center">{vehicle?.class}</Table.Item>
            <Table.Item>
              <div className="flex">
                <span className="font-medium mr-2">Starting Price: </span>
                {vehicle?.pricing?.initialPrice}
              </div>
              <div className="flex">
                <span className="font-medium mr-2">Per Hour: </span>
                {vehicle?.pricing?.pricePerHour}
              </div>
              <div className="flex">
                <span className="font-medium mr-2">Per KM: </span>
                {vehicle?.pricing?.pricePerKm}
              </div>
            </Table.Item>
          </Table.Row>
        ))}
      </Table>
    </>
  );
}
