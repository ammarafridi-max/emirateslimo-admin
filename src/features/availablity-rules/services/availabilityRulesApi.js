import { baseURL } from '../../../utils/baseUrl';
import { jwtCookie } from '../../../services/jwt';

const URL = `${baseURL}/api/availability-rules`;

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

// Get all rules
export async function getAllAvailabilityRulesApi() {
  const res = await fetch(URL, {
    headers: { Authorization: `Bearer ${jwtCookie}` },
  });

  await checkError(res);
  return await returnData(res);
}

// Get single rule
export async function getAvailabilityRuleApi(id) {
  const res = await fetch(`${URL}/${id}`, {
    headers: { Authorization: `Bearer ${jwtCookie}` },
  });

  await checkError(res);
  return await returnData(res);
}

// Create new rule
export async function createAvailabilityRuleApi(formData) {
  const res = await fetch(URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${jwtCookie}`,
    },
    body: JSON.stringify(formData),
  });

  await checkError(res);
  return await returnData(res);
}

// Update rule
export async function updateAvailabilityRuleApi({ id, data }) {
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

// Delete rule
export async function deleteAvailabilityRuleApi(id) {
  const res = await fetch(`${URL}/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${jwtCookie}` },
  });

  await checkError(res);
  return true;
}
