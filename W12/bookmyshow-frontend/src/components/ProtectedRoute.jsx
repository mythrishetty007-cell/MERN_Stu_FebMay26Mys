// src/components/ProtectedRoute.jsx


/*
=========================================================
SPRINT 2 – REAL ROUTE PROTECTION


TOPICS COVERED:


✓ Protected Routes
✓ Context API
✓ Custom Hooks
✓ Navigate
✓ Role-Based Authorization
✓ Authentication vs Authorization


WHY THIS COMPONENT?


Certain pages should only be accessible
to authenticated users.


Examples:


Bookings
↓
Logged-in Users


Admin Dashboard
↓
Admin Users


Sprint 1:


Mock Authentication


Sprint 2:


JWT
↓
AuthContext
↓
Real Authorization


IMPLEMENTATION NOTES


• Uses useAuth() from AuthContext.
• Redirects guests to Login.
• Redirects unauthorized roles Home.
• Keeps route protection centralized.


KEY TAKEAWAYS


Authentication:
Who are you?


Authorization:
What are you allowed to access?


=========================================================
*/


import { Navigate } from "react-router-dom";


import { useAuth } from "../context/AuthContext";


import LoadingSpinner from "../components/LoadingSpinner";


export default function ProtectedRoute({ children, requiredRole }) {
  /*
  =====================================================
  AUTHENTICATION STATE


  Retrieved from AuthContext.


  =====================================================
  */


  // const { isAuthenticated, user } = useAuth();


  const { isAuthenticated, user, loading } = useAuth();


  /*
  =====================================================
  AUTHENTICATION CHECK


  Guest users must login first.


  =====================================================
  */


  if (loading) {
    return <LoadingSpinner />;
  }


  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }


  /*
  =====================================================
  AUTHORIZATION CHECK


  Some routes require a specific role.


  Example:


  Admin Dashboard
  ↓
  role === "admin"


  =====================================================
  */


  if (requiredRole && user?.role !== requiredRole) {
    return <Navigate to="/" replace />;
  }


  /*
  =====================================================
  ACCESS GRANTED


  =====================================================
  */


  return children;
}


/*
=========================================================
FLOW


Guest User


Protected Route
↓
Authenticated?
↓
No
↓
Redirect → /login




Authenticated User


Protected Route
↓
Authenticated?
↓
Yes
↓
Role Required?
↓
No
↓
Allow Access




Admin Route


Protected Route
↓
Authenticated?
↓
Yes
↓
Role Required?
↓
Yes
↓
Role Matches?
↓
No → Redirect Home
↓
Yes → Render Page


=========================================================


AUTHENTICATION VS AUTHORIZATION


Authentication


"Who are you?"


Example:
Logged In?




Authorization


"What can you access?"


Example:
Admin Only?




=========================================================


KEY TAKEAWAYS


1. Route protection should be centralized.


2. Authentication and Authorization
   are separate concerns.


3. Context eliminates mock values.


4. Logout instantly revokes access.


=========================================================


VERIFICATION


✓ Guest users redirected to Login


✓ Logged-in users access Bookings


✓ Customers blocked from Admin pages


✓ Admins access Admin routes


✓ Refresh preserves access


✓ Logout revokes access


=========================================================
*/
