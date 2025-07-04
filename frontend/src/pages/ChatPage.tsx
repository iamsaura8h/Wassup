import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import UserList from "../components/chat/UserList";
import MessageList from "../components/chat/MessageList";

// 🧪 Mock data (comment when integrating backend)
const mockUsers = [
  { _id: "1", username: "Alice" },
  { _id: "2", username: "Bob" },
  { _id: "3", username: "Charlie" },
];

const mockMessages = [
  { _id: "m1", sender: "1", text: "Hey Bob!" },
  { _id: "m2", sender: "2", text: "Yo Alice, what's up?" },
  { _id: "m3", sender: "1", text: "Wanna build a chat app?" },
];

export default function ChatPage() {
  const [selectedUserId, setSelectedUserId] = useState("");
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  useEffect(() => {
    if (!user) navigate("/login");
  }, [user]);

  const currentUserId = mockUsers.find((u) => u.username === user)?._id || "1"; // fallback for mock

  const selectedUser = mockUsers.find((u) => u._id === selectedUserId);

  return (
    <div className="h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r p-4 space-y-4">
        <h2 className="text-xl font-bold">Chats</h2>
        <UserList
          users={mockUsers} // 🔄 replace with API data later
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
            <MessageList
              messages={mockMessages} // 🔄 replace with real messages later
              currentUserId={currentUserId}
            />
          ) : (
            <p className="text-gray-500">Select a user to view messages</p>
          )}
        </section>

        <footer className="p-4 border-t bg-white">
          <input
            type="text"
            placeholder="Type a message..."
            disabled={!selectedUserId}
            className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </footer>
      </main>
    </div>
  );
}
