import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Layouts
import AppLayout from '../layouts/AppLayout';

import Dashboard from '../pages/Dashboard';
import Login from '../features/auth/Login';
import PrivateRoutes from '../pages/PrivateRoutes';
import NotFound from '../pages/NotFound';

// Users
import Users from '../features/users/pages/Users';
import CreateUser from '../features/users/pages/CreateUser';
import UpdateUser from '../features/users/pages/UpdateUser';

// Zones
import Zones from '../features/zones/pages/Zones';
import CreateZone from '../features/zones/pages/CreateZone';
import UpdateZone from '../features/zones/pages/UpdateZone';

// Vehicles
import Vehicles from '../features/vehicles/pages/Vehicles';
import CreateVehicle from '../features/vehicles/pages/CreateVehicle';
import UpdateVehicle from '../features/vehicles/pages/UpdateVehicle';

// Pricing
import PricingList from '../features/pricing/pages/PricingList';
import CreatePricing from '../features/pricing/pages/CreatePricing';
import UpdatePricing from '../features/pricing/pages/UpdatePricing';

// Availability Rules
import AvailabilityRules from '../features/availablity-rules/pages/AvailablityRules';
import CreateAvailabilityRule from '../features/availablity-rules/pages/CreateAvailabilityRule';
import UpdateAvailabilityRule from '../features/availablity-rules/pages/UpdateAvailabilityRule';

// Bookings
import Bookings from '../features/bookings/pages/Bookings';

import MyAccount from '../features/account/MyAccount';

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/login" element={<Login />} />
        {/* <Route element={<PrivateRoutes />}> */}
        <Route element={<AppLayout />}>
          <Route index element={<Navigate replace to="dashboard" />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="account" element={<MyAccount />} />
          <Route path="zones" element={<Zones />} />
          <Route path="zones/create" element={<CreateZone />} />
          <Route path="zones/:id" element={<UpdateZone />} />
          <Route path="vehicles" element={<Vehicles />} />
          <Route path="vehicles/create" element={<CreateVehicle />} />
          <Route path="vehicles/:id" element={<UpdateVehicle />} />
          <Route path="pricing" element={<PricingList />} />
          <Route path="pricing/create" element={<CreatePricing />} />
          <Route path="pricing/:id" element={<UpdatePricing />} />
          <Route path="availability-rules" element={<AvailabilityRules />} />
          <Route
            path="availability-rules/create"
            element={<CreateAvailabilityRule />}
          />
          <Route
            path="availability-rules/:id"
            element={<UpdateAvailabilityRule />}
          />
          <Route path="bookings" element={<Bookings />} />
          <Route path="users" element={<Users />} />
          <Route path="users/create" element={<CreateUser />} />
          <Route path="users/:username" element={<UpdateUser />} />
        </Route>
        {/* </Route> */}
      </Routes>
    </BrowserRouter>
  );
}
