const BASE_URL = "https://learn.codeit.kr/api/codestudit";

export const getPosts = async () => {
  const response = await fetch(BASE_URL + "/posts");
  return response.json();
  // throw new Error('에러 발생!')
};
