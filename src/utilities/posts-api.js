import sendRequest from "./send-request";
const BASE_URL = "/api/posts";

export async function createPost(postData) {
  try {
    const response = await sendRequest({
      method: "POST",
      url: BASE_URL,
      data: postData,
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
}

export async function fetchPosts() {
  try {
    const response = await sendRequest({
      method: "GET",
      url: BASE_URL,
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
}
