import React, { createContext, useContext, useState, useEffect } from "react";
import api from "../api/api";
import { setAccessToken, clearAccessToken } from "./authStorage";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);

  // fetch /auth/me once on app start (optional)
  useEffect(() => {
    (async () => {
      try {
        const resp = await api.get("/auth/me", { withCredentials: true });
        setUser(resp.data);
      } catch (err) {
        setUser(null);
      } finally {
        setReady(true);
      }
    })();
  }, []);

  const login = (accessToken, userData) => {
    setAccessToken(accessToken);
    setUser(userData);
  };
  const logout = async () => {
    try {
      await api.post("/auth/logout", {}, { withCredentials: true });
    } catch (e) {}
    clearAccessToken();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, ready }}>
      {children}
    </AuthContext.Provider>
  );
}
