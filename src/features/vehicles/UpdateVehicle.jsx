import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useVehicle } from './useVehicle';
import { useUpdateVehicle } from './useUpdateVehicle';
import Breadcrumb from '../../components/Breadcrumb';
import PageHeading from '../../components/PageHeading';
import VehicleForm from './VehicleForm';

export default function UpdateVehicle() {
  const { id } = useParams();
  const { data: vehicle, isLoading } = useVehicle(id);
  const { updateVehicle, isUpdatingVehicle } = useUpdateVehicle();

  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    if (vehicle) {
      reset({
        brand: vehicle.brand,
        model: vehicle.model,
        year: vehicle.year,
        passengers: vehicle.passengers,
        luggage: vehicle.luggage,
        type: vehicle.type,
        class: vehicle.class,
        initialPrice: vehicle.pricing?.initialPrice,
        pricePerHour: vehicle.pricing?.pricePerHour,
        pricePerKm: vehicle.pricing?.pricePerKm,
      });
    }
  }, [vehicle, reset]);

  function onSubmit(data) {
    const updateData = {
      ...data,
      pricing: {
        initialPrice: Number(data.initialPrice),
        pricePerHour: Number(data.pricePerHour),
        pricePerKm: Number(data.pricePerKm),
      },
    };
    updateVehicle({ id, data: updateData });
  }

  if (isLoading) return <p>Loading vehicle...</p>;

  return (
    <div>
      <Breadcrumb
        paths={[
          { label: 'Home', href: '/' },
          { label: 'Vehicles', href: '/vehicles' },
          { label: 'Update Vehicle', href: `/vehicles/${id}/edit` },
        ]}
      />
      <PageHeading>Update Vehicle</PageHeading>
      <VehicleForm
        register={register}
        onSubmit={handleSubmit(onSubmit)}
        isLoading={isUpdatingVehicle}
      />
    </div>
  );
}
