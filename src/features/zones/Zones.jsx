import { useZones } from './useZones';
import { useDuplicateZone } from './useDuplicateZone';
import { useDeleteZone } from './useDeleteZone';
import Breadcrumb from '../../components/Breadcrumb';
import PageHeading from '../../components/PageHeading';
import Table from '../../components/Table';
import Loading from '../../components/Loading';
import PrimaryLink from '../../components/PrimaryLink';

export default function Zones() {
  const { zones, isLoadingZones } = useZones();
  const { duplicateZone, isDuplicating } = useDuplicateZone();
  const { deleteZone, isDeleting } = useDeleteZone();

  if (isLoadingZones) return <Loading />;
  return (
    <>
      <Breadcrumb
        paths={[
          { label: 'Home', href: '/' },
          { label: 'Zones', href: '/zones' },
        ]}
      />
      <PageHeading className="mb-5 flex gap-6 items-center">
        <span>Zones</span>
        <PrimaryLink to="/zones/create" size="small">
          Create Zone
        </PrimaryLink>
      </PageHeading>

      <Table $columntemplate="1fr">
        <Table.Head>
          <Table.Heading>Zone Name</Table.Heading>
        </Table.Head>
        {zones?.map((zone) => (
          <Table.Row key={zone._id} href={`/zones/${zone._id}`}>
            <Table.Item>
              <div>{zone.name}</div>
              <div className="flex gap-2">
                <Table.DeleteLink onClick={() => deleteZone(zone._id)} />
                <Table.DuplicateLink onClick={() => duplicateZone(zone)} />
              </div>
            </Table.Item>
          </Table.Row>
        ))}
      </Table>
    </>
  );
}
