import { Outlet } from 'react-router-dom';
import Navigation from './Navigation';

export default function AppLayout() {
  return (
    <div className="h-dvh w-full grid grid-cols-[1.75fr_10.25fr] bg-black m-0 p-0">
      <Navigation />
      <div className="bg-gray-100 p-8 overflow-scroll">
        <Outlet />
      </div>
    </div>
  );
}
