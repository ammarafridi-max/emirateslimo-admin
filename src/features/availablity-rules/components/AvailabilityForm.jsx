import { useState } from 'react';
import { useZones } from '../../zones/hooks/useZones';
import { useVehicles } from '../../vehicles/hooks/useVehicles';
import Input from '../../../components/FormElements/Input';
import Label from '../../../components/FormElements/Label';
import PrimaryButton from '../../../components/PrimaryButton';

export default function AvailabilityForm({ onSubmit, register, isLoading }) {
  const [activeTab, setActiveTab] = useState('zones');

  return (
    <form onSubmit={onSubmit} className="mt-5">
      <AvailabilityRuleName register={register} />
      <div className="min-h-[450px] overflow-scroll flex flex-col bg-white p-7 mt-5 rounded-xl shadow-lg">
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
        {activeTab === 'vehicles' && <Vehicles register={register} />}
        {activeTab === 'zones' && <Zones register={register} />}
      </div>
      <Actions isLoading={isLoading} />
    </form>
  );
}

function AvailabilityRuleName({ register }) {
  return (
    <div>
      <p className="mb-2 text-2xl font-medium">Availability Rule Name</p>
      <Input placeholder="Enter Availability Rule Name" {...register('name')} />
    </div>
  );
}

function Zones({ register }) {
  const { zones } = useZones();

  return (
    <div className="flex flex-col gap-3">
      {/* Pickup Zones */}
      <div className="grid grid-cols-[3fr_6fr_3fr] items-center">
        <Label>Pick up Zones</Label>
        <div className="w-full h-[200px] bg-white p-2 rounded-sm border border-gray-300 overflow-y-scroll">
          <select
            multiple
            className="w-full h-full outline-0"
            {...register('pickupZones')}
          >
            {zones?.map((zone) => (
              <option
                className="px-3 py-2 cursor-pointer hover:bg-gray-200"
                key={zone._id}
                value={zone._id}
              >
                {zone.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Dropoff Zones */}
      <div className="grid grid-cols-[3fr_6fr_3fr] items-center">
        <Label>Drop off Zones</Label>
        <div className="w-full h-[200px] bg-white p-2 rounded-sm border border-gray-300 overflow-y-scroll">
          <select
            multiple
            className="w-full h-full outline-0"
            {...register('dropoffZones')}
          >
            {zones?.map((zone) => (
              <option
                className="px-3 py-2 cursor-pointer hover:bg-gray-200"
                key={zone._id}
                value={zone._id}
              >
                {zone.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}

function Vehicles({ register }) {
  const { vehicles } = useVehicles();
  return (
    <div className="flex flex-col gap-1 mt-4 divide-y divide-gray-300">
      {vehicles?.map((veh) => (
        <div
          key={veh._id}
          className="grid grid-cols-[3fr_6fr_3fr] items-center p-3"
        >
          <Label className="text-sm text-gray-700">
            {veh.brand} {veh.model}
          </Label>
          <div>
            <input
              type="checkbox"
              {...register(`vehicles.${veh._id}`)}
              className="cursor-pointer"
            />
            <span className="ml-2 text-sm">Available</span>
          </div>
        </div>
      ))}
    </div>
  );
}

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
