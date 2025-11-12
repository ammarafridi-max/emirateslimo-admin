import { useState } from 'react';
import FilterTemplate from '../../../components/FilterTemplate';
import FilterSearch from '../../../components/FilterSearch';

export default function BookingsFilter() {
  const [activeFilterBox, setActiveFilterBox] = useState('');

  return (
    <div className="flex justify-between mb-5">
      <div className="flex gap-2">
        <FilterTemplate
          id="createdAt"
          title="Submission"
          options={[
            { label: 'Last 6 Hours', value: '6_hours' },
            { label: 'Last 12 Hours', value: '12_hours' },
            { label: 'Last 24 Hours', value: '24_hours' },
            { label: 'Last 7 Days', value: '7_days' },
            { label: 'Last 14 Days', value: '14_days' },
            { label: 'Last 30 Days', value: '30_days' },
            { label: 'Last 90 Days', value: '90_days' },
            { label: 'All Time', value: 'all_time' },
          ]}
          searchParamsName="createdAt"
          activeFilterBox={activeFilterBox}
          setActiveFilterBox={setActiveFilterBox}
        />
        <FilterTemplate
          id="paymentStatus"
          title="Payment Status"
          options={[
            { label: 'All', value: 'all' },
            { label: 'Paid', value: 'PAID' },
            { label: 'Unpaid', value: 'UNPAID' },
          ]}
          searchParamsName="paymentStatus"
          activeFilterBox={activeFilterBox}
          setActiveFilterBox={setActiveFilterBox}
        />
        <FilterTemplate
          id="orderStatus"
          title="Order Status"
          options={[
            { label: 'All', value: 'all' },
            { label: 'Pending', value: 'PENDING' },
            { label: 'Delivered', value: 'DELIVERED' },
          ]}
          searchParamsName="orderStatus"
          activeFilterBox={activeFilterBox}
          setActiveFilterBox={setActiveFilterBox}
        />
      </div>
      <div className="flex gap-3">
        <FilterSearch />
      </div>
    </div>
  );
}
