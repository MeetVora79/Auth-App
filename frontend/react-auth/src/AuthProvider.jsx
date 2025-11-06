import React, { useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import api from "./api";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const isAdmin = () => user?.role === "admin";
  const isUser = () => user?.role === "user";

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      api
        .get("/me")
        .then((res) => setUser(res.data))
        .catch(() => {
          localStorage.removeItem("token");
          setUser(null);
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    const res = await api.post("/login", { email, password });
    const token = res.data.token;
    localStorage.setItem("token", token);
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    setUser(res.data.user);
    return res.data.user;
  };

  const register = async ({ name, email, password, password_confirmation }) => {
    const res = await api.post("/register", {
      name,
      email,
      password,
      password_confirmation,
    });
    const token = res.data.token;
    localStorage.setItem("token", token);
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    setUser(res.data.user);
    return res.data.user;
  };

  const logout = () => {
    localStorage.removeItem("token");
    delete api.defaults.headers.common["Authorization"];
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading, isAdmin, isUser }}>
      {children}
    </AuthContext.Provider>
  );
}
