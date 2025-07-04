import API from "./axios";

export const fetchMessages = async (user1: string, user2: string) => {
  const res = await API.get(`/messages/${user1}/${user2}`);
  console.log("📨 Fetching messages between", user1, "and", user2);
   console.log("✅ Messages fetched:", res.data);
  return res.data;
};
