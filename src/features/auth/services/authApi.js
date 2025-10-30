import { apiFetch } from '../../../utils/apiClient';

export async function signupApi(userData) {
  return await apiFetch('/api/auth/signup', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  });
}

export async function loginApi(credentials) {
  console.log(credentials);
  return await apiFetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });
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
