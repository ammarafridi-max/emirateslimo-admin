import { Helmet } from 'react-helmet-async';
import AvailabilityForm from '../components/AvailabilityForm';
import Breadcrumb from '../../../components/Breadcrumb';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { useVehicles } from '../../vehicles/hooks/useVehicles';
import { useCreateAvailabilityRule } from '../hooks/useCreateAvailabilityRule';

export default function CreateAvailabilityRule() {
  const { register, handleSubmit, reset, control } = useForm();
  const { createAvailabilityRule, isCreatingAvailabilityRule } =
    useCreateAvailabilityRule();
  const { vehicles } = useVehicles();

  /**
   * ✅ Default all vehicles to "Available" when creating a new rule
   * Ensures no undefined keys in form and clean default UI state
   */
  useEffect(() => {
    if (vehicles?.length) {
      const defaultVehicles = {};
      vehicles.forEach((veh) => {
        defaultVehicles[veh._id] = 'true'; // default checked = Available
      });

      reset({ vehicles: defaultVehicles });
    }
  }, [vehicles, reset]);

  /**
   * ✅ Transform form data into backend-compatible structure
   * Schema now expects:
   *   vehicles: [{ vehicle: ObjectId, available: Boolean }]
   */
  function onSubmit(data) {
    const transformedVehicles = Object.entries(data.vehicles || {})
      .filter(([vehicle]) => vehicle && vehicle !== 'undefined') // safeguard
      .map(([vehicle, available]) => ({
        vehicle, // ✅ correct field name
        available: available === 'true',
      }));

    const finalData = {
      name: data.name,
      pickupZones: data.pickupZones,
      dropoffZones: data.dropoffZones,
      vehicles: transformedVehicles,
    };

    createAvailabilityRule(finalData);
  }

  return (
    <>
      <Helmet>
        <title>Create Availability Rule | Availability Rules</title>
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

      <AvailabilityForm
        onSubmit={handleSubmit(onSubmit)}
        register={register}
        control={control}
        isLoading={isCreatingAvailabilityRule}
      />
    </>
  );
}
