// src/components/ProtectedRoute.jsx


/*
=========================================================
SPRINT 1 – SHARED INFRASTRUCTURE


TOPICS COVERED:


✓ Protected Routes
✓ Conditional Rendering
✓ Navigate
✓ Role-Based Authorization


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


Sprint 1 uses mock values.


Real JWT authentication
arrives in Sprint 2.


=========================================================
*/


import {


  Navigate


} from "react-router-dom";


export default function ProtectedRoute({


  children,


  requiredRole


}) {


  /*
  =====================================================
  MOCK AUTHENTICATION


  Sprint 2 replaces these values
  with Context API.


  =====================================================
  */


  const isAuthenticated = true;


  const userRole = "admin";


  /*
  =====================================================
  AUTH CHECK
  =====================================================
  */


  if (!isAuthenticated) {


    return (


      <Navigate


        to="/login"


        replace


      />


    );


  }


  /*
  =====================================================
  ROLE CHECK
  =====================================================
  */


  if (


    requiredRole &&


    requiredRole !== userRole


  ) {


    return (


      <Navigate


        to="/"


        replace


      />


    );


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


Protected Route
↓
Authenticated?
↓
No → Login


Yes
↓
Role Needed?
↓
No → Allow


Yes
↓
Role Matches?
↓
No → Home


Yes → Render Page


=========================================================


KEY TAKEAWAYS


1. Route protection centralizes logic.


2. Authorization is different from
   authentication.


3. Mock values simplify Sprint 1.


4. Sprint 2 replaces this with JWT.


=========================================================
*/
