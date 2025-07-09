const BASE_URL = "https://learn.codeit.kr/api/codestudit";

export const getPosts = async () => {
  const response = await fetch(BASE_URL + "/posts");
  return response.json();
};

export const getPostsByUsername = async (username) => {
  if (!username) {
    throw new Error('로그인 상태가 아닙니다.')
  }

  const response = await fetch(BASE_URL + "/posts?username=" + username);

  return response.json();
};
