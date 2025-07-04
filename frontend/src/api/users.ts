import API from "./axios";

export const getAllUsers = async () => {
  const res = await API.get("/users");
  return res.data;
};
