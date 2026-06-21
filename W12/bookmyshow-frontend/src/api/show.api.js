/*
=========================================================
SPRINT 4 – SHOW API LAYER


TOPICS COVERED


✓ Axios
✓ Query Parameters
✓ API Abstraction


WHY THIS FILE?


Handles all show-related backend communication.


=========================================================
*/


import api from "./axios";


/*
=========================================================
GET SHOWS


GET /api/shows?movieId=:movieId
=========================================================
*/


export async function getShows(filters = {}) {
  const response = await api.get("/shows", {
    params: filters,
  });


  return response.data;
}