import React, { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const baseUrl = apiUrl.replace("/api", "");

  const [authToken, setAuthToken] = useState(localStorage.getItem("authToken") || null);
  
  // Safely parse user data from localStorage
  const [user, setUser] = useState(() => {
    try {
      const userData = localStorage.getItem("user");
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      console.error("Error parsing user data from localStorage:", error);
      return null;
    }
  });

  useEffect(() => {
    if (authToken) {
      localStorage.setItem("authToken", authToken);
      localStorage.setItem("user", JSON.stringify(user));
    }
  }, [authToken, user]);

  const login = async (username, password, navigate) => {
    const response = await fetch(`${baseUrl}/auth/token/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      const data = await response.json();
      setAuthToken(data.auth_token);
      setUser(data.user);
      navigate("/admin");
    } else {
      console.error("Login failed");
      alert("Login failed!")
    }
  };

  const logout = async (navigate) => {
    try {
      const response = await fetch(`${baseUrl}/auth/token/logout`, {
        method: "POST",
        headers: {
          "Authorization": `Token ${authToken}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        setAuthToken(null);
        setUser(null);
        localStorage.removeItem("authToken");
        localStorage.removeItem("user");
        navigate("/login"); // Navigate to login after logout
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("An error occurred during logout:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ authToken, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
