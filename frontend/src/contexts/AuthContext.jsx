import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("zaiqa_user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [role, setRole] = useState(() => {
    return localStorage.getItem("zaiqa_role") || null;
  });

  const login = (userData, token) => {
    setUser(userData);
    setRole(userData.role);

    localStorage.setItem("zaiqa_user", JSON.stringify(userData));
    localStorage.setItem("zaiqa_role", userData.role);
    localStorage.setItem("token", token);
  };

  const logout = () => {
    setUser(null);
    setRole(null);

    localStorage.removeItem("zaiqa_user");
    localStorage.removeItem("zaiqa_role");
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}