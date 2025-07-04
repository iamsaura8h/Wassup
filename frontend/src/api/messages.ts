import API from "./axios";

export const fetchMessages = async (user1: string, user2: string) => {
  const res = await API.get(`/messages/${user1}/${user2}`);
  console.log("📨 Fetching messages between", user1, "and", user2);
   console.log("✅ Messages fetched:", res.data);
  return res.data;
};

// send message
export const sendMessage = async (senderId: string, receiverId: string, text: string) => {
  const res = await API.post("/messages", { sender: senderId, receiver: receiverId, text });
  return res.data;
};


