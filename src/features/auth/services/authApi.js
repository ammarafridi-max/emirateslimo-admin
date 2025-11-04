import { apiFetch } from '../../../utils/apiClient';
import { baseURL } from '../../../utils/baseUrl';

export async function signupApi(userData) {
  return await apiFetch('/api/auth/signup', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  });
}

export async function loginApi(credentials) {
  const response = await fetch(`${baseURL}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    throw new Error('Failed to login');
  }

  const data = await response.json();
  return data;
}

export async function getMeApi() {
  return await apiFetch('/api/auth/me', {
    method: 'GET',
  });
}

export async function forgotPasswordApi(email) {
  return await apiFetch('/api/auth/forgotPassword', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  });
}

export async function resetPasswordApi(token, newPassword) {
  return await apiFetch(`/api/auth/resetPassword/${token}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ password: newPassword }),
  });
}
