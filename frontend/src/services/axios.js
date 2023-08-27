import axios from "axios";

axios.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");

  if (token) {
    req.headers.authorization = `Bearer ${token}`;
  }
  return req;
});

axios.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response.status === 404) {
      throw new Error(`${err.config.url} not found`);
    }
    throw err;
  }
);

export default axios;
