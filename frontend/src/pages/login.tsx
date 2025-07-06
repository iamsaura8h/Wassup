import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import api from "../utils/api";
import { Link } from "react-router-dom";

export default function Login() {
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await api.post("/auth/login", { username, password });
    login(res.data);
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow w-80">
        <h2 className="text-2xl font-semibold mb-4">Login</h2>
        <input className="input" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
        <input className="input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
        <button className="btn">Login</button>
        <p className="mt-2 text-sm">No account? <Link to="/register" className="text-blue-500">Register</Link></p>
      </form>
    </div>
  );
}
