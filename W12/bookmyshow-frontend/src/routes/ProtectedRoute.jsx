// src/routes/ProtectedRoute.jsx


/*
=========================================================
SPRINT 2 – PROTECTED ROUTES


TOPICS COVERED:


✓ Conditional Rendering
✓ Navigate
✓ Authentication Checks
✓ Authorization Checks


WHY THIS COMPONENT?


Some pages require login.


Examples:


Bookings
↓
Logged-in Users


Admin Dashboard
↓
Admin Users Only


=========================================================
*/


import { Navigate } from "react-router-dom";


import { useAuth } from "../hooks/useAuth";


export default function ProtectedRoute({
  children,


  roles = [],
}) {
  const {
    isAuthenticated,


    loading,


    user,
  } = useAuth();


  /*
  ------------------------------------------------
  SESSION RESTORATION IN PROGRESS
  ------------------------------------------------
  */


  if (loading) {
    return <p>Restoring session...</p>;
  }


  /*
  ------------------------------------------------
  USER NOT LOGGED IN
  ------------------------------------------------
  */


  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }


  /*
  ------------------------------------------------
  ROLE CHECK


  Example:


  roles = ["admin"]


  user.role === "user"


  ↓


  Redirect


  ------------------------------------------------
  */


  if (roles.length > 0 && !roles.includes(user?.role)) {
    return <Navigate to="/" replace />;
  }


  return children;
}


/*
=========================================================
FLOWS


BOOKINGS


User Logged In
↓
Allowed


Logged Out
↓
Login Page




ADMIN


Admin
↓
Allowed


Customer
↓
Redirect Home


=========================================================


KEY TAKEAWAYS


1. Authentication and authorization
   are different concepts.


2. ProtectedRoute centralizes checks.


3. Session restoration prevents
   incorrect redirects.


=========================================================
*/
