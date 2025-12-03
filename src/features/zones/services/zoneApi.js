import { apiFetch } from '../../../utils/apiClient';

const URL = '/api/zones';

export async function getZonesApi() {
  return apiFetch(URL);
}

export async function createZoneApi(zoneData) {
  return apiFetch(URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(zoneData),
  });
}

export async function updateZoneApi(id, zoneData) {
  return apiFetch(`${URL}/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(zoneData),
  });
}

export async function deleteZoneApi(id) {
  return apiFetch(`${URL}/${id}`, {
    method: 'DELETE',
  });
}

export async function duplicateZoneApi(id) {
  return apiFetch(`${URL}/${id}/duplicate`, {
    method: 'POST',
  });
}
