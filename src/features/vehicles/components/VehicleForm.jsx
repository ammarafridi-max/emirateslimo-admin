import { useState } from 'react';
import { useDeleteImage } from '../hooks/useDeleteImage';
import Input from '../../../components/FormElements/Input';
import Label from '../../../components/FormElements/Label';
import Select from '../../../components/FormElements/Select';
import PrimaryButton from '../../../components/PrimaryButton';
import Textarea from '../../../components/FormElements/Textarea';
import Image from '../../../components/Image';

export default function VehicleForm({
  register,
  onSubmit,
  isLoading,
  vehicle,
}) {
  const [activeTab, setActiveTab] = useState('vehicleInformation');

  const tabs = [
    { name: 'Vehicle Information', key: 'vehicleInformation' },
    { name: 'Pricing', key: 'vehiclePricing' },
    { name: 'Images', key: 'images' },
  ];

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      {/* --- Tabs --- */}
      <div className="flex gap-3">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => setActiveTab(tab.key)}
            className={`relative py-2 px-4 text-sm font-medium transition-all duration-300 rounded-t-md ${
              activeTab === tab.key
                ? 'text-[#FF6B00] border-b-2 border-[#FF6B00]'
                : 'text-gray-600 hover:text-black hover:bg-gray-100'
            }`}
          >
            {tab.name}
          </button>
        ))}
      </div>

      {/* --- Tab Content --- */}
      <div className="bg-white p-7 rounded-xl shadow-sm border border-gray-100 transition-all duration-300">
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

      {/* --- Action Buttons --- */}
      <div className="flex justify-end bg-white p-5 rounded-xl shadow-sm border border-gray-100">
        <PrimaryButton type="submit" disabled={isLoading}>
          {isLoading ? 'Updating...' : 'Update Vehicle'}
        </PrimaryButton>
      </div>
    </form>
  );
}

/* --------------------------
   Vehicle Information Section
--------------------------- */
function VehicleInformation({ register }) {
  const fields = [
    ['Brand Name', 'brand', 'text'],
    ['Model', 'model', 'text'],
    ['Year', 'year', 'number'],
    ['Description', 'description', 'textarea'],
    ['Passengers', 'passengers', 'number'],
    ['Luggage', 'luggage', 'number'],
  ];

  const selects = [
    ['Type', 'type', ['Sedan', 'Crossover', 'SUV', 'Van']],
    ['Fuel', 'fuel', ['Petrol', 'Diesel', 'Electric', 'Hybrid']],
    ['Class', 'class', ['Standard', 'Premium', 'Business', 'Luxury']],
  ];

  return (
    <div className="space-y-4">
      {fields.map(([label, name, type]) => (
        <div key={name} className="grid grid-cols-[2fr_5fr] items-start gap-4">
          <Label>{label}</Label>
          {type === 'textarea' ? (
            <Textarea rows={4} {...register(name)} />
          ) : (
            <Input type={type} {...register(name)} />
          )}
        </div>
      ))}

      {selects.map(([label, name, options]) => (
        <div key={name} className="grid grid-cols-[2fr_5fr] items-center gap-4">
          <Label>{label}</Label>
          <Select {...register(name)}>
            {options.map((opt) => (
              <option value={opt} key={opt}>
                {opt}
              </option>
            ))}
          </Select>
        </div>
      ))}
    </div>
  );
}

/* --------------------------
   Vehicle Pricing Section
--------------------------- */
function VehiclePricing({ register }) {
  const fields = [
    ['Initial Price', 'initialPrice'],
    ['Price Per Hour', 'pricePerHour'],
    ['Price Per KM', 'pricePerKm'],
  ];

  return (
    <div className="space-y-4">
      {fields.map(([label, name]) => (
        <div key={name} className="grid grid-cols-[2fr_5fr] items-center gap-4">
          <Label>{label}</Label>
          <Input type="number" {...register(name)} />
        </div>
      ))}
    </div>
  );
}

/* --------------------------
   Images Section
--------------------------- */
function Images({ register, vehicle }) {
  const { deleteImage, isDeleting } = useDeleteImage();
  const hasImages = vehicle?.featuredImage || vehicle?.images?.length > 0;

  return (
    <div>
      {hasImages && (
        <div className="mb-15">
          <p className="font-medium text-gray-700 mb-3">Existing Images</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {vehicle?.featuredImage && (
              <Image
                featured
                src={vehicle.featuredImage}
                isDeleting={isDeleting}
                onDelete={() =>
                  deleteImage({
                    id: vehicle._id,
                    imageUrl: vehicle.featuredImage,
                  })
                }
              />
            )}
            {vehicle?.images?.map((img, i) => (
              <Image
                key={i}
                src={img}
                isDeleting={isDeleting}
                onDelete={() =>
                  deleteImage({
                    id: vehicle._id,
                    imageUrl: img,
                  })
                }
              />
            ))}
          </div>
        </div>
      )}

      {!vehicle?.featuredImage && (
        <div className="grid grid-cols-[2fr_5fr] items-center gap-4">
          <Label>Featured Image</Label>
          <Input
            type="file"
            {...register('featuredImage')}
            multiple={false}
            accept=".png,.jpeg,.jpg,.webp,.avif"
          />
        </div>
      )}

      <div className="grid grid-cols-[2fr_5fr] items-center gap-4">
        <Label>Additional Images</Label>
        <Input
          type="file"
          {...register('images')}
          multiple
          accept=".png,.jpeg,.jpg,.webp,.avif"
        />
      </div>
    </div>
  );
}
