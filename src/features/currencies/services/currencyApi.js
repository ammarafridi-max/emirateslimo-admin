import { apiFetch } from '../../../utils/apiClient';

export async function getCurrenciesApi() {
  return await apiFetch('/api/currencies');
}

export async function getCurrencyApi(id) {
  return await apiFetch(`/api/currencies/${id}`);
}

export async function createCurrencyApi(currencyData) {
  return await apiFetch('/api/currencies', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(currencyData),
  });
}

export async function updateCurrencyApi(id, currencyData) {
  return await apiFetch(`/api/currencies/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(currencyData),
  });
}

export async function deleteCurrencyApi(id) {
  return await apiFetch(`/api/currencies/${id}`, {
    method: 'DELETE',
  });
}
