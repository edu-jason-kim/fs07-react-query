import { BASE_URL } from ".";

export const getPosts = async (page = 0, pageLimit = 10) => {
  const API_URL = `${BASE_URL}/posts?page=${page}&limit=${pageLimit}`;
  const response = await fetch(API_URL);
  return response.json();
};

export const getPostsByUsername = async (username) => {
  if (!username) {
    throw new Error("로그인 상태가 아닙니다.");
  }

  const response = await fetch(BASE_URL + "/posts?username=" + username);

  return response.json();
};

export const uploadPost = async (newPost) => {
  // await new Promise((res) => setTimeout(res, 3000));

  const response = await fetch(BASE_URL + "/posts", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newPost),
  });

  return response.json();
};
