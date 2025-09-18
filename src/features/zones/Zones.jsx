import { useZones } from './useZones';
import Breadcrumb from '../../components/Breadcrumb';
import PageHeading from '../../components/PageHeading';
import Table from '../../components/Table';
import Loading from '../../components/Loading';
import PrimaryLink from '../../components/PrimaryLink';

export default function Zones() {
  const { zones, isLoadingZones } = useZones();

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
      <Table $columntemplate="3fr_1.25fr_1.25fr_1.5fr_1.5fr_3.5fr">
        <Table.Head>
          <Table.Heading>Zone Name</Table.Heading>
        </Table.Head>
        {zones?.map((zone) => (
          <Table.Row href={`/zones/${zone._id}`}>
            <Table.Item>{zone.name}</Table.Item>
          </Table.Row>
        ))}
      </Table>
    </>
  );
}
