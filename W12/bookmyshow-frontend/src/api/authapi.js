// src/api/authApi.js


/*
=========================================================
SPRINT 2 – AUTHENTICATION API LAYER


TOPICS COVERED


✓ Axios Service Functions
✓ Backend Contract Consumption
✓ Error Normalization
✓ Reusable API Architecture


WHY THIS FILE EXISTS


This file centralizes all authentication-related
backend communication.


Instead of scattering axios calls throughout
multiple pages, pages invoke these reusable
functions.


IMPLEMENTATION NOTES


• Uses the shared axios instance.
• Returns response.data for consistency.
• Normalizes backend errors into JavaScript Errors.
• Allows UI components to focus on presentation.


KEY TAKEAWAYS


Pages should focus on UI.
API files should focus on communication.
=========================================================
*/


import api from "./axios";


/*
=========================================================
REGISTER USER
=========================================================


Endpoint:
POST /api/auth/register


Request:
{
    name,
    email,
    password
}


Actual Backend Response:
{
    success: true,
    message: "User registered successfully",
    data: { ... }
}


=========================================================
*/


export const registerUser = async (userData) => {
  try {
    const response = await api.post("/auth/register", userData);


    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Registration failed");
  }
};


/*
=========================================================
VERIFY OTP


NOTE:


OTP UI has been intentionally excluded
from the Frontend MVP.


This function is retained for:


✓ Backend parity
✓ Future enhancement
✓ Teaching reference


=========================================================


Endpoint:
POST /api/auth/verify-otp


Request:
{
    email,
    otp
}


=========================================================
*/


export const verifyOtp = async (otpData) => {
  try {
    const response = await api.post("/auth/verify-otp", otpData);


    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "OTP verification failed");
  }
};


/*
=========================================================
LOGIN USER
=========================================================


Endpoint:
POST /api/auth/login


Request:
{
    email,
    password
}


ACTUAL VERIFIED BACKEND RESPONSE


{
    "success": true,
    "message": "Login successful",
    "data": {
        "token": "...",
        "user": {
            "id": "...",
            "role": "user"
        }
    }
}


=========================================================
*/


export const loginUser = async (credentials) => {
  try {
    const response = await api.post("/auth/login", credentials);


    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Login failed");
  }
};


/*
=========================================================
ERROR STRATEGY


Backend


{
    success: false,
    message: "User already exists"
}


↓


Frontend


throw new Error("User already exists")


↓


UI


catch(error) {
    setError(error.message);
}


=========================================================


KEY TAKEAWAYS


1. API layer normalizes errors.


2. UI components consume a consistent
   Error object.


3. Backend response shapes remain
   encapsulated within the API layer.


=========================================================
*/
