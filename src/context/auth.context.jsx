import React, { useState, useEffect, createContext } from "react";
import axios from "axios";
const AuthContext = createContext();

const AuthWrapper = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    console.log("Mounting UserProvider");
    authenticateUser();
  }, []);

  const authenticateUser = () => {
    const storedToken = localStorage.getItem("authToken");
    if (storedToken) {
      axios
        .get("http://localhost:4000/account", {
          headers: { Authorization: `Bearer ${storedToken}` },
        })
        .then(({ data }) => {
          setCurrentUser(data);
          setIsLoading(false);
          setIsLoggedIn(true);
        })
        .catch((e) => {
          setCurrentUser(null);
          setIsLoading(false);
          setIsLoggedIn(false);
        });
    } else {
      setIsLoggedIn(false);
      setIsLoading(false);
      setCurrentUser(null);
    }
  };

  const removeUser = () => {
    removeToken();
    authenticateUser();
  };

  const removeToken = () => {
    localStorage.removeItem("authToken");
  };
  const storeToken = (token) => {
    localStorage.setItem("authToken", token);
  };

  const authStatus = {
    currentUser,
    removeUser,
    isLoading,
    isLoggedIn,
    storeToken,
    authenticateUser,
  };

  return (
    <AuthContext.Provider value={authStatus}>{children}</AuthContext.Provider>
  );
};

export default AuthWrapper;
