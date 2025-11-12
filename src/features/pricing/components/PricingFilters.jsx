import { useState } from 'react';
import { useVehicles } from '../../vehicles/hooks/useVehicles';
import { useZones } from '../../zones/hooks/useZones';
import FilterTemplate from '../../../components/FilterTemplate';
import Loading from '../../../components/Loading';
import FilterSearch from '../../../components/FilterSearch';

export default function PricingFilters() {
  const [activeFilterBox, setActiveFilterBox] = useState('');
  const { vehicles, isLoadingVehicles } = useVehicles();
  const { zones, isLoadingZones } = useZones();

  const formattedVehicles = vehicles?.map((veh) => ({
    label: `${veh?.brand} ${veh?.model}`,
    value: veh?._id,
  }));

  const formattedZones = zones?.map((zone) => ({
    label: `${zone?.name}`,
    value: zone?._id,
  }));

  if (isLoadingVehicles || isLoadingZones) return <Loading />;

  return (
    <div className="flex justify-between mb-5">
      <div className="flex gap-2">
        <FilterTemplate
          id="vehicleId"
          title="Vehicle"
          options={[{ label: 'All', value: 'all' }, ...formattedVehicles]}
          searchParamsName="vehicleId"
          activeFilterBox={activeFilterBox}
          setActiveFilterBox={setActiveFilterBox}
        />
        <FilterTemplate
          id="pickupZoneId"
          title="Pickup Zone"
          options={[{ label: 'All', value: 'all' }, ...formattedZones]}
          searchParamsName="pickupZoneId"
          activeFilterBox={activeFilterBox}
          setActiveFilterBox={setActiveFilterBox}
        />
        <FilterTemplate
          id="dropoffZoneId"
          title="Dropoff Zone"
          options={[{ label: 'All', value: 'all' }, ...formattedZones]}
          searchParamsName="dropoffZoneId"
          activeFilterBox={activeFilterBox}
          setActiveFilterBox={setActiveFilterBox}
        />
      </div>
      <FilterSearch searchParamName="name" />
    </div>
  );
}
