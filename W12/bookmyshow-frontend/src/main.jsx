// src/main.jsx


/*
=========================================================
SPRINT 2 – AUTH PROVIDER INTEGRATION


TOPICS COVERED:


✓ BrowserRouter
✓ Global Providers
✓ Context Provider Composition


WHY THIS FILE?


Providers should wrap the application once.


BrowserRouter
↓
AuthProvider
↓
Entire Application


This allows every component to access:


✓ Routing
✓ Authentication


=========================================================
*/


import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";


import App from "./App";


import "./index.css";


import { AuthProvider } from "./context/AuthContext";


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
);


/*
=========================================================
APPLICATION TREE


BrowserRouter
↓
AuthProvider
↓
App
↓
Pages
↓
Components


=========================================================


KEY TAKEAWAYS


1. Providers should live near the root.


2. Auth becomes globally available.


3. Components don't require prop drilling.


=========================================================
*/