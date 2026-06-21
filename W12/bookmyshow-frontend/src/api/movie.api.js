/*
=========================================================
SPRINT 3 – MOVIE API LAYER


TOPICS COVERED:


✓ Axios
✓ Query Parameters
✓ API Abstraction


WHY THIS FILE?


Pages should NOT directly call APIs.


Responsibilities:


UI
↓
Redux
↓
API Layer
↓
Backend


=========================================================
*/


import axios from "axios";


/*
=========================================================
AXIOS INSTANCE


Centralizes backend communication.


Sprint 6:
↓
Interceptors
↓
JWT Tokens
↓
Global Error Handling


=========================================================
*/


const api = axios.create({
  baseURL: "http://localhost:5000/api",
});


export async function getMovies(filters = {}) {
  const response = await api.get("/movies", {
    params: filters,
  });


  return response.data;
}

/*
=========================================================
GET MOVIE BY ID
GET /api/movies/:id
=========================================================
*/
export async function getMovieById(id) {
  const response = await api.get(`/movies/${id}`);


  return response.data;
}
