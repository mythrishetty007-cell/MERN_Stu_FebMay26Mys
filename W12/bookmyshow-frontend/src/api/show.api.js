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

/*
=========================================================
GET SHOW BY ID

GET /api/shows/:id
=========================================================
*/

export async function getShowById(showId) {
  const response = await api.get(
    `/shows/${showId}`,
  );
  return response.data;
}

/*
=========================================================
CREATE SHOW

POST /api/shows
=========================================================
*/

export async function createShow(showData) {
  const token = localStorage.getItem("token");


  const response = await api.post("/shows", showData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });


  return response.data;
}


/*
=========================================================
UPDATE SHOW


PUT /api/shows/:id
=========================================================
*/


export async function updateShow(showId, showData) {
  const token = localStorage.getItem("token");


  const response = await api.put(`/shows/${showId}`, showData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });


  return response.data;
}


/*
=========================================================
DELETE SHOW


DELETE /api/shows/:id
=========================================================
*/


export async function deleteShow(showId) {
  const token = localStorage.getItem("token");


  const response = await api.delete(`/shows/${showId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });


  return response.data;
}
