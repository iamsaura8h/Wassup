import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ChatPage from "./pages/ChatPage";

const PrivateRoute = ({ children }: { children: React.ReactElement }) => {
  const { token } = useAuth();
  return token ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Navigate to="/chat" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/chat" element={<PrivateRoute><ChatPage /></PrivateRoute>} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
