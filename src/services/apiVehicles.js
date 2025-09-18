import { baseURL } from '../utils/baseUrl';
import { jwtCookie } from './jwt';

const URL = `${baseURL}/api/vehicles`;

async function checkError(res) {
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || 'Something went wrong');
  }
}

async function returnData(res) {
  const json = await res.json();
  return json?.data;
}

export async function getAllVehiclesApi() {
  const res = await fetch(URL, {
    headers: { Authorization: `Bearer ${jwtCookie}` },
  });

  await checkError(res);
  return await returnData(res);
}

export async function getVehicleApi(slug) {
  const res = await fetch(`${URL}/${slug}`, {
    headers: { Authorization: `Bearer ${jwtCookie}` },
  });

  await checkError(res);
  return await returnData(res);
}

export async function createVehicleApi(data) {
  const res = await fetch(URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${jwtCookie}`,
    },
    body: JSON.stringify(data),
  });

  await checkError(res);
  return await returnData(res);
}

export async function updateVehicleApi({ slug, data }) {
  const res = await fetch(`${URL}/${slug}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${jwtCookie}`,
    },
    body: JSON.stringify(data),
  });

  await checkError(res);
  return await returnData(res);
}

export async function deleteVehicleApi(slug) {
  const res = await fetch(`${URL}/${slug}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${jwtCookie}` },
  });

  await checkError(res);
  return await returnData(res);
}
