import 'react-tooltip/dist/react-tooltip.css';
import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { ToastContainer } from 'react-toastify';
import { HelmetProvider } from 'react-helmet-async';
import AppLayout from './components/AppLayout';
import Dashboard from './pages/Dashboard';
import Login from './features/auth/Login';
import PrivateRoutes from './pages/PrivateRoutes';
import NotFound from './pages/NotFound';

// Users
import Users from './features/users/Users';
import CreateUser from './features/users/CreateUser';

// Zones
import Zones from './features/zones/Zones';
import CreateZone from './features/zones/CreateZone';
import UpdateZone from './features/zones/UpdateZone';

// Vehicles
import Vehicles from './features/vehicles/Vehicles';
import CreateVehicle from './features/vehicles/CreateVehicle';
import UpdateVehicle from './features/vehicles/UpdateVehicle';

// Pricing
import PricingList from './features/pricing/PricingList';
import CreatePricing from './features/pricing/CreatePricing';
import UpdatePricing from './features/pricing/UpdatePricing';

// Bookings

import Bookings from './features/bookings/Bookings';

import MyAccount from './features/account/MyAccount';
import UpdateUser from './features/users/UpdateUser';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 300 * 1000,
    },
  },
});

export default function App() {
  return (
    <>
      <Toaster />
      <ToastContainer position="top-right" autoClose={3000} />
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <HelmetProvider>
          <BrowserRouter>
            <Routes>
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
                <Route path="bookings" element={<Bookings />} />
                <Route path="users" element={<Users />} />
                <Route path="users/create" element={<CreateUser />} />
                <Route path="users/:username" element={<UpdateUser />} />
                <Route path="*" element={<NotFound />} />
              </Route>
              {/* </Route> */}
            </Routes>
          </BrowserRouter>
        </HelmetProvider>
      </QueryClientProvider>
    </>
  );
}
