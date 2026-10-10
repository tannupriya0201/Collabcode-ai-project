import { createContext, useContext, useState, useEffect } from "react";
import api from "../api/axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadUser = async () => {
    try {
      const res = await api.get("/auth/me");
      setUser(res.data.user);
    } catch (err) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      loadUser();
    } else {
      setLoading(false);
    }
  }, []);

  const login = (data) => {
    localStorage.setItem("accessToken", data.accessToken);
    setUser(data.user);
  };

  const logout = async () => {
    try {
      await api.post("/auth/logout");
    } catch (e) {}
    localStorage.clear();
    setUser(null);
    //window.location.href = "/login";
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
