/*
=========================================================
TOPICS COVERED


• Authentication API Layer
• Axios Service Functions
• Backend Contract Consumption
• Error Propagation
• Reusable API Architecture


WHY THIS FILE EXISTS


This file centralizes all authentication-related
backend communication.


Instead of scattering axios calls throughout
multiple pages, pages invoke these reusable
functions.


IMPLEMENTATION NOTES


• Uses the shared axios instance.
• Returns response.data for consistency.
• Allows calling components to handle UI concerns.
• Errors are re-thrown to preserve backend messages.


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


Response:
{
    success: true,
    message: "...",
    data: {
        email
    }
}
*/
export const registerUser = async (userData) => {
  try {
    const response = await api.post("/auth/register", userData);


    return response.data;
  } catch (error) {
    /*
        Preserve backend error messages.


        Example:
        "User already exists"
        */
    throw (
      error.response?.data || {
        success: false,
        message: "Registration failed",
      }
    );
  }
};


/*
=========================================================
VERIFY OTP
=========================================================


Endpoint:
POST /api/auth/verify-otp


Request:
{
    email,
    otp
}


Response:
{
    success: true,
    message: "OTP verified successfully"
}
*/
export const verifyOtp = async (otpData) => {
  try {
    const response = await api.post("/auth/verify-otp", otpData);


    return response.data;
  } catch (error) {
    throw (
      error.response?.data || {
        success: false,
        message: "OTP verification failed",
      }
    );
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


Response:
{
    success: true,
    message: "Login successful",
    data: {
        token,
        user
    }
}
*/
export const loginUser = async (credentials) => {
  try {
    const response = await api.post("/auth/login", credentials);


    return response.data;
  } catch (error) {
    throw (
      error.response?.data || {
        success: false,
        message: "Login failed",
      }
    );
  }
};
