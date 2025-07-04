import { useEffect, useState } from "react";
import api from "../utils/api";
import { useAuth } from "../context/AuthContext";
import MessageInput from "./MessageInput";

export default function ChatWindow({ selectedUser, socket }: any) {
  const { user } = useAuth();
  const [messages, setMessages] = useState<any[]>([]);

  useEffect(() => {
    if (selectedUser) {
      api.get(`/messages/${user?._id}/${selectedUser._id}`).then((res) => setMessages(res.data));
    }
  }, [selectedUser]);

  useEffect(() => {
    socket?.on("receive_message", (msg: any) => {
      if (msg.sender === selectedUser._id) {
        setMessages((prev) => [...prev, msg]);
      }
    });
    return () => {
      socket?.off("receive_message");
    };
  }, [selectedUser, socket]);

  const handleSend = async (text: string) => {
    const messagePayload = { receiverId: selectedUser._id, text };
    const res = await api.post("/messages", messagePayload);
    socket?.emit("send_message", { ...res.data, receiverSocketId: selectedUser._id });
    setMessages([...messages, res.data]);
  };

  return (
    <div className="flex flex-col flex-1">
      <div className="p-4 border-b font-semibold">{selectedUser.username}</div>
      <div className="flex-1 p-4 overflow-y-auto space-y-2 bg-gray-50">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`max-w-xs px-3 py-2 rounded-md ${
              msg.sender === user?._id ? "bg-blue-100 self-end ml-auto" : "bg-white"
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>
      <MessageInput onSend={handleSend} />
    </div>
  );
}
