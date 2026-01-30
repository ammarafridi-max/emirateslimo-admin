import { Outlet, Link } from 'react-router-dom';
import { useLogout } from '../features/auth/hooks/useLogout';
import { HiArrowRightEndOnRectangle, HiOutlineUserCircle } from 'react-icons/hi2';
import { HiOutlineMenuAlt1, HiX } from 'react-icons/hi';
import { useState } from 'react';
import Navigation from '../components/Navigation';

export default function AppLayout() {
  const [showMenu, setShowMenu] = useState(false);
  const { logout } = useLogout();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        <aside
          className={`fixed inset-y-0 left-0 z-40 w-64 transform transition-transform duration-300
            ${showMenu ? 'translate-x-0' : '-translate-x-full'}
            md:static md:translate-x-0`}
        >
          <Navigation />
        </aside>

        {showMenu && <div className="fixed inset-0 bg-black/40 z-30 md:hidden" onClick={() => setShowMenu(false)} />}

        <div className="flex flex-col flex-1 min-h-screen">
          <header className="sticky top-0 z-20 w-full bg-white border-b border-gray-200 flex items-center justify-between px-3 md:px-8 py-3 shadow-sm">
            <div className="flex items-center gap-4">
              <HiOutlineMenuAlt1 className="text-2xl cursor-pointer md:hidden" onClick={() => setShowMenu(true)} />
              <Link to="/dashboard">
                <img src="/logo-light.png" className="h-4 object-contain" />
              </Link>
            </div>

            <div className="flex gap-2 items-center">
              <Link
                to="/my-account"
                className="flex items-center gap-2 bg-primary-100 hover:bg-primary-200 text-primary-800 px-3 py-2 rounded-md duration-300"
              >
                <HiOutlineUserCircle />
                <span className="hidden md:block text-sm">My Account</span>
              </Link>

              <button
                onClick={logout}
                type="button"
                className="flex items-center gap-2 bg-red-100 hover:bg-red-200 text-red-800 px-2 py-2 rounded-md duration-300"
              >
                <HiArrowRightEndOnRectangle />
                <span className="hidden md:block text-sm">Log Out</span>
              </button>
            </div>
          </header>

          <main className="flex-1 overflow-y-auto bg-gray-100 p-3 md:px-8 md:py-6">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}
