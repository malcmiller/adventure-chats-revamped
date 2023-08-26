import axiosRequest from "./send-request";
const BASE_URL = "/api/posts";

export function getAll() {
  return axiosRequest(BASE_URL);
}

export function create(post) {
  return axiosRequest(BASE_URL, "POST", post);
}

export async function getById(id) {
  return await axiosRequest(`${BASE_URL}/${id}`);
}
