import { useState } from 'react';
import Breadcrumb from '../../components/Breadcrumb';
import Input from '../../components/FormElements/Input';
import Label from '../../components/FormElements/Label';
import Select from '../../components/FormElements/Select';
import PageHeading from '../../components/PageHeading';
import PrimaryButton from '../../components/PrimaryButton';

export default function CreateVehicle() {
  const [activeTab, setActiveTab] = useState('vehicleInformation');

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
      <form>
        <div className="h-[450px] overflow-scroll flex flex-col gap-3 bg-white p-7 mt-5 rounded-xl shadow-lg">
          <div className="flex gap-2 text-sm mb-3">
            {[
              {
                name: 'Vehicle Information',
                component: 'vehicleInformation',
              },
              {
                name: 'Vehicle Pricing',
                component: 'vehiclePricing',
              },
            ].map((opt, i) => (
              <button
                type="button"
                className={`px-3 py-2 rounded-md duration-300 cursor-pointer outline-0 ${opt.component === activeTab ? 'bg-primary-500 text-primary-50' : 'bg-primary-100 text-primary-500 hover:bg-primary-200'}`}
                key={i}
                onClick={() => setActiveTab(opt.component)}
              >
                {opt.name}
              </button>
            ))}
          </div>
          {activeTab === 'vehicleInformation' && <VehicleInformation />}
          {activeTab === 'vehiclePricing' && <VehiclePricing />}
        </div>
        <Actions />
      </form>
    </div>
  );
}

function VehicleInformation() {
  return (
    <>
      <div className="grid grid-cols-[3fr_6fr_3fr] items-center">
        <Label>Brand Name</Label>
        <Input />
      </div>
      <div className="grid grid-cols-[3fr_6fr_3fr] items-center">
        <Label>Model</Label>
        <Input />
      </div>
      <div className="grid grid-cols-[3fr_6fr_3fr] items-center">
        <Label>Year</Label>
        <Input type="number" />
      </div>
      <div className="grid grid-cols-[3fr_6fr_3fr] items-center">
        <Label>Passengers</Label>
        <Input type="number" />
      </div>
      <div className="grid grid-cols-[3fr_6fr_3fr] items-center">
        <Label>Luggage</Label>
        <Input type="number" />
      </div>
      <div className="grid grid-cols-[3fr_6fr_3fr] items-center">
        <Label>Type</Label>
        <Select>
          {['Sedan', 'Crossover', 'SUV', 'Van'].map((opt, i) => (
            <option value={opt} key={i}>
              {opt}
            </option>
          ))}
        </Select>
      </div>
      <div className="grid grid-cols-[3fr_6fr_3fr] items-center">
        <Label>Class</Label>
        <Select>
          {['Standard', 'Premium', 'Business', 'Luxury'].map((opt, i) => (
            <option value={opt} key={i}>
              {opt}
            </option>
          ))}
        </Select>
      </div>
    </>
  );
}

function VehiclePricing() {
  return (
    <>
      <div className="grid grid-cols-[3fr_6fr_3fr] items-center">
        <Label>Initial Price</Label>
        <Input />
      </div>
      <div className="grid grid-cols-[3fr_6fr_3fr] items-center">
        <Label>Price Per Hour</Label>
        <Input />
      </div>
      <div className="grid grid-cols-[3fr_6fr_3fr] items-center">
        <Label>Price Per KM</Label>
        <Input />
      </div>
    </>
  );
}

function Actions() {
  return (
    <div className="h-[70px] flex items-center gap-3 bg-white p-7 mt-5 rounded-xl shadow-lg">
      <PrimaryButton>Create Vehicle</PrimaryButton>
      {/* <LinkButton>Reset</LinkButton> */}
    </div>
  );
}
