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

export async function getVehicleApi(id) {
  const res = await fetch(`${URL}/${id}`, {
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

export async function updateVehicleApi({ id, data }) {
  const res = await fetch(`${URL}/${id}`, {
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

export async function deleteVehicleApi(id) {
  const res = await fetch(`${URL}/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${jwtCookie}` },
  });

  await checkError(res);
  return true;
}

export async function duplicateVehicleApi(id) {
  const res = await fetch(`${URL}/${id}/duplicate`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${jwtCookie}` },
  });

  await checkError(res);
  return await returnData(res);
}
