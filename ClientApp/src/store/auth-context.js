import axios from "axios";
import React, { useEffect, useState } from "react";
import { axiosGet, axiosPost } from "../helperFunctions/AxiosFunctions";
import { redirect, useNavigate } from "react-router-dom";


const AuthContext = React.createContext({
  isLoggedIn: false,
  token: null,
  user: null,
  isLoading: false,
  onLogout: () => {},
  onLogin: () => {},
});

export function AuthContextProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [serverError, setServerError] = useState(null);

 

  useEffect(() => {
    const storedToken = localStorage.getItem("jwt");

    if (storedToken !== null) {
       setIsLoading(true);
      const config = { headers: { "Authorization": `Bearer ${storedToken}` } };

      axiosGet("users", config).then((response) =>{ setUser(response); setIsLoading(false)});
      setIsLoggedIn(true);
      setToken(storedToken);
    
    } 
  }, []);

  function loginHandler(loginData) {

    setIsLoading(true);
    axiosPost("users/login", loginData)
      .then((response) => {
      
        localStorage.setItem("jwt", response.token);
        setToken(response.token);
        setIsLoggedIn(true);
        setUser(response);
        setIsLoading(false);
      
      })
      .catch((error) => {setIsLoading(false); console.log(error);});
  }

  function logoutHandler() {
    setIsLoggedIn(false);
    setToken(null);
    localStorage.removeItem("jwt");
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        token: token,
        user: user,
        isLoading: isLoading,
        onLogout: logoutHandler,
        onLogin: loginHandler,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
