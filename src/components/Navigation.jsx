import {
  HiOutlineUsers,
  HiOutlineTicket,
  HiOutlineHome,
  HiOutlineUser,
  HiArrowRightOnRectangle,
  HiOutlineMap,
  HiOutlineCalendar,
  HiOutlineCurrencyDollar,
} from 'react-icons/hi2';
import { NavLink, useLocation } from 'react-router-dom';
import { useLogout } from '../features/auth/hooks/useLogout';
import { useJwtData } from '../services/jwt';

const links = [
  {
    name: 'Dashboard',
    href: '/dashboard',
    icon: HiOutlineHome,
    accessTo: ['admin', 'agent'],
  },
  {
    name: 'Bookings',
    href: '/bookings',
    icon: HiOutlineCalendar,
    accessTo: ['admin', 'agent'],
  },
  {
    name: 'Zones',
    href: '/zones',
    icon: HiOutlineMap,
    accessTo: ['admin', 'agent'],
  },
  {
    name: 'Vehicles',
    href: '/vehicles',
    icon: HiOutlineUsers,
    accessTo: ['admin'],
  },
  {
    name: 'Pricing Rules',
    href: '/pricing',
    icon: HiOutlineTicket,
    accessTo: ['admin', 'agent'],
  },
  {
    name: 'Availability Rules',
    href: '/availability-rules',
    icon: HiOutlineTicket,
    accessTo: ['admin', 'agent'],
  },
  {
    name: 'Currencies',
    href: '/currencies',
    icon: HiOutlineCurrencyDollar,
    accessTo: ['admin', 'agent'],
  },
  {
    name: 'Users',
    href: '/users',
    icon: HiOutlineUsers,
    accessTo: ['admin', 'agent'],
  },
  // {
  //   name: 'My Account',
  //   href: '/account',
  //   icon: HiOutlineUser,
  //   accessTo: ['admin', 'agent'],
  // },
];

function SidebarLink({ name, href, Icon, accessTo, action }) {
  const jwtData = useJwtData();
  const { pathname } = useLocation();
  const { logout } = useLogout();

  const isActive = href && pathname.startsWith(href);
  const isAllowed = jwtData && accessTo?.includes(jwtData?.role);

  if (action === 'logout') {
    return (
      <button
        onClick={logout}
        className="flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-300 group text-gray-300 hover:text-white hover:bg-[#FF6B00]/10"
      >
        <Icon className="w-5 h-5 text-gray-400 group-hover:text-[#FF6B00]" />
        <span className="text-sm tracking-wide">Log Out</span>
      </button>
    );
  }

  return (
    <NavLink
      to={href}
      className={({ isActive }) =>
        `flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-300 group ${
          isActive
            ? 'bg-[#FF6B00] text-white shadow-md'
            : 'text-gray-300 hover:text-white hover:bg-[#FF6B00]/10'
        }`
      }
    >
      <Icon
        className={`w-5 h-5 transition-colors ${
          isActive ? 'text-white' : 'text-gray-400 group-hover:text-[#FF6B00]'
        }`}
      />
      <span className="text-sm tracking-wide">{name}</span>
    </NavLink>
  );
}

export default function Navigation() {
  return (
    <aside className="h-full w-full bg-gradient-to-b from-[#0D0D0D] to-[#1A1A1A] flex flex-col justify-between py-6 px-3">
      {/* <div className="px-6 mb-6">
        <img src="/logo-dark.png" className="object-contain" />
      </div> */}

      <nav className="flex-1 flex flex-col gap-1 overflow-y-auto scrollbar-hide">
        {links.map((link, i) => (
          <SidebarLink
            key={i}
            name={link.name}
            href={link.href}
            Icon={link.icon}
            accessTo={link.accessTo}
            action={link.action}
          />
        ))}
      </nav>

      <div className="px-5 text-xs text-gray-500 mt-auto">
        <p>© {new Date().getFullYear()} Emirates Limo</p>
      </div>
    </aside>
  );
}
