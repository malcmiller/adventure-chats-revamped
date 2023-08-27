import axiosRequest from "./send-request";
const BASE_URL = '/api/users';

export async function signUp(userData) {
  return axiosRequest(BASE_URL, 'POST', userData);
}

export async function login(credentials) {
  return axiosRequest(`${BASE_URL}/login`, 'POST', credentials);
}

export async function checkToken() {
  return axiosRequest(`${BASE_URL}/check-token`);
}