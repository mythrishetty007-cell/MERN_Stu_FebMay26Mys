// src/api/authapi.js


/*
=========================================================
SPRINT 2 – AUTHENTICATION APIs


TOPICS COVERED:


✓ API Abstraction
✓ POST Requests
✓ Async/Await


WHY THIS FILE?


Pages should focus on UI.


Backend communication should live here.


Signup.jsx
↓
Calls registerUser()


instead of writing Axios code directly.


=========================================================
*/


import api from "./axios";


/*
=========================================================
REGISTER USER


Backend Contract:


POST /api/auth/register


=========================================================
*/


export async function registerUser(payload) {
  const response = await api.post(
    "/auth/register",


    payload,
  );


  return response.data;
}


/*
=========================================================
VERIFY OTP


Backend Contract:


POST /api/auth/verify-otp


=========================================================
*/


export async function verifyOtp(payload) {
  const response = await api.post(
    "/auth/verify-otp",


    payload,
  );


  return response.data;
}


/*
=========================================================
LOGIN USER


Backend Contract:


POST /api/auth/login


=========================================================
*/


export async function loginUser(payload) {
  const response = await api.post(
    "/auth/login",


    payload,
  );


  return response.data;
}


/*
=========================================================
KEY TAKEAWAYS


1. UI stays clean.


2. API contracts live in one place.


3. Backend changes affect only this file.


=========================================================
*/