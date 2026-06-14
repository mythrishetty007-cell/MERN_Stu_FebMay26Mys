// src/layouts/PublicLayout.jsx


/*
=========================================================
SPRINT 1 – LAYOUTS


TOPICS COVERED:


✓ Nested Routing
✓ Outlet
✓ Layout Components
✓ Shared UI


WHY THIS COMPONENT?


Most public pages share a common
structure.


Example:


Home
Movies
Login
Signup


All require:


Navbar
↓
Page Content


Without layouts:


Navbar gets repeated
in every page.


Layouts eliminate duplication.


=========================================================
*/


import { Outlet } from "react-router-dom";


import Navbar from "../components/Navbar";


export default function PublicLayout() {


    return (


        <>


            {/*
      ===================================================
      SHARED PUBLIC NAVIGATION
      ===================================================
      */}


            <Navbar />


            {/*
      ===================================================
      OUTLET


      Outlet acts as a placeholder.


      React Router injects the
      matched child route here.


      Example:


      URL: /


      PublicLayout
      ↓
      Home


      URL: /movies


      PublicLayout
      ↓
      Movies


      ===================================================
      */}


            <main style={styles.container}>


                <Outlet />


            </main>


        </>


    );


}


const styles = {


    container: {


        maxWidth: "1200px",


        margin: "0 auto",


        padding: "25px"


    }


};


/*
=========================================================
FLOW


PublicLayout
↓
Navbar
↓
Outlet
↓
Matched Public Page


=========================================================


KEY TAKEAWAYS


1. Layouts prevent duplication.


2. Outlet renders child routes.


3. Public pages share common UI.


=========================================================


VERIFICATION


✓ Navbar always visible


✓ Home renders inside Outlet


✓ Movies renders inside Outlet


✓ Login renders inside Outlet


✓ Signup renders inside Outlet


=========================================================
*/
