import { Outlet } from 'react-router-dom';
import Navigation from '../components/Navigation';
import { useState } from 'react';
import { HiMiniBars3CenterLeft } from 'react-icons/hi2';

export default function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen w-full bg-[#0F0F0F] text-gray-900 overflow-hidden">
      {/* Sidebar */}
      <aside
        className={`transition-all duration-300 ${
          sidebarOpen ? 'w-[240px]' : 'w-[80px]'
        } bg-gradient-to-b from-[#0D0D0D] to-[#1A1A1A] border-r border-[#222] flex flex-col`}
      >
        <Navigation />
      </aside>

      {/* Main content area */}
      <div className="flex-1 flex flex-col bg-gray-50">
        {/* Top Bar */}
        <header className="sticky top-0 z-40 bg-white border-b border-gray-200 flex items-center justify-between px-6 py-3 shadow-sm">
          <div className="flex items-center gap-3"></div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto px-8 py-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
