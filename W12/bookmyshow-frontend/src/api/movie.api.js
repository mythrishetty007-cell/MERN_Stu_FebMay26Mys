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

/*
=========================================================
CREATE MOVIE


POST /api/movies
=========================================================
*/


export async function createMovie(movieData) {
  const token = localStorage.getItem("token");


  const response = await api.post("/movies", movieData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });


  return response.data;
}


/*
=========================================================
UPDATE MOVIE


PUT /api/movies/:id
=========================================================
*/


export async function updateMovie(movieId, movieData) {
  const token = localStorage.getItem("token");


  const response = await api.put(`/movies/${movieId}`, movieData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });


  return response.data;
}


/*
=========================================================
DELETE MOVIE


DELETE /api/movies/:id
=========================================================
*/


export async function deleteMovie(movieId) {
  const token = localStorage.getItem("token");


  const response = await api.delete(`/movies/${movieId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });


  return response.data;
}
