// src/App.jsx


/*
=========================================================
SPRINT 1 – CORE APPLICATION BOOTSTRAPPING


TOPICS COVERED:


✓ Functional Components
✓ Component Composition


WHY THIS FILE?


App.jsx acts as the root component.


Responsibilities:


App
↓
AppRoutes
↓
Layouts
↓
Pages


Keeping App.jsx small makes the
application easier to understand
and maintain.


=========================================================
*/


import AppRoutes from "./routes/AppRoutes";


export default function App() {


  return (


    <div className="app-container">


      <AppRoutes />


    </div>


  );


}


/*
=========================================================
APPLICATION FLOW


main.jsx
↓
BrowserRouter
↓
App.jsx
↓
AppRoutes.jsx
↓
Layouts
↓
Pages


=========================================================


KEY TAKEAWAYS


1. App.jsx should remain lightweight.


2. Routing logic belongs elsewhere.


3. Separation of responsibilities
improves maintainability.


=========================================================
*/
