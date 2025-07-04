import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import UserList from "../components/chat/UserList";
import MessageList from "../components/chat/MessageList";
import { getAllUsers } from "../api/users";
import { fetchMessages, sendMessage as sendMessageAPI } from "../api/messages";

interface User {
  _id: string;
  username: string;
}

interface Message {
  _id: string;
  sender: string;
  text: string;
}

export default function ChatPage() {
  const [selectedUserId, setSelectedUserId] = useState<string>("");
  const [users, setUsers] = useState<User[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    const fetchUsers = async () => {
      try {
        const data = await getAllUsers();
        const filtered = data.filter((u: User) => u._id !== user._id);
        setUsers(filtered);
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };

    fetchUsers();
  }, [user]);

  const selectedUser = users.find((u) => u._id === selectedUserId);

  useEffect(() => {
    const getMessages = async () => {
      if (!user || !selectedUser) return;

      try {
        const data = await fetchMessages(user._id, selectedUser._id);
        setMessages(data);
      } catch (err) {
        console.error("Failed to fetch messages:", err);
      }
    };

    getMessages();
  }, [selectedUserId, selectedUser, user]);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !user || !selectedUser) return;

    try {
      const data = await sendMessageAPI({
        sender: user._id,
        receiver: selectedUser._id,
        text: newMessage.trim(),
      });

      setMessages((prev) => [...prev, data]); // Update UI instantly
      setNewMessage(""); // Reset input
    } catch (err) {
      console.error("Failed to send message:", err);
    }
  };

  return (
    <div className="h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r p-4 space-y-4">
        <h2 className="text-xl font-bold">Chats</h2>
        <UserList
          users={users}
          activeUserId={selectedUserId}
          onSelect={setSelectedUserId}
        />
      </aside>

      {/* Chat Area */}
      <main className="flex-1 bg-gray-100 flex flex-col">
        <header className="p-4 border-b bg-white flex justify-between items-center">
          <h3 className="text-lg font-semibold">
            {selectedUser ? selectedUser.username : "Select a user"}
          </h3>
          <button
            onClick={logout}
            className="text-sm text-red-600 hover:underline"
          >
            Logout
          </button>
        </header>

        <section className="flex-1 overflow-y-auto p-4 space-y-2">
          {selectedUserId ? (
            <MessageList messages={messages} currentUserId={user!._id} />
          ) : (
            <p className="text-gray-500">Select a user to view messages</p>
          )}
        </section>

        <footer className="p-4 border-t bg-white">
          <form onSubmit={sendMessage}>
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message..."
              disabled={!selectedUserId}
              className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </form>
        </footer>
      </main>
    </div>
  );
}
