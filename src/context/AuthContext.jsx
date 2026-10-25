import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("mhs_user");
    return saved ? JSON.parse(saved) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem("mhs_token"));

  function login(userData, authToken) {
    setUser(userData);
    setToken(authToken);
    localStorage.setItem("mhs_user", JSON.stringify(userData));
    localStorage.setItem("mhs_token", authToken);
  }

  function logout() {
    setUser(null);
    setToken(null);
    localStorage.removeItem("mhs_user");
    localStorage.removeItem("mhs_token");
  }

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
