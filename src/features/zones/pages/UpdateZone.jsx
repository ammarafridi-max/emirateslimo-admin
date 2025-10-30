import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import Breadcrumb from '../../../components/Breadcrumb';
import PageHeading from '../../../components/PageHeading';
import { useZones } from '../hooks/useZones';
import { useUpdateZone } from '../hooks/useUpdateZone';
import { useDeleteZone } from '../hooks/useDeleteZone';
import ZoneForm from '../components/ZoneForm';

export default function UpdateZone() {
  const { id } = useParams();
  const { zones } = useZones();
  const { updateZone, isUpdating } = useUpdateZone();
  const { deleteZone, isDeleting } = useDeleteZone();

  const zone = zones?.find((z) => z._id === id);

  function handleUpdate(data) {
    updateZone({ id, zoneData: data });
  }

  function handleDelete() {
    if (confirm('Are you sure you want to delete this zone?')) {
      deleteZone(id);
    }
  }

  if (!zone) return null;

  return (
    <>
      <Helmet>
        <title>{zone.name}</title>
      </Helmet>

      <Breadcrumb
        paths={[
          { label: 'Home', href: '/' },
          { label: 'Zones', href: '/zones' },
          { label: 'Update Zone', href: `/zones/update/${id}` },
        ]}
      />

      <PageHeading className="mb-5">Update Zone</PageHeading>

      <ZoneForm
        mode="update"
        initialData={zone}
        onSubmit={handleUpdate}
        onDelete={handleDelete}
        isLoading={isUpdating}
        isDeleting={isDeleting}
      />
    </>
  );
}
