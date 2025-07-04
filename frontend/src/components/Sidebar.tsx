import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import api from "../utils/api";

export default function Sidebar({ setSelectedUser, selectedUser }: any) {
  const { logout, user } = useAuth();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    api.get("/users").then((res) => setUsers(res.data));
  }, []);

  return (
    <div className="w-64 border-r bg-white flex flex-col">
      <div className="p-4 font-bold border-b flex justify-between">
        <span>{user?.username}</span>
        <button onClick={logout} className="text-red-500">Logout</button>
      </div>
      <ul className="flex-1 overflow-y-auto">
        {users.map((u: any) => (
          <li key={u._id} onClick={() => setSelectedUser(u)} className={`p-3 hover:bg-gray-100 cursor-pointer ${selectedUser?._id === u._id ? "bg-gray-200" : ""}`}>
            {u.username}
          </li>
        ))}
      </ul>
    </div>
  );
}
