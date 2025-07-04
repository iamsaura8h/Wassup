import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import api from "../utils/api";
import { Link } from "react-router-dom";

export default function Register() {
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await api.post("/auth/register", { username, password });
    login(res.data);
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow w-80">
        <h2 className="text-2xl font-semibold mb-4">Register</h2>
        <input type="text" placeholder="Username" className="input" value={username} onChange={(e) => setUsername(e.target.value)} />
        <input type="password" placeholder="Password" className="input" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button className="btn">Register</button>
        <p className="mt-2 text-sm">Have an account? <Link to="/login" className="text-blue-500">Login</Link></p>
      </form>
    </div>
  );
}
