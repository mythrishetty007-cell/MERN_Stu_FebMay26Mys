// src/routes/AppRoutes.jsx


/*
=========================================================
SPRINT 1 – ROUTING BRAIN


TOPICS COVERED:


✓ React Router v7
✓ Routes
✓ Route
✓ Nested Routes
✓ Outlet-based Architecture
✓ React.lazy()
✓ Suspense
✓ Protected Routes
✓ 404 Routing


WHY THIS FILE?


AppRoutes.jsx is the routing brain
of the entire application.


Responsibilities:


URL
↓
Match Route
↓
Load Layout
↓
Load Page
↓
Render UI


Without this file:


✓ Navigation breaks
✓ Protected routes break
✓ Nested routes break
✓ 404 handling breaks


=========================================================
*/


import { lazy, Suspense } from "react";


import { Routes, Route, Navigate } from "react-router-dom";


/*
=========================================================
SHARED COMPONENTS
=========================================================
*/


import LoadingSpinner from "../components/LoadingSpinner";
import ProtectedRoute from "../components/ProtectedRoute";


/*
=========================================================
LAYOUTS


Layouts define common UI structure.


PublicLayout
↓
Navbar
↓
Outlet


AdminLayout
↓
Admin Sidebar
↓
Outlet


=========================================================
*/


import PublicLayout from "../layouts/PublicLayout";
import AdminLayout from "../layouts/AdminLayout";


/*
=========================================================
LAZY LOADING


WHY?


Large route components should not
be bundled immediately.


Benefits:


✓ Faster initial load
✓ Smaller bundle size
✓ Production-oriented approach


We lazy load only pages,
NOT tiny reusable components.


=========================================================
*/


const Home = lazy(() => import("../pages/Home"));


const Movies = lazy(() => import("../pages/Movies"));


const Login = lazy(() => import("../pages/Login"));


const Signup = lazy(() => import("../pages/Signup"));


const Bookings = lazy(() => import("../pages/Bookings"));


const NotFound = lazy(() => import("../pages/NotFound"));


const Dashboard = lazy(() => import("../pages/admin/Dashboard"));


const MovieManagement = lazy(() => import("../pages/admin/MovieManagement"));


/*
=========================================================
APP ROUTES


ROUTE ARCHITECTURE


PUBLIC


/
├── Home
├── Movies
├── Login
├── Signup


USER


/bookings


ADMIN


/admin
├── dashboard
└── movies


FALLBACK


*


=========================================================
*/


export default function AppRoutes() {
  return (
    /*
    =====================================================
    SUSPENSE


    Displays fallback UI while lazy
    components are being downloaded.


    =====================================================
    */


    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        {/*
        =================================================
        PUBLIC ROUTES


        PublicLayout
        ↓
        Navbar
        ↓
        Outlet
        =================================================
        */}


        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />


          <Route path="/movies" element={<Movies />} />


          <Route path="/login" element={<Login />} />


          <Route path="/signup" element={<Signup />} />
        </Route>


        {/*
        =================================================
        USER ROUTES


        Sprint 1 uses mock protection.


        Real authentication arrives
        in Sprint 2.


        =================================================
        */}
	  
        <Route
          element={
            <ProtectedRoute>
              <Bookings />
            </ProtectedRoute>
          }
        />
         
        {/*
        =================================================
        ADMIN ROUTES


        Protected
        ↓
        Admin Layout
        ↓
        Nested Admin Pages


        =================================================
        */}


          <Route
            path="/admin"
            element={
              <ProtectedRoute roles={["admin"]}>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
          {/*
          ===============================================
          INDEX ROUTE


          /admin
          ↓
          Dashboard


          ===============================================
          */}


          <Route index element={<Dashboard />} />


          <Route path="dashboard" element={<Dashboard />} />


          <Route path="movies" element={<MovieManagement />} />
        </Route>


        {/*
        =================================================
        404 ROUTE


        Must always be LAST.


        =================================================
        */}


        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}


/*
=========================================================
ROUTING FLOW


Browser URL
↓
BrowserRouter
↓
App.jsx
↓
AppRoutes.jsx
↓
Find Matching Route
↓
Load Layout
↓
Load Page
↓
Render UI


=========================================================


PROTECTED ROUTE FLOW


User Visits:


/bookings
↓
ProtectedRoute
↓
Allowed?
↓
Yes → Bookings


No → Redirect


=========================================================


ADMIN ROUTE FLOW


/admin/movies
↓
ProtectedRoute
↓
Role Check
↓
AdminLayout
↓
MovieManagement


=========================================================


KEY TAKEAWAYS


1. AppRoutes.jsx is the routing brain.


2. Layouts reduce duplication.


3. Suspense enables route-level
   lazy loading.


4. ProtectedRoute centralizes
   authorization logic.


5. Nested routing mirrors real
   application structure.


=========================================================


VERIFICATION


✓ React Router v7 compatible


✓ Lazy loading configured


✓ Suspense fallback configured


✓ Public routes working


✓ Protected routes prepared


✓ Admin nesting configured


✓ Index routes configured


✓ 404 handling configured


✓ Production-oriented structure


=========================================================
*/
