import { useVehicles } from '../hooks/useVehicles';
import { useDeleteVehicle } from '../hooks/useDeleteVehicle';
import { useDuplicateVehicle } from '../hooks/useDuplicateVehicle';
import Breadcrumb from '../../../components/Breadcrumb';
import PageHeading from '../../../components/PageHeading';
import Table from '../../../components/Table';
import PrimaryLink from '../../../components/PrimaryLink';
import Loading from '../../../components/Loading';
import { Helmet } from 'react-helmet-async';

export default function Vehicles() {
  const { vehicles, isLoadingVehicles } = useVehicles();
  const { deleteVehicle, isDeletingVehicle } = useDeleteVehicle();
  const { duplicateVehicle, isDuplicatingVehicle } = useDuplicateVehicle();

  if (isLoadingVehicles) return <Loading />;

  return (
    <>
      <Helmet>
        <title>Vehicles</title>
      </Helmet>

      {/* Breadcrumb */}
      <Breadcrumb
        paths={[
          { label: 'Home', href: '/' },
          { label: 'Vehicles', href: '/vehicles' },
        ]}
      />

      {/* Page Header */}
      <div className="mb-6 flex flex-wrap gap-4 items-center justify-between">
        <PageHeading>Vehicles</PageHeading>
        <PrimaryLink to="/vehicles/create" size="small">
          + Create Vehicle
        </PrimaryLink>
      </div>

      {/* Vehicles Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        {vehicles?.length > 0 ? (
          <Table $columntemplate="4fr_2fr_4fr">
            <Table.Head>
              <Table.Heading>Vehicle</Table.Heading>
              <Table.Heading>Pricing</Table.Heading>
              <Table.Heading textAlign="right">Actions</Table.Heading>
            </Table.Head>

            {vehicles.map((vehicle) => (
              <Table.Row key={vehicle._id} href={`/vehicles/${vehicle._id}`}>
                {/* Vehicle Info */}
                <Table.Item textTransform="capitalize">
                  <div className="font-medium text-gray-900">
                    {vehicle?.brand} {vehicle?.model}
                  </div>
                  <div className="flex flex-wrap gap-2 text-[13px] text-gray-500 mt-0.5">
                    {vehicle?.type && (
                      <span className="bg-gray-100 px-2 py-0.5 rounded-md">
                        {vehicle.type}
                      </span>
                    )}
                    {vehicle?.class && (
                      <span className="bg-gray-100 px-2 py-0.5 rounded-md">
                        {vehicle.class}
                      </span>
                    )}
                    {vehicle?.passengers && (
                      <span className="bg-gray-100 px-2 py-0.5 rounded-md">
                        {vehicle.passengers} Passengers
                      </span>
                    )}
                    {vehicle?.luggage && (
                      <span className="bg-gray-100 px-2 py-0.5 rounded-md">
                        {vehicle.luggage} Luggage
                      </span>
                    )}
                  </div>
                </Table.Item>

                {/* Pricing */}
                <Table.Item>
                  <div className="space-y-1 text-[14px]">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Starting:</span>
                      <span className="font-medium text-gray-800">
                        AED {vehicle?.pricing?.initialPrice || 0}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Per Hour:</span>
                      <span className="font-medium text-gray-800">
                        AED {vehicle?.pricing?.pricePerHour || 0}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Per KM:</span>
                      <span className="font-medium text-gray-800">
                        AED {vehicle?.pricing?.pricePerKm || 0}
                      </span>
                    </div>
                  </div>
                </Table.Item>

                {/* Actions */}
                <Table.Item textAlign="right">
                  <div className="flex justify-end gap-3">
                    <Table.DuplicateLink
                      onClick={(e) => {
                        e.stopPropagation();
                        duplicateVehicle(vehicle._id);
                      }}
                    />
                    <Table.DeleteLink
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteVehicle(vehicle._id);
                      }}
                    />
                  </div>
                </Table.Item>
              </Table.Row>
            ))}
          </Table>
        ) : (
          <div className="text-center py-12 text-gray-500 text-sm">
            No vehicles added yet.
          </div>
        )}

        {(isDuplicatingVehicle || isDeletingVehicle) && (
          <div className="text-center text-sm text-gray-500 py-2 border-t border-gray-100">
            {isDuplicatingVehicle
              ? 'Duplicating vehicle...'
              : isDeletingVehicle
                ? 'Deleting vehicle...'
                : ''}
          </div>
        )}
      </div>
    </>
  );
}
