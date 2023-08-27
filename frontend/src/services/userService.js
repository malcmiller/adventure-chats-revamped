import axios from "./axios";
import jwt_decode from "jwt-decode";

const BASE_URL = "/api/user";

export async function createUser(user) {
  try {
    const response = await axios.post(BASE_URL, { user });
    const token = response.data;

    localStorage.setItem("token", token);

    const decodedUser = jwt_decode(token);

    return decodedUser;
  } catch (error) {
    console.log(`Error encountered while creating user! ${error.message}`);
  }
}

export async function login(credential) {
  try {
    const response = await axios.post(`${BASE_URL}/login`, credential);

    const token = response.data;

    localStorage.setItem("token", token);

    const decodedUser = jwt_decode(token);

    return decodedUser;
  } catch (error) {
    console.log(`Error encountered while logging in user! ${error.message}`);
  }
}
