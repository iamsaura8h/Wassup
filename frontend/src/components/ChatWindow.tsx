import { useEffect, useRef, useState } from "react";
import api from "../utils/api";
import { useAuth } from "../context/AuthContext";
import MessageInput from "./MessageInput";

export default function ChatWindow({ selectedUser, socket }: any) {
  const { user } = useAuth();
  const [messages, setMessages] = useState<any[]>([]);
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef<any>(null);

  useEffect(() => {
    api.get(`/messages/${user?._id}/${selectedUser._id}`).then((res) => setMessages(res.data));
    socket?.emit("register_user", user?._id);
  }, [selectedUser]);

  useEffect(() => {
    socket?.on("receive_message", (msg: any) => {
      if (msg.sender === selectedUser._id) {
        setMessages((prev) => [...prev, msg]);
        api.post("/messages/seen", { senderId: selectedUser._id });
        socket.emit("seen", { to: msg.sender });
      }
    });

    socket?.on("typing", ({ from }: any) => {
      if (from === selectedUser._id) {
        setTyping(true);
        setTimeout(() => setTyping(false), 1500);
      }
    });

    return () => {
      socket?.off("receive_message");
      socket?.off("typing");
    };
  }, [selectedUser, socket]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async (text: string) => {
    const res = await api.post("/messages", { receiverId: selectedUser._id, text });
    socket.emit("send_message", { ...res.data, receiver: selectedUser._id });
    setMessages([...messages, res.data]);
  };

  return (
    <div className="flex flex-col flex-1">
      <div className="p-4 border-b flex items-center gap-2">
        <img src={selectedUser.avatar} className="w-8 h-8 rounded-full" />
        <span className="font-medium">{selectedUser.username}</span>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-2 bg-gray-50">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            ref={scrollRef}
            className={`max-w-xs px-3 py-2 rounded-md text-sm ${
              msg.sender === user?._id ? "bg-blue-100 ml-auto" : "bg-white"
            }`}
          >
            {msg.text}
            {msg.sender === user?._id && idx === messages.length - 1 && (
              <div className="text-xs text-right mt-1 text-gray-400">
                {msg.seen ? "Seen" : "Sent"}
              </div>
            )}
          </div>
        ))}
        {typing && <div className="text-xs text-gray-400 mt-2">{selectedUser.username} is typing...</div>}
      </div>

      <MessageInput onSend={handleSend} socket={socket} to={selectedUser._id} />
    </div>
  );
}
