import {
  HiOutlineUsers,
  HiOutlineTicket,
  HiOutlineHome,
  HiOutlineUser,
} from 'react-icons/hi2';
import { NavLink, useLocation } from 'react-router-dom';
import { useLogout } from '../features/auth/useLogout';
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
    icon: HiOutlineTicket,
    accessTo: ['admin', 'agent'],
  },
  {
    name: 'Zones',
    href: '/zones',
    icon: HiOutlineTicket,
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
    name: 'Users',
    href: '/users',
    icon: HiOutlineTicket,
    accessTo: ['admin', 'agent'],
  },
  {
    name: 'My Account',
    href: '/account',
    icon: HiOutlineUser,
    accessTo: ['admin', 'agent'],
  },
  // {
  //   name: 'Log Out',
  //   icon: HiArrowRightOnRectangle,
  //   accessTo: ['admin', 'agent'],
  //   action: 'logout', // 👈 new flag
  // },
];

function SidebarLink({ name, href, Icon, accessTo, action }) {
  const jwtData = useJwtData();
  const { pathname } = useLocation();
  const isActive = href && pathname.startsWith(href);
  const isAllowed = jwtData && accessTo?.includes(jwtData?.role);
  const { logout } = useLogout();

  if (action === 'logout') {
    return (
      <button
        onClick={() => logout()}
        // disabled={!isAllowed}
        className={`w-full flex items-center gap-2.5 font-light text-lg p-2.5 mb-1.25 duration-150 hover:bg-gray-100 hover:text-black cursor-pointer ${
          !isAllowed
            ? 'opacity-100 cursor-not-allowed'
            : 'bg-transparent text-white'
        }`}
      >
        <Icon className="w-5 h-5" />
        <span className="text-[15px]">{name}</span>
      </button>
    );
  }

  return (
    <NavLink
      to={href}
      className={`flex items-center gap-2.5 font-light text-lg py-1.75 px-3 mb-1.25 duration-150 ${
        isActive
          ? 'bg-accent-500 text-white'
          : 'bg-transparent text-white hover:bg-gray-100 hover:text-black'
      } ${!isAllowed ? 'opacity-100' : ''}`}
    >
      {/* <Icon className="w-5 h-5" /> */}
      <span className="text-[15px]">{name}</span>
    </NavLink>
  );
}

export default function Navigation() {
  return (
    <div className="h-full bg-primary-900 flex flex-col justify-center">
      <div>
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
      </div>
    </div>
  );
}
