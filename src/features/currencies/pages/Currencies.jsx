import { Helmet } from 'react-helmet-async';
import Breadcrumb from '../../../components/Breadcrumb';
import PageHeading from '../../../components/PageHeading';
import PrimaryLink from '../../../components/PrimaryLink';

export default function Currencies() {
  return (
    <>
      <Helmet>
        <title>Currencies</title>
      </Helmet>
      <Breadcrumb
        paths={[
          { label: 'Home', href: '/' },
          { label: 'Currencies', href: '/currencies' },
        ]}
      />
      <div className="mb-6 flex flex-wrap gap-4 items-center justify-between">
        <PageHeading>Currencies</PageHeading>
        <PrimaryLink to="/currencies-rules/create" size="small">
          + Create Currency
        </PrimaryLink>
      </div>
    </>
  );
}
