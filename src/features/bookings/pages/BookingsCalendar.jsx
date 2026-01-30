import { useRef, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { useBookings } from '../hooks/useBookings';
import { useOutsideClick } from '../../../hooks/useOutsideClick';
import { formatDate } from '../../../utils/dateUtils';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import Breadcrumb from '../../../components/Breadcrumb';
import Loading from '../../../components/Loading';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi2';

const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

function getCalendarDays(year, month) {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const daysInMonth = lastDay.getDate();
  const startOffset = (firstDay.getDay() + 6) % 7;
  const days = [];
  for (let i = 0; i < startOffset; i++) days.push(null);
  for (let i = 1; i <= daysInMonth; i++) days.push(i);
  return days;
}

export default function BookingsCalendar() {
  const wrapperRef = useRef(null);
  const { bookings, isLoadingBookings } = useBookings();
  const today = new Date();
  const [currentDate, setCurrentDate] = useState(new Date(today.getFullYear(), today.getMonth(), 1));
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedBookings, setSelectedBookings] = useState([]);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const monthString = String(month + 1).padStart(2, '0');

  const days = getCalendarDays(year, month);

  const bookingsByDate = bookings
    ?.filter((b) => b.payment.status.toLowerCase() === 'paid')
    ?.reduce((acc, booking) => {
      acc[booking.pickupDate] = acc[booking.pickupDate] || [];
      acc[booking.pickupDate].push(booking);
      return acc;
    }, {});

  useOutsideClick(wrapperRef, () => setSelectedDate(null));

  if (isLoadingBookings) return <Loading />;

  return (
    <>
      <Helmet>
        <title>Bookings Calendar</title>
      </Helmet>

      <Breadcrumb
        paths={[
          { label: 'Home', href: '/' },
          { label: 'Bookings', href: '/bookings' },
          { label: 'Calendar', href: '/bookings/calendar' },
        ]}
      />

      <div className="w-full bg-white rounded-xl shadow-md mt-4 md:mt-7 p-4 md:p-7">
        <div className="flex justify-between items-center mb-3 md:mb-0">
          <h1 className="text-lg md:text-4xl font-medium">
            {currentDate.toLocaleString('default', { month: 'long' })} {year}
          </h1>

          <div className="flex gap-2 md:gap-3">
            <HiChevronLeft
              onClick={() => setCurrentDate(new Date(year, month - 1, 1))}
              className="text-2xl md:text-3xl text-gray-300 hover:text-black cursor-pointer duration-300"
            />
            <HiChevronRight
              onClick={() => setCurrentDate(new Date(year, month + 1, 1))}
              className="text-2xl md:text-3xl text-gray-300 hover:text-black cursor-pointer duration-300"
            />
          </div>
        </div>

        <div className="hidden md:grid md:grid-cols-7 gap-3 font-extralight text-center mt-8">
          {weekDays.map((day) => (
            <div key={day}>{day}</div>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-7 gap-3 auto-rows-auto md:auto-rows-[110px]">
          {days.map((day, index) => {
            if (!day) return <div key={index} className="hidden md:block" />;

            const dateKey = `${year}-${monthString}-${String(day).padStart(2, '0')}`;
            const dayBookings = bookingsByDate?.[dateKey] || [];

            return (
              <div
                key={index}
                onClick={() => {
                  if (dayBookings.length) {
                    setSelectedDate(dateKey);
                    setSelectedBookings(dayBookings);
                  }
                }}
                className="bg-gray-100 hover:bg-gray-200 rounded-md p-3 font-light cursor-pointer duration-300 flex flex-col"
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">{day}</span>
                  {dayBookings.length > 0 && (
                    <span className="text-[11px] text-gray-500">
                      {dayBookings.length} booking{dayBookings.length > 1 ? 's' : ''}
                    </span>
                  )}
                </div>

                <div className="flex flex-col gap-1 overflow-hidden">
                  {dayBookings.slice(0, 2).map((booking) => (
                    <div key={booking.id} className="text-[11px] bg-primary-900 text-white rounded px-2 py-0.5 truncate">
                      {booking.customerName}
                    </div>
                  ))}

                  {dayBookings.length > 2 && <div className="text-[11px] text-gray-500">+{dayBookings.length - 2} more</div>}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {selectedDate && (
        <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-black/50">
          <div
            ref={wrapperRef}
            className="bg-white rounded-t-2xl md:rounded-xl shadow-lg w-full md:max-w-lg p-5 md:p-6 relative max-h-[85vh] overflow-hidden"
          >
            <button
              onClick={() => {
                setSelectedDate(null);
                setSelectedBookings([]);
              }}
              className="absolute top-4 right-4 text-gray-400 hover:text-black"
            >
              <X size={20} />
            </button>

            <h2 className="text-lg md:text-2xl font-normal mb-4">Bookings on {formatDate(selectedDate)}</h2>

            <div className="flex flex-col gap-3 overflow-y-auto max-h-[65vh] md:max-h-[400px]">
              {selectedBookings.map((booking) => (
                <Link key={booking.id} to={`/bookings/${booking.id}`} className="bg-gray-100 rounded-lg p-4 text-sm">
                  <h3 className="font-light text-base">{booking.customerName}</h3>
                  <p className="text-gray-600 text-xs font-extralight my-1">
                    {booking.pickup.name} → {booking.dropoff.name}
                  </p>
                  <p className="text-gray-600 text-xs font-extralight">
                    {booking.pickupTime} • {booking.vehicle.brand} {booking.vehicle.model}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
