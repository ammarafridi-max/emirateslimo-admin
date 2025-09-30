import { Helmet } from 'react-helmet-async';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAvailabilityRule } from '../hooks/useAvailabilityRule';
import { useUpdateAvailabilityRule } from '../hooks/useUpdateAvailabilityRule';
import Breadcrumb from '../../../components/Breadcrumb';
import AvailabilityForm from '../components/AvailabilityForm';
import Loading from '../../../components/Loading';
import { useZones } from '../../zones/hooks/useZones';
import { useVehicles } from '../../vehicles/hooks/useVehicles';

export default function UpdateAvailabilityRule() {
  const { id } = useParams();
  const { zones } = useZones();
  const { vehicles } = useVehicles();
  const { availabilityRule, isLoadingAvailabilityRule } =
    useAvailabilityRule(id);
  const { updateAvailabilityRule, isUpdatingAvailabilityRule } =
    useUpdateAvailabilityRule();
  const { register, handleSubmit, reset } = useForm();

  function onSubmit(data) {
    updateAvailabilityRule({ id, data });
  }

  useEffect(() => {
    if (availabilityRule && id && zones && vehicles) {
      reset({
        name: availabilityRule?.name,
        pickupZones: availabilityRule?.pickupZones?.map((zone) => zone._id),
        dropoffZones: availabilityRule.dropoffZones?.map((zone) => zone._id),
        vehicles: availabilityRule?.vehicles?.map((vehicle) => vehicle._id),
      });
    }
  }, [id, availabilityRule]);

  if (isLoadingAvailabilityRule) return <Loading />;

  return (
    <>
      <Helmet>
        <title>{`${availabilityRule?.name}`} | Availability Rules</title>
      </Helmet>
      <Breadcrumb
        paths={[
          { label: 'Home', href: '/' },
          { label: 'Availability Rules', href: '/availability-rules' },
          {
            label: availabilityRule?.name,
            href: `/availability-rules/${availabilityRule?._id}`,
          },
        ]}
      />
      <AvailabilityForm
        onSubmit={handleSubmit(onSubmit)}
        register={register}
        isLoading={isUpdatingAvailabilityRule}
      />
    </>
  );
}
