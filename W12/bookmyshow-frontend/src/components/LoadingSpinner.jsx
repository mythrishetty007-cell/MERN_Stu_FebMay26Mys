// src/components/LoadingSpinner.jsx


/*
=========================================================
SPRINT 1 – SHARED INFRASTRUCTURE


TOPICS COVERED:


✓ Reusable Components
✓ Suspense Fallback UI


WHY THIS COMPONENT?


Lazy-loaded pages take time to load.


Without feedback:


Blank Screen
↓
Poor UX


With Loading Spinner:


Loading
↓
User Reassurance


=========================================================
*/


export default function LoadingSpinner() {
  return (
    <div style={styles.container}>
      <div style={styles.spinner} />
      <p>
        Loading...
      </p>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "60vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: "15px"
  },

  spinner: {
    width: "40px",
    height: "40px",
    border: "4px solid #ddd",
    borderTop: "4px solid #d32f2f",
    borderRadius: "50%",
    animation: "spin 1s linear infinite"
  }
};

/*
=========================================================
KEY TAKEAWAYS


1. Loading states are essential.


2. Suspense fallback improves UX.


3. Reusable components reduce duplication.


=========================================================
*/
