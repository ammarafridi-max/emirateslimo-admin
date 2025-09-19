import { useCreateVehicle } from './useCreateVehicle';
import { useForm } from 'react-hook-form';
import Breadcrumb from '../../components/Breadcrumb';
import PageHeading from '../../components/PageHeading';
import VehicleForm from './VehicleForm';

export default function CreateVehicle() {
  const { createVehicle, isCreatingVehicle } = useCreateVehicle();
  const { register, handleSubmit } = useForm();

  function onSubmit(data) {
    const vehicleData = {
      ...data,
      pricing: {
        initialPrice: Number(data.initialPrice),
        pricePerHour: Number(data.pricePerHour),
        pricePerKm: Number(data.pricePerKm),
      },
    };
    createVehicle(vehicleData);
  }

  return (
    <div>
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
