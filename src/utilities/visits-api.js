import sendRequest from "./send-request";
const BASE_URL = "/api/visits";

export function getAll() {
  return sendRequest(BASE_URL);
}

export function create(visit) {
  return sendRequest(BASE_URL, "POST", visit);
}

export async function getById(id) {
  return await sendRequest(`${BASE_URL}/${id}`);
}