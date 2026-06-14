// src/context/AuthContext.jsx


/*
=========================================================
SPRINT 2 – AUTHENTICATION CONTEXT


TOPICS COVERED:


✓ Context API
✓ createContext()
✓ useContext()
✓ useState()
✓ useEffect()
✓ Custom Hooks
✓ Session Persistence
✓ JWT Management


WHY THIS FILE?


Authentication information is needed
throughout the application.


Examples:


Navbar
↓
Show Login / Logout


ProtectedRoute
↓
Access Control


Admin Routes
↓
Role Validation


Without Context:


Props drilling
↓
Messy code


With Context:


Global Authentication Store


=========================================================
*/


import { createContext, useContext, useEffect, useMemo, useState } from "react";


/*
=========================================================
CREATE AUTH CONTEXT


This becomes the global container
for authentication information.


=========================================================
*/


const AuthContext = createContext(null);


/*
=========================================================
AUTH PROVIDER


Wraps the application and exposes
authentication state.


=========================================================
*/


export function AuthProvider({ children }) {
  /*
    =====================================================
    AUTHENTICATION STATE


    user:
    Stores currently logged-in user.


    token:
    Stores JWT.


    =====================================================
    */


  const [user, setUser] = useState(null);


  const [token, setToken] = useState(null);


  /*
    =====================================================
    SESSION RESTORATION


    Runs once when the application starts.


    Restores authentication from
    localStorage.


    =====================================================
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
      console.error("Failed to restore authentication:", error);


      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }
  }, []);


  /*
    =====================================================
    LOGIN


    Receives:


    token
    user


    Updates:


    State
    localStorage


    =====================================================
    */


  function login(authToken, userData) {
    setToken(authToken);


    setUser(userData);


    localStorage.setItem("token", authToken);


    localStorage.setItem("user", JSON.stringify(userData));
  }


  /*
    =====================================================
    LOGOUT


    Clears:


    State
    localStorage


    =====================================================
    */


  function logout() {
    setToken(null);


    setUser(null);


    localStorage.removeItem("token");


    localStorage.removeItem("user");
  }


  /*
    =====================================================
    DERIVED STATE


    Avoid storing redundant state.


    Authentication can be derived.


    =====================================================
    */


  const isAuthenticated = Boolean(token);


  /*
    =====================================================
    CONTEXT VALUE


    useMemo prevents unnecessary
    object recreation.


    =====================================================
    */


  const value = useMemo(
    () => ({
      user,
      token,
      isAuthenticated,
      login,
      logout,
    }),
    [user, token, isAuthenticated],
  );


  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}


/*
=========================================================
CUSTOM HOOK


Instead of:


useContext(AuthContext)


everywhere,


we expose:


useAuth()


=========================================================
*/


export function useAuth() {
  const context = useContext(AuthContext);


  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }


  return context;
}
