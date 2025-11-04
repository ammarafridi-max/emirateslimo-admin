import { useState } from 'react';
import { useZones } from '../../zones/hooks/useZones';
import { useVehicles } from '../../vehicles/hooks/useVehicles';
import { useWatch } from 'react-hook-form';
import Input from '../../../components/FormElements/Input';
import Label from '../../../components/FormElements/Label';
import PrimaryButton from '../../../components/PrimaryButton';

export default function AvailabilityForm({
  onSubmit,
  register,
  isLoading,
  control,
}) {
  const [activeTab, setActiveTab] = useState('zones');

  return (
    <form onSubmit={onSubmit} className="mt-5">
      <AvailabilityRuleName register={register} />

      <div className="min-h-[450px] overflow-scroll flex flex-col bg-white p-7 mt-5 rounded-xl shadow-lg">
        {/* Tabs */}
        <div className="flex gap-2 text-sm mb-5">
          {['zones', 'vehicles'].map((item) => (
            <button
              key={item}
              type="button"
              className={`px-3 py-2 rounded-sm duration-300 cursor-pointer outline-0 ${
                activeTab === item
                  ? 'bg-primary-900 text-primary-50'
                  : 'bg-primary-200 text-primary-900 hover:bg-primary-300'
              }`}
              onClick={() => setActiveTab(item)}
            >
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </button>
          ))}
        </div>

        {/* Tab Contents */}
        {activeTab === 'zones' && <Zones register={register} />}
        {activeTab === 'vehicles' && (
          <Vehicles register={register} control={control} />
        )}
      </div>

      <Actions isLoading={isLoading} />
    </form>
  );
}

/* ---------------- Name ---------------- */
function AvailabilityRuleName({ register }) {
  return (
    <div>
      <p className="mb-2 text-2xl font-medium">Availability Rule Name</p>
      <Input
        placeholder="Enter Availability Rule Name"
        {...register('name', { required: true })}
      />
    </div>
  );
}

/* ---------------- Zones ---------------- */
function Zones({ register }) {
  const { zones, isLoadingZones } = useZones();

  if (isLoadingZones || !zones?.length)
    return <p className="text-sm text-gray-500">Loading zones...</p>;

  return (
    <div className="flex flex-col gap-3">
      {/* Pickup Zones */}
      <div className="grid grid-cols-[3fr_6fr_3fr] items-center">
        <Label>Pick up Zones</Label>
        <div className="w-full h-[300px] bg-white p-2 rounded-sm border border-gray-300 overflow-y-scroll">
          <select
            multiple
            className="w-full h-full outline-0"
            {...register('pickupZones')}
          >
            {zones.map((zone) => (
              <option className="py-1 px-2" key={zone._id} value={zone._id}>
                {zone.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Dropoff Zones */}
      <div className="grid grid-cols-[3fr_6fr_3fr] items-center">
        <Label>Drop off Zones</Label>
        <div className="w-full h-[300px] bg-white p-2 rounded-sm border border-gray-300 overflow-y-scroll">
          <select
            multiple
            className="w-full h-full outline-0"
            {...register('dropoffZones')}
          >
            {zones.map((zone) => (
              <option className="py-1 px-2" key={zone._id} value={zone._id}>
                {zone.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}

/* ---------------- Vehicles ---------------- */
function Vehicles({ register, control }) {
  const { vehicles, isLoadingVehicles } = useVehicles();
  const watchedVehicles = useWatch({ control, name: 'vehicles' });

  if (isLoadingVehicles || !vehicles?.length)
    return <p className="text-sm text-gray-500">Loading vehicles...</p>;

  console.log(vehicles);

  return (
    <div className="flex flex-col gap-2 mt-4 divide-y divide-gray-200">
      {vehicles.map((veh) => {
        const value = watchedVehicles?.[veh._id];
        return (
          <div
            key={veh._id}
            className="grid grid-cols-[3fr_6fr_3fr] items-center p-3"
          >
            <label className="text-sm text-gray-800">
              {veh.brand} {veh.model}
            </label>

            <div className="flex items-center gap-5">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  value="true"
                  checked={value === 'true'}
                  {...register(`vehicles.${veh._id}`)}
                  className="accent-green-600 cursor-pointer"
                />
                <span className="text-sm text-gray-700">Available</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  value="false"
                  checked={value === 'false'}
                  {...register(`vehicles.${veh._id}`)}
                  className="accent-red-600 cursor-pointer"
                />
                <span className="text-sm text-gray-700">Unavailable</span>
              </label>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ---------------- Actions ---------------- */
function Actions({ isLoading }) {
  return (
    <div className="mt-6">
      <PrimaryButton
        size="small"
        type="submit"
        disabled={isLoading}
        className="w-full"
      >
        {isLoading ? 'Saving...' : 'Save Rule'}
      </PrimaryButton>
    </div>
  );
}
