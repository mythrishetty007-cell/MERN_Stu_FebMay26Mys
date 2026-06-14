// src/layouts/AdminLayout.jsx


/*
=========================================================
SPRINT 1 – ADMIN LAYOUT


TOPICS COVERED:


✓ Nested Routing
✓ Outlet
✓ NavLink
✓ Shared Admin UI


WHY THIS COMPONENT?


Admin pages typically share:


Sidebar
↓
Admin Navigation
↓
Content Area


Examples:


Dashboard
Movie Management
Bookings
Users


Without layouts:


Sidebar gets duplicated
across every admin page.


=========================================================
*/


import {


    NavLink,


    Outlet


} from "react-router-dom";


export default function AdminLayout() {


    return (


        <section style={styles.container}>


            {/*
      ===================================================
      ADMIN SIDEBAR
      ===================================================
      */}


            <aside style={styles.sidebar}>


                <h2>


                    Admin Panel


                </h2>


                <nav style={styles.nav}>


                    <NavLink


                        to="/admin"


                        end


                        style={getNavStyle}


                    >


                        Dashboard


                    </NavLink>


                    <NavLink


                        to="/admin/movies"


                        style={getNavStyle}


                    >


                        Movies


                    </NavLink>


                </nav>


            </aside>


            {/*
      ===================================================
      ADMIN CONTENT


      Outlet injects:


      Dashboard
      Movie Management


      depending on the URL.


      ===================================================
      */}


            <main style={styles.content}>


                <Outlet />


            </main>


        </section>


    );


}


/*
=========================================================
ACTIVE ADMIN LINKS


Admin users should always know
their current location.


=========================================================
*/


function getNavStyle({


    isActive


}) {


    return {


        textDecoration: "none",


        color: isActive
            ? "#d32f2f"
            : "#333",


        fontWeight: isActive
            ? "bold"
            : "normal"


    };


}


const styles = {


    container: {


        display: "flex",


        minHeight: "100vh"


    },


    sidebar: {


        width: "250px",


        background: "#fff",


        borderRight: "1px solid #ddd",


        padding: "25px"


    },


    nav: {


        display: "flex",


        flexDirection: "column",


        gap: "15px",


        marginTop: "25px"


    },


    content: {


        flex: 1,


        padding: "30px"


    }


};


/*
=========================================================
FLOW


/admin
↓
ProtectedRoute
↓
AdminLayout
↓
Outlet
↓
Dashboard


-----------------------------------------


/admin/movies
↓
ProtectedRoute
↓
AdminLayout
↓
Outlet
↓
Movie Management


=========================================================


KEY TAKEAWAYS


1. Admin UI stays consistent.


2. Outlet powers nested routing.


3. Shared layouts improve maintainability.


4. NavLink improves navigation clarity.


=========================================================


VERIFICATION


✓ Dashboard renders correctly


✓ Movie Management renders correctly


✓ Sidebar remains visible


✓ Active admin links work


✓ Nested routes work


=========================================================
*/
