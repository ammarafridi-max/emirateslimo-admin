import { Helmet } from 'react-helmet-async';
import { useAvailabilityRules } from '../hooks/useAvailabilityRules';
import { useDeleteAvailabilityRule } from '../hooks/useDeleteAvailabilityRule';
import Breadcrumb from '../../../components/Breadcrumb';
import PageHeading from '../../../components/PageHeading';
import PrimaryLink from '../../../components/PrimaryLink';
import Table from '../../../components/Table';
import Loading from '../../../components/Loading';

export default function AvailabilityRules() {
  const { availabilityRules, isLoadingAvailabilityRules } =
    useAvailabilityRules();
  const { deleteAvailabilityRule, isDeletingAvailabilityRule } =
    useDeleteAvailabilityRule();

  if (isLoadingAvailabilityRules) return <Loading />;

  return (
    <>
      <Helmet>
        <title>Availability Rules</title>
      </Helmet>
      <Breadcrumb
        paths={[
          { label: 'Home', href: '/' },
          { label: 'Availability Rules', href: '/availability-rules' },
        ]}
      />
      <PageHeading className="mb-6 flex flex-wrap gap-4 items-center justify-between">
        <span className="text-[26px] font-semibold text-gray-900">
          Availability Rules
        </span>
        <PrimaryLink to="/availability-rules/create" size="small">
          + Create Rule
        </PrimaryLink>
      </PageHeading>
      <Table $columntemplate="2fr 3fr 3fr 3fr">
        <Table.Head>
          <Table.Heading>Rule Name</Table.Heading>
          <Table.Heading>Pickup Zone(s)</Table.Heading>
          <Table.Heading>Dropoff Zone(s)</Table.Heading>
          <Table.Heading>Available Vehicles(s)</Table.Heading>
        </Table.Head>
        {availabilityRules?.map((rule) => (
          <Table.Row key={rule?._id} href={`/availability-rules/${rule._id}`}>
            <Table.Item>
              <span>{rule?.name}</span>
              <span className="flex gap-2">
                <Table.DeleteLink
                  onClick={() => deleteAvailabilityRule(rule?._id)}
                  isDeleting={isDeletingAvailabilityRule}
                />
                {/* <Table.DuplicateLink
                  onClick={() => duplicatePricingRule(rule?._id)}
                /> */}
              </span>
            </Table.Item>
            <Table.Item>
              {rule.pickupZones.map((zone, i) => (
                <Table.Link key={i} href={`/zones/${zone?._id}`}>
                  {zone.name}
                </Table.Link>
              ))}
            </Table.Item>
            <Table.Item>
              {rule.dropoffZones.map((zone, i) => (
                <Table.Link key={i} href={`/zones/${zone?._id}`}>
                  {zone.name}
                </Table.Link>
              ))}
            </Table.Item>
            <Table.Item>
              {rule.vehicles
                .filter((veh) => veh?.available)
                .map((veh, i) => (
                  <Table.Link key={i} href={`/vehicles/${veh?._id}`}>
                    {veh?.brand} {veh?.model}
                  </Table.Link>
                ))}
            </Table.Item>
          </Table.Row>
        ))}
      </Table>
    </>
  );
}
