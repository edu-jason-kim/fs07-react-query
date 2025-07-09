const BASE_URL = "https://learn.codeit.kr/api/codestudit";

export const getPosts = async () => {
  const response = await fetch(BASE_URL + "/posts");
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
