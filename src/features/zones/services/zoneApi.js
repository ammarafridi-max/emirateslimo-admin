import { baseURL } from '../../../utils/baseUrl';

export async function getZonesApi() {
  const res = await fetch(`${baseURL}/api/zones`);

  if (!res.ok) throw new Error('Could not fetch zones');

  const data = await res.json();
  return data?.data?.zones;
}

export async function createZoneApi(zoneData) {
  const res = await fetch(`${baseURL}/api/zones`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(zoneData),
  });

  if (!res.ok) throw new Error('Could not create zone');

  const data = await res.json();
  return data?.data?.zone;
}

export async function updateZoneApi(id, zoneData) {
  const res = await fetch(`${baseURL}/api/zones/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(zoneData),
  });

  if (!res.ok) throw new Error('Could not update zone');

  const data = await res.json();
  return data?.data?.zone;
}

export async function deleteZoneApi(id) {
  const res = await fetch(`${baseURL}/api/zones/${id}`, {
    method: 'DELETE',
  });

  if (!res.ok) throw new Error('Could not delete zone');

  return true;
}

export async function duplicateZoneApi(zone) {
  const { _id, createdAt, updatedAt, ...rest } = zone;

  const res = await fetch(`${baseURL}/api/zones`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      ...rest,
      name: `${rest.name} Copy`,
    }),
  });

  if (!res.ok) throw new Error('Could not duplicate zone');

  const data = await res.json();
  return data?.data?.zone;
}
