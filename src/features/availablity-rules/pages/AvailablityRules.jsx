import { Helmet } from 'react-helmet-async';
import Breadcrumb from '../../../components/Breadcrumb';
import PageHeading from '../../../components/PageHeading';
import PrimaryLink from '../../../components/PrimaryLink';

export default function AvailabilityRules() {
  return (
    <>
      <Helmet>
        <title>Pricing</title>
      </Helmet>
      <Breadcrumb
        paths={[
          { label: 'Home', href: '/' },
          { label: 'Availability Rules', href: '/availability-rules' },
        ]}
      />
      <PageHeading className="mb-5 flex gap-6 items-center">
        <span>Availability Rules</span>
        <PrimaryLink to="/availability-rules/create" size="small">
          Create Rule
        </PrimaryLink>
      </PageHeading>
    </>
  );
}
