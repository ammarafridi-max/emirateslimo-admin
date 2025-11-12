import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useVehicle } from '../hooks/useVehicle';
import { useUpdateVehicle } from '../hooks/useUpdateVehicle';
import { Helmet } from 'react-helmet-async';
import VehicleForm from '../components/VehicleForm';
import Breadcrumb from '../../../components/Breadcrumb';
import PageHeading from '../../../components/PageHeading';

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
        description: vehicle.description,
        passengers: vehicle.passengers,
        luggage: vehicle.luggage,
        type: vehicle.type,
        fuel: vehicle.fuel,
        class: vehicle.class,
        initialPrice: vehicle.pricing?.initialPrice,
        pricePerHour: vehicle.pricing?.pricePerHour,
        pricePerKm: vehicle.pricing?.pricePerKm,
      });
    }
  }, [vehicle, reset]);

  // ✅ Submit handler
  function onSubmit(data) {
    const formData = new FormData();

    // Text fields
    formData.append('brand', data.brand);
    formData.append('model', data.model);
    formData.append('year', data.year);
    formData.append('description', data.description || '');
    formData.append('passengers', data.passengers);
    formData.append('luggage', data.luggage);
    formData.append('type', data.type);
    formData.append('fuel', data.fuel);
    formData.append('class', data.class);

    // Pricing
    formData.append(
      'pricing',
      JSON.stringify({
        initialPrice: Number(data.initialPrice),
        pricePerHour: Number(data.pricePerHour),
        pricePerKm: Number(data.pricePerKm),
      })
    );

    // Optional image uploads (user may not change these)
    if (data?.featuredImage?.[0]) {
      formData.append('featuredImage', data.featuredImage[0]);
    }
    if (data?.images?.length > 0) {
      for (const img of data.images) {
        formData.append('images', img);
      }
    }

    console.log(
      'Pricing sent:',
      data.initialPrice,
      data.pricePerHour,
      data.pricePerKm
    );

    // Trigger mutation
    updateVehicle({ id, formData });
  }

  const vehicleName = `${vehicle?.brand || ''} ${vehicle?.model || ''}`;

  if (isLoading) return <p>Loading vehicle...</p>;

  return (
    <div>
      <Helmet>
        <title>{`${vehicleName} | Vehicles`}</title>
      </Helmet>

      <Breadcrumb
        paths={[
          { label: 'Home', href: '/' },
          { label: 'Vehicles', href: '/vehicles' },
          { label: `${vehicleName}`, href: `/vehicles/${id}/edit` },
        ]}
      />

      <PageHeading>{vehicleName}</PageHeading>

      <VehicleForm
        vehicle={vehicle}
        register={register}
        onSubmit={handleSubmit(onSubmit)}
        isLoading={isUpdatingVehicle}
      />
    </div>
  );
}
