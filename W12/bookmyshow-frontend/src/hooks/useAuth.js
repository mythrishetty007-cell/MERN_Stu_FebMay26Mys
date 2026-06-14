// src/hooks/useAuth.js


/*
=========================================================
SPRINT 2 – CUSTOM AUTH HOOK


TOPICS COVERED:


✓ useContext
✓ Custom Hooks


WHY THIS FILE?


Without this:


const auth = useContext(AuthContext)


must be written everywhere.


Instead:


const auth = useAuth();


=========================================================
*/


import { useContext } from "react";


import { AuthContext } from "../context/AuthContext";


export function useAuth() {
  return useContext(AuthContext);
}


/*
=========================================================
KEY TAKEAWAYS


1. Custom hooks improve readability.


2. Context access becomes simpler.


3. Reduces repetitive code.


=========================================================
*/
