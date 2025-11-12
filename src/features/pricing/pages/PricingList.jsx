import { Helmet } from 'react-helmet-async';
import { usePricingRules } from '../hooks/usePricingRules';
import { useDeletePricingRule } from '../hooks/useDeletePricingRule';
import { useDuplicatePricingRule } from '../hooks/useDuplicatePricingRule';
import PageHeading from '../../../components/PageHeading';
import Breadcrumb from '../../../components/Breadcrumb';
import Table from '../../../components/Table';
import PrimaryLink from '../../../components/PrimaryLink';
import Loading from '../../../components/Loading';
import PricingFilters from '../components/PricingFilters';

export default function PricingList() {
  const { pricingRules, isLoadingPricingRules } = usePricingRules();
  const { deletePricingRule, isDeletingPricingRule } = useDeletePricingRule();
  const { duplicatePricingRule, isDuplicatingPricingRule } =
    useDuplicatePricingRule();

  if (isLoadingPricingRules) return <Loading />;

  return (
    <>
      <Helmet>
        <title>Pricing Rules</title>
      </Helmet>
      <Breadcrumb
        paths={[
          { label: 'Home', href: '/' },
          { label: 'Pricing', href: '/pricing' },
        ]}
      />

      <div className="mb-6 flex flex-wrap gap-4 items-center justify-between">
        <PageHeading>Pricing</PageHeading>
        <PrimaryLink to="/pricing/create" size="small">
          + Create Rule
        </PrimaryLink>
      </div>

      <PricingFilters />

      <Table $columntemplate="4fr 1fr 2fr 2fr 1fr">
        <Table.Head>
          <Table.Heading>Name</Table.Heading>
          <Table.Heading>Vehicles</Table.Heading>
          <Table.Heading>From Zone</Table.Heading>
          <Table.Heading>To Zone</Table.Heading>
          <Table.Heading>Pricing</Table.Heading>
        </Table.Head>
        {pricingRules.length ? (
          pricingRules?.map((rule) => (
            <Table.Row key={rule?._id} href={`/pricing/${rule._id}`}>
              <Table.Item>
                <span>{rule?.name}</span>
                <div className="flex gap-2 mt-2">
                  <Table.DeleteLink
                    onClick={() => deletePricingRule(rule?._id)}
                  />
                  <Table.DuplicateLink
                    onClick={() => duplicatePricingRule(rule?._id)}
                  />
                </div>
              </Table.Item>
              <Table.Item>
                {rule?.vehicles.map((vehicle) => (
                  <Table.Link
                    key={vehicle?._id}
                    href={`/vehicles/${vehicle?._id}`}
                  >
                    {vehicle.brand} {vehicle.model}
                  </Table.Link>
                ))}
              </Table.Item>
              <Table.Item>
                {rule?.pickupZones.map((zone) => (
                  <Table.Link key={zone?._id} href={`/zones/${zone?._id}`}>
                    {zone.name}
                  </Table.Link>
                ))}
              </Table.Item>
              <Table.Item>
                {rule?.dropoffZones.map((zone) => (
                  <Table.Link key={zone?._id} href={`/zones/${zone?._id}`}>
                    {zone.name}
                  </Table.Link>
                ))}
              </Table.Item>
              <Table.Item>
                <span className="block font-extralight">
                  One Way: {rule?.pricing?.oneWay}
                </span>
                <span className="block font-extralight">
                  Return: {rule?.pricing?.return}
                </span>
              </Table.Item>
            </Table.Row>
          ))
        ) : (
          <div className="text-center text-gray-500 py-10">
            No pricing rules found for the selected filters.
          </div>
        )}
      </Table>
    </>
  );
}
