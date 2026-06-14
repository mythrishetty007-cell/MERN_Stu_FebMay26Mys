// src/main.jsx


/*
=========================================================
SPRINT 2 – AUTH PROVIDER INTEGRATION


TOPICS COVERED:


✓ React 18 Root API
✓ BrowserRouter
✓ Context Provider Composition
✓ Global Authentication Availability


WHY THIS FILE?


main.jsx is the true entry point
of the application.


Sprint 1:


BrowserRouter
↓
App


Sprint 2:


AuthProvider
↓
BrowserRouter
↓
App


This ensures authentication state
is available throughout the app.


=========================================================
*/


import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";


import App from "./App";
import "./index.css";


import { AuthProvider } from "./context/AuthContext";


ReactDOM.createRoot(
  document.getElementById("root")
).render(
  <React.StrictMode>


    {/*
    =====================================================
    AUTH PROVIDER


    Makes authentication state available
    globally.


    Examples:


    Navbar
    ↓
    useAuth()


    ProtectedRoute
    ↓
    useAuth()


    Login
    ↓
    useAuth()


    =====================================================
    */}


    <AuthProvider>


      <BrowserRouter>


        <App />


      </BrowserRouter>


    </AuthProvider>


  </React.StrictMode>
);


/*
=========================================================
APPLICATION FLOW


index.html
↓
main.jsx
↓
AuthProvider
↓
BrowserRouter
↓
App.jsx
↓
AppRoutes.jsx
↓
Layouts
↓
Pages


=========================================================


KEY TAKEAWAYS


1. Context Providers should wrap
   the components that consume them.


2. Authentication becomes globally
   accessible.


3. BrowserRouter and AuthProvider
   work together seamlessly.


4. This prepares the application
   for real login/logout flows.


=========================================================
*/
