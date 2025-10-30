import { apiFetch } from '../../../utils/apiClient';

export async function getBookingsApi() {
  return await apiFetch('/api/bookings');
}

export async function getBookingApi(id) {
  return await apiFetch(`/api/bookings/${id}`);
}

export async function deleteBookingApi(id) {
  return await apiFetch(`/api/bookings/${id}`, {
    method: 'DELETE',
  });
}
