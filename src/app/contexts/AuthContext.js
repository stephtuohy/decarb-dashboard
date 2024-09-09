"use client";

import { useRouter } from "next/navigation";
import React, { createContext, useContext, useState, useMemo } from "react";

const AuthContext = createContext({
  isLoggedIn: false,
  handleLogin: () => {},
  handleLogout: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true), router.push("/dashboard");
  };
  const handleLogout = () => {
    setIsLoggedIn(false), router.push("/registration");
  };

  const value = useMemo(
    () => ({ isLoggedIn, handleLogin, handleLogout }),
    [isLoggedIn]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
