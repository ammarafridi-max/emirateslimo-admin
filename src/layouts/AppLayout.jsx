import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useLogout } from '../features/auth/hooks/useLogout';
import {
  HiArrowRightEndOnRectangle,
  HiOutlineUserCircle,
} from 'react-icons/hi2';
import Navigation from '../components/Navigation';

export default function AppLayout() {
  const { logout } = useLogout();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="grid grid-cols-[2fr_10fr] h-screen w-full bg-[#0F0F0F] text-gray-900 overflow-hidden">
      <aside
        className={`w-full transition-all duration-300 bg-gradient-to-b from-[#0D0D0D] to-[#1A1A1A] border-r border-[#222] flex flex-col`}
      >
        <Navigation />
      </aside>

      <div className="flex flex-col bg-gray-50 overflow-scroll">
        <header className="w-full bg-white border-b border-gray-200 flex items-center justify-between px-8 py-3 shadow-sm">
          <div className="w-full flex items-center justify-between gap-3">
            <div>
              <img src="logo-light.png" className="w-40" />
            </div>
            <div className="flex gap-2 items-center justify-end">
              <a
                href="/my-account"
                className="flex items-center gap-2 cursor-pointer bg-primary-100 hover:bg-primary-200 text-primary-800 px-3 py-2 rounded-md duration-300"
              >
                <HiOutlineUserCircle />
                <span className="text-sm">My Account</span>
              </a>
              <button
                onClick={logout}
                type="button"
                className="flex items-center gap-2 cursor-pointer bg-red-100 hover:bg-red-200 text-red-800 px-3 py-2 rounded-md duration-300"
              >
                <HiArrowRightEndOnRectangle />
                <span className="text-sm">Log Out</span>
              </button>
            </div>
          </div>
        </header>
        <main className="bg-gray-100 flex-1 overflow-y-auto px-8 py-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
