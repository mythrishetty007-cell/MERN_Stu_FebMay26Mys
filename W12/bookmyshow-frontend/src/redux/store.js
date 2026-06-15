// src/redux/store.js


/*
=========================================================
SPRINT 3 – REDUX STORE CONFIGURATION


TOPICS COVERED:


✓ Redux Toolkit
✓ configureStore
✓ Global State Management


WHY THIS FILE?


The Redux store acts as the central container for application-wide state.


Sprint 3 introduces Redux only for Movie Discovery.


WHY NOT CONTEXT?


Authentication:
↓
Small global state
↓
Context API


Movies:
↓
Search
Pagination
Filters
Loading States
Errors
↓
Redux Toolkit


=========================================================
*/


import { configureStore } from "@reduxjs/toolkit";


import moviesReducer from "./movies/moviesSlice";


/*
=========================================================
STORE CONFIGURATION


Slices registered here become part
of the global Redux state.


Current Structure:


store
↓
movies


=========================================================
*/


export const store = configureStore({
  reducer: {
    movies: moviesReducer,
  },
});


/*
=========================================================
STATE SHAPE


{
  movies: {
    ...
  }
}


=========================================================


KEY TAKEAWAYS


1. Redux store is the global state
   container.


2. configureStore simplifies setup.


3. Feature slices remain modular.


=========================================================
*/
