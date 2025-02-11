import React, { createContext, useState, useEffect } from "react";

// Create the AuthContext
export const AuthContext = createContext();

// Create the AuthProvider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Login function to update user state and save to localStorage
  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("auth-token", JSON.stringify(userData));
  };

  // Logout function to clear user state and remove from localStorage
  const logout = () => {
    setUser(null);
    localStorage.removeItem("auth-token");
  };

  // Initialize user state from localStorage when the app starts
  useEffect(() => {
    const storedUser = localStorage.getItem("auth-token");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      console.log("Parsed user from localStorage:", parsedUser); // Debugging log
      setUser(parsedUser);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};