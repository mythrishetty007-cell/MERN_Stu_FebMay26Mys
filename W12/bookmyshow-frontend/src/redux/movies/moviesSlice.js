// src/redux/movies/moviesSlice.js


/*
=========================================================
SPRINT 3 – MOVIES SLICE (FOUNDATION)


TOPICS COVERED:


✓ createSlice
✓ Initial State
✓ Feature-Based State


WHY THIS FILE?


Redux organizes state into slices.


This slice owns everything related
to movie discovery.


Future Responsibilities:


✓ Movie List
✓ Loading State
✓ Errors
✓ Pagination
✓ Filters


=========================================================
*/


import { createSlice } from "@reduxjs/toolkit";


/*
=========================================================
INITIAL STATE


Movies data arrives in later steps.


=========================================================
*/


const initialState = {
  movies: [],


  loading: false,


  error: null,


  pagination: null,
};


/*
=========================================================
MOVIES SLICE


No reducers yet.


Async reducers arrive when we
integrate APIs.


=========================================================
*/


const moviesSlice = createSlice({
  name: "movies",


  initialState,


  reducers: {},
});


export default moviesSlice.reducer;


/*
=========================================================
STATE SHAPE


movies
↓
movies[]
loading
error
pagination


=========================================================


KEY TAKEAWAYS


1. Slices own a feature.


2. Initial state defines the
   contract.


3. Async behavior is introduced
   progressively.


=========================================================
*/
