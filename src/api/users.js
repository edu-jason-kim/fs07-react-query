import { BASE_URL } from ".";

export const getUserByUsername = async (username) => {
  const response = await fetch(BASE_URL + "/users/" + username);
  return response.json();
};
