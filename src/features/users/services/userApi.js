import { apiFetch } from '../../../utils/apiClient';

export async function getUsersApi() {
  return await apiFetch('/api/users');
}

export async function getUserApi(id) {
  return await apiFetch(`/api/users/${id}`);
}

export async function createUserApi(userData) {
  return await apiFetch('/api/users', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  });
}

export async function updateUserApi(id, data) {
  return await apiFetch(`/api/users/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
}

export async function deleteUserApi(id) {
  return await apiFetch(`/api/users/${id}`, {
    method: 'DELETE',
  });
}
