import API from "./axios";

export const registerUser = async (username: string, password: string) => {
  const res = await API.post("/auth/register", { username, password });
  return res.data;
};

export const loginUser = async (username: string, password: string) => {
  const res = await API.post("/auth/login", { username, password });
  return res.data;
};
