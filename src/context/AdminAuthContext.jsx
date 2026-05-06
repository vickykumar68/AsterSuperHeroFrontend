import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AdminAuthContext = createContext();

export const AdminAuthProvider = ({ children }) => {
  const [role, setRole] = useState(null);
  const [token, setToken] = useState(null); // NEW
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const res = await axios.get("/api/v1/superhero/auth/check-auth", { withCredentials: true });
      setRole(res.data.user.role);
      setToken(res.data.token || null); // get token from backend
    } catch (err) {
      setRole(null);
      setToken(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      const res = await axios.post(
        "/api/v1/superhero/admin/login",
        { username: email, password }, // backend expects `username`
        { withCredentials: true }
      );

      setRole(res.data.user.role);
      setToken(res.data.token); // store token
      return res.data.user.role;
    } catch (err) {
      console.error("Admin login error:", err);
      throw err;
    }
  };

  const logout = async () => {
    try {
      await axios.post("/api/v1/superhero/auth/logout", {}, { withCredentials: true });
      setRole(null);
      setToken(null);
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  return (
    <AdminAuthContext.Provider value={{ role, token, loading, login, logout }}>
      {children}
    </AdminAuthContext.Provider>
  );
};
