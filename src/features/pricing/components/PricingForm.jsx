import { useState } from 'react';
import { useZones } from '../../zones/hooks/useZones';
import { useVehicles } from '../../vehicles/hooks/useVehicles';
import Label from '../../../components/FormElements/Label';
import Input from '../../../components/FormElements/Input';
import PrimaryButton from '../../../components/PrimaryButton';
import Loading from '../../../components/Loading';

export default function PricingForm({ register, onSubmit }) {
  const [activeTab, setActiveTab] = useState('vehiclesRoutes');

  return (
    <form onSubmit={onSubmit} className="mt-5">
      <PricingRuleName register={register} />
      <div className="min-h-[450px] overflow-scroll flex flex-col bg-white p-7 mt-5 rounded-xl shadow-lg">
        <div className="flex gap-2 text-sm mb-5">
          {[
            {
              name: 'Vehicles & Routes',
              component: 'vehiclesRoutes',
            },
            {
              name: 'Pricing',
              component: 'pricing',
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
        {activeTab === 'vehiclesRoutes' && (
          <VehiclesZones register={register} />
        )}
        {activeTab === 'pricing' && <Pricing register={register} />}
      </div>
      <Actions />
    </form>
  );
}

function PricingRuleName({ register }) {
  return <Input placeholder="Enter Pricing Rule Name" {...register('name')} />;
}

function VehiclesZones({ register }) {
  const { zones, isLoadingZones } = useZones();
  const { vehicles, isLoadingVehicles } = useVehicles();

  if (isLoadingVehicles || isLoadingZones) return <Loading />;

  return (
    <div className="flex flex-col gap-2">
      <div className="grid grid-cols-[3fr_6fr_3fr] items-center">
        <Label>Pick up Zone</Label>
        <div className="w-full h-[200px] bg-white py-2 px-5 rounded-sm border-1 border-gray-300 outline-0 overflow-y-scroll">
          <select
            multiple="multiple"
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
            multiple="multiple"
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
        <Label>Vehicles</Label>
        <div className="w-full h-[200px] bg-white py-2 px-5 rounded-sm border-1 border-gray-300 outline-0 overflow-y-scroll">
          <select
            multiple="multiple"
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

function Pricing({ register }) {
  return (
    <div className="flex flex-col gap-2">
      <div className="grid grid-cols-[3fr_6fr_3fr] items-center">
        <Label>One Way Price</Label>
        <Input type="number" {...register('pricing.oneWay')} />
      </div>
      <div className="grid grid-cols-[3fr_6fr_3fr] items-center">
        <Label>Return Price</Label>
        <Input type="number" {...register('pricing.return')} />
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
