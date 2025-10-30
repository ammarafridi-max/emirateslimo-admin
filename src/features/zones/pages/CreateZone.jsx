import { Helmet } from 'react-helmet-async';
import Breadcrumb from '../../../components/Breadcrumb';
import PageHeading from '../../../components/PageHeading';
import { useCreateZone } from '../hooks/useCreateZone';
import ZoneForm from '../components/ZoneForm';

export default function CreateZone() {
  const { createZone, isCreating } = useCreateZone();

  function handleSubmit(data) {
    createZone(data);
  }

  return (
    <>
      <Helmet>
        <title>Create Zone</title>
      </Helmet>

      <Breadcrumb
        paths={[
          { label: 'Home', href: '/' },
          { label: 'Zones', href: '/zones' },
          { label: 'Create Zone', href: '/zones/create' },
        ]}
      />

      <PageHeading className="mb-5">Create Zone</PageHeading>

      <ZoneForm mode="create" onSubmit={handleSubmit} isLoading={isCreating} />
    </>
  );
}
