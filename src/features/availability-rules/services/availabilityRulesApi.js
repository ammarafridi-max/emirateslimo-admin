import { apiFetch } from '../../../utils/apiClient';

const ENDPOINT = '/api/availability-rules';

// ✅ Get all rules
export async function getAllAvailabilityRulesApi() {
  return await apiFetch(ENDPOINT);
}

// ✅ Get single rule
export async function getAvailabilityRuleApi(id) {
  return await apiFetch(`${ENDPOINT}/${id}`);
}

// ✅ Create new rule
export async function createAvailabilityRuleApi(data) {
  return await apiFetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
}

// ✅ Update rule
export async function updateAvailabilityRuleApi({ id, data }) {
  return await apiFetch(`${ENDPOINT}/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
}

// ✅ Delete rule
export async function deleteAvailabilityRuleApi(id) {
  await apiFetch(`${ENDPOINT}/${id}`, { method: 'DELETE' });
  return true;
}

// ✅ Duplicate rule
export async function duplicateAvailabilityRuleApi(id) {
  return await apiFetch(`${ENDPOINT}/${id}/duplicate`, {
    method: 'POST',
  });
}
