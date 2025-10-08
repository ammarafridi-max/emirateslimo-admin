import { Helmet } from 'react-helmet-async';
import AvailabilityForm from '../components/AvailabilityForm';
import Breadcrumb from '../../../components/Breadcrumb';
import { useForm } from 'react-hook-form';
import { useCreateAvailabilityRule } from '../hooks/useCreateAvailabilityRule';

export default function CreateAvailabilityRule() {
  const { register, handleSubmit } = useForm();
  const { createAvailabilityRule, isCreatingAvailabilityRule } =
    useCreateAvailabilityRule();

  function onSubmit(data) {
    const transformedVehicles = Object.entries(data.vehicles || {}).map(
      ([vehicleId, available]) => ({
        vehicleId,
        available,
      })
    );

    const finalData = {
      name: data.name,
      pickupZones: data.pickupZones,
      dropoffZones: data.dropoffZones,
      vehicles: transformedVehicles,
    };

    console.log(finalData);

    createAvailabilityRule(finalData);
  }

  return (
    <>
      <Helmet>
        <title>Create Availability Rule | Availability Rule</title>
      </Helmet>
      <Breadcrumb
        paths={[
          { label: 'Home', href: '/' },
          { label: 'Availability Rules', href: '/availability-rules' },
          {
            label: 'Create Availability Rule',
            href: '/availability-rules/create',
          },
        ]}
      />
      <AvailabilityForm onSubmit={handleSubmit(onSubmit)} register={register} />
    </>
  );
}
