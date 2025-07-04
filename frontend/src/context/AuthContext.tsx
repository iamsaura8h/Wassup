import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";

// Define the shape of your user object
interface User {
  _id: string;
  username: string;
}

interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser);
        if (typeof parsed === "object" && parsed._id && parsed.username) {
          setUser(parsed);
        } else {
          throw new Error("Invalid user object");
        }
      } catch {
        localStorage.removeItem("user");
        setUser(null);
        console.warn("⚠️ Invalid user format removed from localStorage");
      }
    }
  }, []);

  // when user logs out
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    window.location.href = "/login";
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
