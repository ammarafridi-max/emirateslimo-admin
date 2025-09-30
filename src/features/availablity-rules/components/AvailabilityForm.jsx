import { useState } from 'react';
import { useZones } from '../../zones/hooks/useZones';
import { useVehicles } from '../../vehicles/hooks/useVehicles';
import Input from '../../../components/FormElements/Input';
import Label from '../../../components/FormElements/Label';
import PrimaryButton from '../../../components/PrimaryButton';

export default function AvailabilityForm({ onSubmit, register, isLoading }) {
  const [activeTab, setActiveTab] = useState('vehiclesZones');

  return (
    <form onSubmit={onSubmit} className="mt-5">
      <AvailabilityRuleName register={register} />
      <div className="min-h-[450px] overflow-scroll flex flex-col bg-white p-7 mt-5 rounded-xl shadow-lg">
        <div className="flex gap-2 text-sm mb-5">
          {[
            {
              name: 'Vehicles & Zones',
              component: 'vehiclesZones',
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
        {activeTab === 'vehiclesZones' && <VehiclesZones register={register} />}
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

function VehiclesZones({ register }) {
  const { zones } = useZones();
  const { vehicles } = useVehicles();

  return (
    <div className="flex flex-col gap-2">
      <div className="grid grid-cols-[3fr_6fr_3fr] items-center">
        <Label>Pick up Zone</Label>
        <div className="w-full h-[200px] bg-white py-2 px-5 rounded-sm border-1 border-gray-300 outline-0 overflow-y-scroll">
          <select
            multiple
            className="w-full h-full outline-0"
            {...register('pickupZones')}
          >
            {zones?.map((zone) => (
              <option
                key={zone?._id}
                value={zone?._id}
                className=" py-1 px-3 cursor-pointer"
              >
                {zone?.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="grid grid-cols-[3fr_6fr_3fr] items-center">
        <Label>Drop off Zone</Label>
        <div className="w-full h-[200px] bg-white py-2 px-5 rounded-sm border-1 border-gray-300 outline-0 overflow-y-scroll">
          <select
            multiple
            className="w-full h-full outline-0"
            {...register('dropoffZones')}
          >
            {zones?.map((zone) => (
              <option
                key={zone?._id}
                value={zone?._id}
                className=" py-1 px-3 cursor-pointer"
              >
                {zone?.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="grid grid-cols-[3fr_6fr_3fr] items-center">
        <Label>Available Vehicles</Label>
        <div className="w-full h-[200px] bg-white py-2 px-5 rounded-sm border-1 border-gray-300 outline-0 overflow-y-scroll">
          <select
            multiple
            className="w-full h-full outline-0"
            {...register('vehicles')}
          >
            {vehicles?.map((vehicle) => (
              <option
                key={vehicle?._id}
                value={vehicle?._id}
                className="py-1 px-3 cursor-pointer"
              >
                {vehicle?.brand} {vehicle?.model}
              </option>
            ))}
          </select>
        </div>
      </div>
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
        {isLoading ? 'Creating...' : 'Create Rule'}
      </PrimaryButton>
    </div>
  );
}
