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

  const { register, handleSubmit, reset, control } = useForm();

  function onSubmit(data) {
    console.log(data);
    const transformedVehicles = Object.entries(data.vehicles || {}).map(
      ([vehicle, available]) => ({
        vehicle,
        available: available === 'true',
      })
    );

    console.log('Transformed Vehicles: ', transformedVehicles);

    const finalData = {
      name: data.name,
      pickupZones: data.pickupZones,
      dropoffZones: data.dropoffZones,
      vehicles: transformedVehicles,
    };

    console.log('Final data: ', finalData);

    updateAvailabilityRule({ id, data: finalData });
  }

  useEffect(() => {
    if (availabilityRule && zones?.length && vehicles?.length) {
      const vehicleMap = {};
      availabilityRule.vehicles.forEach((v) => {
        vehicleMap[v._id] = v.available ? 'true' : 'false';
      });

      reset({
        name: availabilityRule.name,
        pickupZones: availabilityRule.pickupZones?.map((z) => z._id),
        dropoffZones: availabilityRule.dropoffZones?.map((z) => z._id),
        vehicles: vehicleMap,
      });
    }
  }, [id, availabilityRule, zones, vehicles, reset]);

  return (
    <>
      <Helmet>
        <title>{`${availabilityRule?.name} | Availability Rules`}</title>
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
        control={control}
      />
    </>
  );
}
