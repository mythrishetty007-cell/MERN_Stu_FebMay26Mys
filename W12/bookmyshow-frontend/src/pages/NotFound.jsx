// src/pages/NotFound.jsx


/*
=========================================================
SPRINT 1 – 404 PAGE


TOPICS COVERED:


✓ Catch-All Routing
✓ useNavigate
✓ Event Handling


WHY THIS COMPONENT?


Users may attempt to access:


Invalid URLs
↓
Deleted Pages
↓
Incorrect Bookmarks


Instead of a blank screen,


we provide a meaningful
recovery experience.


=========================================================
*/


import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();


  return (
    <section style={styles.container}>
      <h1>404</h1>

      <h2>Page Not Found</h2>

      <p>The page you're looking for doesn't exist.</p>

      <button onClick={() => navigate("/")}>Return Home</button>
    </section>
  );
}


const styles = {
  container: {
    minHeight: "60vh",

    display: "flex",

    flexDirection: "column",

    justifyContent: "center",

    alignItems: "center",

    gap: "20px",

    textAlign: "center",
  },
};


/*
=========================================================
FLOW


Unknown URL
↓
Catch-All Route (*)
↓
NotFound Page
↓
Navigate Home


=========================================================


KEY TAKEAWAYS


1. Every application should handle
   invalid routes gracefully.


2. Recovery actions improve UX.


3. 404 pages are part of
   production readiness.


=========================================================
*/
