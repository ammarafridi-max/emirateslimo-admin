import { useZones } from '../hooks/useZones';
import { useDuplicateZone } from '../hooks/useDuplicateZone';
import { useDeleteZone } from '../hooks/useDeleteZone';
import Breadcrumb from '../../../components/Breadcrumb';
import PageHeading from '../../../components/PageHeading';
import Table from '../../../components/Table';
import Loading from '../../../components/Loading';
import PrimaryLink from '../../../components/PrimaryLink';
import { Helmet } from 'react-helmet-async';

export default function Zones() {
  const { zones, isLoadingZones } = useZones();
  const { duplicateZone, isDuplicating } = useDuplicateZone();
  const { deleteZone, isDeleting } = useDeleteZone();

  if (isLoadingZones) return <Loading />;

  return (
    <>
      <Helmet>
        <title>Zones</title>
      </Helmet>

      {/* Breadcrumb */}
      <Breadcrumb
        paths={[
          { label: 'Home', href: '/' },
          { label: 'Zones', href: '/zones' },
        ]}
      />

      {/* Page Header */}
      <div className="mb-6 flex flex-wrap gap-4 items-center justify-between">
        <PageHeading>Zones</PageHeading>
        <PrimaryLink to="/zones/create" size="small">
          + Create Zone
        </PrimaryLink>
      </div>

      {/* Zones Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        {zones?.length > 0 ? (
          <Table $columntemplate="3fr_1fr">
            <Table.Head>
              <Table.Heading>Zone Name</Table.Heading>
              <Table.Heading textAlign="right">Actions</Table.Heading>
            </Table.Head>

            {zones.map((zone) => (
              <Table.Row key={zone._id} href={`/zones/${zone._id}`}>
                <Table.Item textTransform="capitalize">{zone.name}</Table.Item>

                <Table.Item textAlign="right">
                  <div className="flex justify-end gap-3">
                    <Table.DuplicateLink
                      onClick={(e) => {
                        e.stopPropagation();
                        duplicateZone(zone);
                      }}
                    />
                    <Table.DeleteLink
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteZone(zone._id);
                      }}
                    />
                  </div>
                </Table.Item>
              </Table.Row>
            ))}
          </Table>
        ) : (
          <div className="text-center py-12 text-gray-500 text-sm">
            No zones created yet.
          </div>
        )}

        {(isDuplicating || isDeleting) && (
          <div className="text-center text-sm text-gray-500 py-2 border-t border-gray-100">
            {isDuplicating
              ? 'Duplicating zone...'
              : isDeleting
                ? 'Deleting zone...'
                : ''}
          </div>
        )}
      </div>
    </>
  );
}
