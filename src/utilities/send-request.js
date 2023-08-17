import axios from "axios";

// import { getToken } from './users-service';

// export default async function sendRequest(url, method = 'GET', payload = null) {
//   // Fetch accepts an options object as the 2nd argument
//   // used to include a data payload, set headers, specifiy the method, etc.
//   const options = { method };
//   if (payload) {
//     options.headers = { 'Content-Type': 'application/json' };
//     options.body = JSON.stringify(payload);
//   }
//   const token = getToken();
//   if (token) {
//     // Need to add an Authorization header
//     // Use the Logical OR Assignment operator
//     options.headers ||= {};
//     // Older approach
//     // options.headers = options.headers || {};
//     options.headers.Authorization = `Bearer ${token}`;
//   }
//   const res = await fetch(url, options);
//   // if res.ok is false then something went wrong
//   if (res.ok) return res.json();
//   throw new Error('Bad Request');
// }

export default async function axiosRequest(
  url,
  method = "GET",
  payload = null
) {
  const headers = {};

  if (payload) {
    headers["Content-Type"] = "application/json";
  }

  const token = localStorage.getItem("token");

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  try {
    // Make the Axios request
    const response = await axios({
      method,
      url,
      data: payload,
      headers,
    });

    if (response.status >= 200 && response.status < 300) {
      return response;
    }

    throw new Error(`Request failed with status code ${response.status}`);
  } catch (error) {
    // Log the error and the error's response
    console.error("Axios request failed:", error);
    if (error.response) {
      console.error("Respose:", error.response);
    }

    // Re-throw the error so that calling fdunctions are aware of the failure
    throw error;
  }
}