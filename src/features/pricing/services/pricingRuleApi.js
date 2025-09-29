import { baseURL } from '../../../utils/baseUrl';
import { jwtCookie } from '../../../services/jwt';

const URL = `${baseURL}/api/pricing-rules`;

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

export async function getAllPricingRulesApi() {
  const res = await fetch(URL, {
    headers: { Authorization: `Bearer ${jwtCookie}` },
  });

  await checkError(res);
  return await returnData(res);
}

export async function getPricingRuleApi(id) {
  const res = await fetch(`${URL}/${id}`, {
    headers: { Authorization: `Bearer ${jwtCookie}` },
  });

  await checkError(res);
  return await returnData(res);
}

export async function createPricingRuleApi(formData) {
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

export async function updatePricingRuleApi({ id, data }) {
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

export async function deletePricingRuleApi(id) {
  const res = await fetch(`${URL}/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${jwtCookie}` },
  });

  await checkError(res);
  return true;
}

export async function duplicatePricingRuleApi(id) {
  const res = await fetch(`${URL}/${id}/duplicate`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${jwtCookie}` },
  });

  await checkError(res);
  return await returnData(res);
}
