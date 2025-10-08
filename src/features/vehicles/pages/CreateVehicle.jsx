import { Helmet } from 'react-helmet-async';
import { useCreateVehicle } from '../hooks/useCreateVehicle';
import { useForm } from 'react-hook-form';
import Breadcrumb from '../../../components/Breadcrumb';
import PageHeading from '../../../components/PageHeading';
import VehicleForm from '../components/VehicleForm';

export default function CreateVehicle() {
  const { createVehicle, isCreatingVehicle } = useCreateVehicle();
  const { register, handleSubmit } = useForm();

  async function onSubmit(data) {
    const formData = new FormData();

    if (data?.featuredImage[0]) {
      formData.append('featuredImage', data?.featuredImage[0]);
    }

    if (data?.images?.length > 0) {
      for (const img of data.images) {
        formData.append('images', img);
      }
    }

    formData.append('brand', data?.brand);
    formData.append('model', data?.model);
    formData.append('year', data?.year);
    formData.append('passengers', data?.passengers);
    formData.append('luggage', data?.luggage);
    formData.append('type', data?.type);
    formData.append('class', data?.class);
    formData.append('description', data?.description);
    formData.append('fuel', data?.fuel);

    formData.append(
      'pricing',
      JSON.stringify({
        initialPrice: Number(data.initialPrice),
        pricePerHour: Number(data.pricePerHour),
        pricePerKm: Number(data.pricePerKm),
      })
    );

    createVehicle(formData);
  }

  return (
    <div>
      <Helmet>
        <title>Create Vehicle | Vehicles</title>
      </Helmet>
      <Breadcrumb
        paths={[
          { label: 'Home', href: '/' },
          { label: 'Vehicles', href: '/vehicles' },
          { label: 'Create Vehicle', href: '/vehicles/create' },
        ]}
      />
      <PageHeading>Create Vehicle</PageHeading>
      <VehicleForm
        register={register}
        onSubmit={handleSubmit(onSubmit)}
        isLoading={isCreatingVehicle}
      />
    </div>
  );
}
