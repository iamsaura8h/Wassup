import Sidebar from "../components/Sidebar";
import ChatWindow from "../components/ChatWindow";
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { io, Socket } from "socket.io-client";

export default function ChatPage() {
  const { user } = useAuth();
  const [socket, setSocket] = useState<Socket | null>(null);
  const [selectedUser, setSelectedUser] = useState<any>(null);

  useEffect(() => {
    if (user) {
      const newSocket = io("http://localhost:5000");
      setSocket(newSocket);
      return () => {
        newSocket.disconnect();
      };
    }
    return;
  }, [user]);

  return (
    <div className="flex h-screen">
      <Sidebar setSelectedUser={setSelectedUser} selectedUser={selectedUser} />
      {selectedUser ? (
        <ChatWindow socket={socket} selectedUser={selectedUser} />
      ) : (
        <div className="flex-1 flex items-center justify-center text-gray-500">
          Select a user to start chatting
        </div>
      )}
    </div>
  );
}
