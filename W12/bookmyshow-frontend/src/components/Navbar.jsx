// src/components/Navbar.jsx


/*
=========================================================
SPRINT 1 – SHARED INFRASTRUCTURE


TOPICS COVERED:


✓ NavLink
✓ Active Links
✓ SPA Navigation


WHY THIS COMPONENT?


The Navbar appears throughout the
application.


Responsibilities:


✓ Primary Navigation
✓ Active Link Highlighting
✓ Easy Access to Features


Real BookMyShow:


Movies
Events
Sports
Profile


Students immediately understand
why navigation matters.


=========================================================
*/


import { NavLink } from "react-router-dom";


export default function Navbar() {


  return (


    <nav style={styles.nav}>


      <h2 style={styles.logo}>
        BookMyShow
      </h2>


      <div style={styles.links}>


        <NavLink
          to="/"
          end
          style={getNavStyle}
        >
          Home
        </NavLink>


        <NavLink
          to="/movies"
          style={getNavStyle}
        >
          Movies
        </NavLink>


        <NavLink
          to="/bookings"
          style={getNavStyle}
        >
          My Bookings
        </NavLink>


        <NavLink
          to="/login"
          style={getNavStyle}
        >
          Login
        </NavLink>


        <NavLink
          to="/signup"
          style={getNavStyle}
        >
          Signup
        </NavLink>


        <NavLink
          to="/admin"
          style={getNavStyle}>
          Admin
        </NavLink>
      </div>
    </nav>
  );
}


/*
=========================================================
ACTIVE LINK STYLING


NavLink provides:


isActive


which tells us whether the
current URL matches.


=========================================================
*/


function getNavStyle({ isActive }) {
  return {
    textDecoration: "none",
    color: isActive ? "#d32f2f" : "#333",

    fontWeight: isActive ? "bold" : "normal",


    borderBottom: isActive ? "2px solid #d32f2f" : "none",
    paddingBottom: "4px"
  };
}

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px 25px",
    background: "#fff",
    borderBottom: "1px solid #ddd"
  },

  logo: {
    color: "#d32f2f",
    margin: 0
  },

  links: {
    display: "flex",
    gap: "20px"
  }
};


/*
=========================================================
KEY TAKEAWAYS


1. NavLink enables SPA navigation. 


2. Active links improve UX.


3. Navigation should remain simple
   and reusable.


=========================================================
*/
