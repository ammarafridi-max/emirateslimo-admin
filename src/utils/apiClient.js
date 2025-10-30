// src/utils/apiClient.js
import { baseURL } from './baseUrl';
import { jwtCookie } from '../services/jwt';

async function checkError(res) {
  if (!res.ok) {
    let errorMsg = 'Something went wrong';
    try {
      const error = await res.json();
      errorMsg = error.message || error.error || errorMsg;
    } catch (_) {}

    if (res.status === 401) {
      console.warn('Token expired or unauthorized. Please log in again.');
    }

    throw new Error(errorMsg);
  }
}

async function returnData(res) {
  if (res.status === 204) return null;
  try {
    const json = await res.json();
    return json?.data ?? null;
  } catch {
    return null;
  }
}

/**
 * Generic API fetch wrapper
 *
 * @param {string} path - Endpoint path (e.g., '/api/vehicles')
 * @param {object} options - fetch() options (method, headers, body)
 * @returns {Promise<any>} - Parsed JSON data
 */

export async function apiFetch(path, options = {}) {
  const headers = {
    ...(options.headers || {}),
    Authorization: `Bearer ${jwtCookie}`,
  };

  const res = await fetch(`${baseURL}${path}`, { ...options, headers });

  await checkError(res);
  return await returnData(res);
}

export async function apiUpload(path, formData, method = 'POST') {
  const res = await fetch(`${baseURL}${path}`, {
    method,
    headers: {
      Authorization: `Bearer ${jwtCookie}`,
    },
    body: formData,
  });

  await checkError(res);
  return await returnData(res);
}
