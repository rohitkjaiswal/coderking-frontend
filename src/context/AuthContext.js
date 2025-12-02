import React, { createContext, useEffect, useState } from "react";
import api from "../utils/api";

export const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // { id, name, email, role }
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    async function fetchMe() {
      try {
        if (token) {
          const resp = await api.get("/me");
          setUser(resp.data);
        }
      } catch (e) {
        console.error("Failed to load user", e);
        localStorage.removeItem("token");
        setUser(null);
      } finally {
        setLoading(false);
      }
    }
    fetchMe();
  }, []);

  const login = async (email, password) => {
    const resp = await api.post("/auth/login", { email, password });
    localStorage.setItem("token", resp.data.jwt);
    const me = await api.get("/me");
    setUser(me.data);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}