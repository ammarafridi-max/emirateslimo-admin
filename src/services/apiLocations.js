import { baseURL } from '../utils/baseUrl';

export async function getLocationsApi(query) {
  const res = await fetch(`${baseURL}/api/locations?query=${query}`);
  if (!res.ok) throw new Error('Could not fetch locations');
  const data = await res.json();
  return data?.data;
}
