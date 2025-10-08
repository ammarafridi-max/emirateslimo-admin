import { useState } from 'react';
import Input from '../../../components/FormElements/Input';
import Label from '../../../components/FormElements/Label';
import Select from '../../../components/FormElements/Select';
import PrimaryButton from '../../../components/PrimaryButton';
import Textarea from '../../../components/FormElements/Textarea';
import Image from '../../../components/Image';
import { useDeleteImage } from '../hooks/useDeleteImage';

export default function VehicleForm({
  register,
  onSubmit,
  isLoading,
  vehicle,
}) {
  const [activeTab, setActiveTab] = useState('vehicleInformation');

  return (
    <form onSubmit={onSubmit}>
      <div className="min-h-[450px] overflow-scroll flex flex-col bg-white p-7 mt-5 rounded-xl shadow-lg">
        <div className="flex gap-2 text-sm mb-5">
          {[
            {
              name: 'Vehicle Information',
              component: 'vehicleInformation',
            },
            {
              name: 'Vehicle Pricing',
              component: 'vehiclePricing',
            },
            {
              name: 'Images',
              component: 'images',
            },
          ].map((opt, i) => (
            <button
              type="button"
              className={`px-3 py-2 rounded-sm duration-300 cursor-pointer outline-0 ${opt.component === activeTab ? 'bg-primary-900 text-primary-50' : 'bg-primary-200 text-primary-900 hover:bg-primary-300'}`}
              key={i}
              onClick={() => setActiveTab(opt.component)}
            >
              {opt.name}
            </button>
          ))}
        </div>
        {activeTab === 'vehicleInformation' && (
          <VehicleInformation register={register} />
        )}
        {activeTab === 'vehiclePricing' && (
          <VehiclePricing register={register} />
        )}
        {activeTab === 'images' && (
          <Images register={register} vehicle={vehicle} />
        )}
      </div>
      <Actions isLoading={isLoading} />
    </form>
  );
}

function VehicleInformation({ register }) {
  return (
    <div className="flex flex-col gap-2">
      <div className="grid grid-cols-[3fr_6fr_3fr] items-center">
        <Label>Brand Name</Label>
        <Input {...register('brand')} />
      </div>
      <div className="grid grid-cols-[3fr_6fr_3fr] items-center">
        <Label>Model</Label>
        <Input {...register('model')} />
      </div>
      <div className="grid grid-cols-[3fr_6fr_3fr] items-center">
        <Label>Year</Label>
        <Input type="number" {...register('year')} />
      </div>
      <div className="grid grid-cols-[3fr_6fr_3fr] items-center">
        <Label>Description</Label>
        <Textarea rows={4} {...register('description')} />
      </div>
      <div className="grid grid-cols-[3fr_6fr_3fr] items-center">
        <Label>Passengers</Label>
        <Input type="number" {...register('passengers')} />
      </div>
      <div className="grid grid-cols-[3fr_6fr_3fr] items-center">
        <Label>Luggage</Label>
        <Input type="number" {...register('luggage')} />
      </div>
      <div className="grid grid-cols-[3fr_6fr_3fr] items-center">
        <Label>Type</Label>
        <Select {...register('type')}>
          {['Sedan', 'Crossover', 'SUV', 'Van'].map((opt, i) => (
            <option value={opt} key={i}>
              {opt}
            </option>
          ))}
        </Select>
      </div>
      <div className="grid grid-cols-[3fr_6fr_3fr] items-center">
        <Label>Fuel</Label>
        <Select {...register('fuel')}>
          {['Petrol', 'Diesel', 'Electric', 'Hybrid'].map((opt, i) => (
            <option value={opt} key={i}>
              {opt}
            </option>
          ))}
        </Select>
      </div>
      <div className="grid grid-cols-[3fr_6fr_3fr] items-center">
        <Label>Class</Label>
        <Select {...register('class')}>
          {['Standard', 'Premium', 'Business', 'Luxury'].map((opt, i) => (
            <option value={opt} key={i}>
              {opt}
            </option>
          ))}
        </Select>
      </div>
    </div>
  );
}

function VehiclePricing({ register }) {
  return (
    <div className="flex flex-col gap-2">
      <div className="grid grid-cols-[3fr_6fr_3fr] items-center">
        <Label>Initial Price</Label>
        <Input type="number" {...register('initialPrice')} />
      </div>
      <div className="grid grid-cols-[3fr_6fr_3fr] items-center">
        <Label>Price Per Hour</Label>
        <Input type="number" {...register('pricePerHour')} />
      </div>
      <div className="grid grid-cols-[3fr_6fr_3fr] items-center">
        <Label>Price Per KM</Label>
        <Input type="number" {...register('pricePerKm')} />
      </div>
    </div>
  );
}

function Images({ register, vehicle }) {
  const { deleteImage, isDeleting } = useDeleteImage();

  return (
    <div className="flex flex-col gap-2">
      {vehicle?.featuredImage || vehicle?.images ? (
        <div className="grid grid-cols-4 gap-4 mb-5">
          {vehicle?.featuredImage && (
            <Image
              featured={true}
              src={vehicle?.featuredImage}
              className="object-cover"
              isDeleting={isDeleting}
              onDelete={() => {
                deleteImage({
                  id: vehicle._id,
                  imageUrl: vehicle.featuredImage,
                });
              }}
            />
          )}
          {vehicle?.images &&
            vehicle?.images.map((image, i) => (
              <Image
                key={i}
                src={image}
                className="object-contain"
                isDeleting={isDeleting}
                onDelete={() => {
                  deleteImage({
                    id: vehicle._id,
                    imageUrl: image,
                  });
                }}
              />
            ))}
        </div>
      ) : (
        ''
      )}

      {!vehicle?.featuredImage && (
        <div className="grid grid-cols-[3fr_6fr_3fr] items-center">
          <Label>Featured Image</Label>
          <Input
            type="file"
            {...register('featuredImage')}
            multiple={false}
            accept=".png,.jpeg,.jpg,.webp"
          />
        </div>
      )}

      <div className="grid grid-cols-[3fr_6fr_3fr] items-center">
        <Label>Images</Label>
        <Input
          type="file"
          {...register('images')}
          multiple
          accept=".png,.jpeg,.jpg,.webp"
        />
      </div>
    </div>
  );
}

function Actions({ isLoading }) {
  return (
    <div className="h-[70px] flex items-center gap-3 bg-white p-7 mt-5 rounded-xl shadow-lg">
      <PrimaryButton type="submit" disabled={isLoading}>
        {isLoading ? 'Updating...' : 'Update Vehicle'}
      </PrimaryButton>
    </div>
  );
}
