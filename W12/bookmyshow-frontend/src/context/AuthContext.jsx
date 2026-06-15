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
✓ useMemo()
✓ Custom Hooks
✓ Session Persistence
✓ JWT Management
✓ Authentication Initialization


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


import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";


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


  loading:
  Indicates whether authentication
  restoration is in progress.


  =====================================================
  */


  const [user, setUser] = useState(null);


  const [token, setToken] = useState(null);


  const [loading, setLoading] = useState(true);


  /*
  =====================================================
  SESSION RESTORATION


  Runs once when the application starts.


  Restores authentication from
  localStorage.


  WHY LOADING?


  Without loading:


  App Starts
  ↓
  isAuthenticated = false
  ↓
  ProtectedRoute redirects
  ↓
  Auth restored too late


  With loading:


  App Starts
  ↓
  Wait for restoration
  ↓
  Authentication determined
  ↓
  ProtectedRoute decides correctly


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
      console.error(
        "Failed to restore authentication:",
        error
      );


      localStorage.removeItem("token");


      localStorage.removeItem("user");
    } finally {
      /*
      Authentication initialization
      has completed.
      */


      setLoading(false);
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


    localStorage.setItem(
      "user",
      JSON.stringify(userData)
    );
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
      loading,
      isAuthenticated,
      login,
      logout,
    }),
    [
      user,
      token,
      loading,
      isAuthenticated,
    ]
  );


  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
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
    throw new Error(
      "useAuth must be used within AuthProvider"
    );
  }


  return context;
}


/*
=========================================================
AUTHENTICATION FLOW


Application Starts
↓
AuthProvider Mounts
↓
loading = true
↓
Read localStorage
↓
Restore token and user
↓
loading = false
↓
ProtectedRoute evaluates access


=========================================================


LOGIN FLOW


User Logs In
↓
login()
↓
Update Context State
↓
Persist to localStorage
↓
Entire App Reacts


=========================================================


LOGOUT FLOW


User Logs Out
↓
logout()
↓
Clear Context State
↓
Clear localStorage
↓
Protected Routes Locked


=========================================================


KEY TAKEAWAYS


1. Context centralizes authentication.


2. localStorage enables session persistence.


3. loading prevents authentication flicker.


4. Authentication state should be
   derived from the token.


5. Custom hooks improve readability.


=========================================================
*/
