// src/context/AuthContext.jsx


/*
=========================================================
SPRINT 2 – GLOBAL AUTHENTICATION STATE


TOPICS COVERED:


✓ createContext
✓ Context Provider
✓ Global State
✓ Session Persistence


WHY THIS FILE?


Authentication affects the entire app.


Navbar
Protected Routes
Admin Pages
Bookings


all need access to auth state.


=========================================================
*/


import { createContext, useEffect, useState } from "react";


export const AuthContext = createContext();


export function AuthProvider({ children }) {
  /*
  -----------------------------------------
  GLOBAL AUTH STATE
  -----------------------------------------
  */


  const [user, setUser] = useState(null);


  const [token, setToken] = useState(null);


  const [loading, setLoading] = useState(true);


  /*
  -----------------------------------------
  RESTORE SESSION


  Browser Refresh
  ↓
  User stays logged in


  -----------------------------------------
  */


  useEffect(() => {
    try {
      const storedToken = localStorage.getItem("token");


      const storedUser = localStorage.getItem("user");


      if (storedToken && storedUser) {
        setToken(storedToken);


        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error(
        "Failed to restore session",


        error,
      );


      localStorage.removeItem("token");


      localStorage.removeItem("user");
    }


    setLoading(false);
  }, []);


  /*
  -----------------------------------------
  LOGIN


  Stores session globally.


  -----------------------------------------
  */


  function login(token, user) {
    localStorage.setItem(
      "token",


      token,
    );


    localStorage.setItem(
      "user",


      JSON.stringify(user),
    );


    setToken(token);


    setUser(user);
  }


  /*
  -----------------------------------------
  LOGOUT


  Clears session.


  -----------------------------------------
  */


  function logout() {
    localStorage.removeItem("token");


    localStorage.removeItem("user");


    setToken(null);


    setUser(null);
  }


  const value = {
    user,


    token,


    loading,


    login,


    logout,


    isAuthenticated: !!token,
  };


  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}


/*
=========================================================
KEY TAKEAWAYS


1. Context manages global auth.


2. localStorage enables persistence.


3. Refresh does not log users out.


=========================================================
*/
