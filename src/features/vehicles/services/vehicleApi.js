import { apiFetch, apiUpload } from '../../../utils/apiClient';

export function getAllVehiclesApi() {
  return apiFetch('/api/vehicles');
}

export function getVehicleApi(id) {
  return apiFetch(`/api/vehicles/${id}`);
}

export function createVehicleApi(formData) {
  return apiUpload('/api/vehicles', formData, 'POST');
}

export function updateVehicleApi({ id, formData }) {
  return apiUpload(`/api/vehicles/${id}`, formData, 'PATCH');
}

export function deleteVehicleApi(id) {
  return apiFetch(`/api/vehicles/${id}`, { method: 'DELETE' });
}

export function duplicateVehicleApi(id) {
  return apiFetch(`/api/vehicles/${id}/duplicate`, { method: 'POST' });
}

export function deleteVehicleImageApi(id, imageUrl) {
  return apiFetch(`/api/vehicles/${id}/images`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ imageUrl }),
  });
}
