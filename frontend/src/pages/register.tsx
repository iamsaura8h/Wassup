import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import api from "../utils/api";
import AvatarModal from "../components/AvatarModal";
import { Link } from "react-router-dom";

export default function Register() {
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!avatar) return alert("Please select an avatar");
    const res = await api.post("/auth/register", { username, password, avatar });
    login(res.data);
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow w-80">
        <h2 className="text-2xl font-semibold mb-4">Register</h2>
        <input className="input" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
        <input className="input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
        <div className="mb-3">
          {avatar ? (
            <img src={avatar} alt="avatar" className="w-12 h-12 rounded-full mx-auto cursor-pointer" onClick={() => setShowModal(true)} />
          ) : (
            <button type="button" className="btn" onClick={() => setShowModal(true)}>Choose Avatar</button>
          )}
        </div>
        <button className="btn">Register</button>
        <p className="mt-2 text-sm">Have an account? <Link to="/login" className="text-blue-500">Login</Link></p>
        {showModal && <AvatarModal setAvatar={setAvatar} close={() => setShowModal(false)} />}
      </form>
    </div>
  );
}
