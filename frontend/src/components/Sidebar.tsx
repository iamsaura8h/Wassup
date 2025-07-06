import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import api from "../utils/api";

export default function Sidebar({ setSelectedUser, selectedUser }: any) {
  const { logout, user } = useAuth();
  const [users, setUsers] = useState([]);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    api.get("/users").then((res) => setUsers(res.data));
  }, []);

  return (
    <div
      className={`h-full bg-white border-r transition-all duration-200 ${expanded ? "w-60" : "w-20"}`}
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
    >
      <div className="p-4 flex items-center justify-between">
        <img src={user?.avatar} className="w-10 h-10 rounded-full" alt="lol" />
        {expanded && <button onClick={logout} className="text-sm text-red-500">Logout</button>}
      </div>

      <ul className="overflow-y-auto">
        {users.map((u: any) => (
          <li
            key={u._id}
            onClick={() => setSelectedUser(u)}
            className={`flex items-center gap-2 p-3 cursor-pointer hover:bg-gray-100 ${selectedUser?._id === u._id ? "bg-gray-200" : ""}`}
          >
            <img src={u.avatar} className="w-10 h-10 rounded-full" alt="photuuu"/>
            {expanded && <span className="truncate">{u.username}</span>}
          </li>
        ))}
      </ul>
    </div>
  );
}
