// src/pages/Login.jsx


/*
=========================================================
SPRINT 2 – REAL LOGIN INTEGRATION


TOPICS COVERED:


✓ Controlled Components
✓ useState
✓ API Integration
✓ Context API
✓ JWT Authentication
✓ Loading State
✓ Error Handling
✓ useNavigate


WHY THIS COMPONENT?


Login is the gateway into the
authenticated experience.


Sprint 1:


Login Form
↓
console.log()


Sprint 2:


Login Form
↓
loginUser()
↓
JWT Received
↓
AuthContext Updated
↓
Session Persisted
↓
Protected Routes Unlocked


IMPLEMENTATION NOTES


• Uses loginUser() from authApi.js
• Uses AuthContext.login()
• Prevents duplicate submissions
• Preserves backend error messages
• Redirects based on role


KEY TAKEAWAYS


Pages manage UI.


API files manage communication.


Context manages authentication state.


=========================================================
*/


import { useState } from "react";


import { Link, useNavigate } from "react-router-dom";


import { loginUser } from "../api/authApi";


import { useAuth } from "../context/AuthContext";


export default function Login() {
  const navigate = useNavigate();


  const { login } = useAuth();


  const [form, setForm] = useState({
    email: "",
    password: "",
  });


  const [loading, setLoading] = useState(false);


  const [error, setError] = useState("");


  function handleChange(event) {
    const { name, value } = event.target;


    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  }


  async function handleSubmit(event) {
    event.preventDefault();


    setError("");


    /*
    -----------------------------------------
    CLIENT VALIDATION
    -----------------------------------------
    */


    if (!form.email.trim() || !form.password.trim()) {
      setError("Email and password are required.");


      return;
    }


    /*
    -----------------------------------------
    PREVENT DUPLICATE SUBMISSIONS
    -----------------------------------------
    */


    if (loading) return;


    try {
      setLoading(true);


      const response = await loginUser(form);


      /*
      ACTUAL BACKEND RESPONSE


      {
        success: true,
        message: "Login successful",
        data: {
          token,
          user
        }
      }
      */


      const token = response.data?.token;


      const user = response.data?.user;


      if (!token || !user) {
        throw new Error("Invalid login response received.");
      }


      /*
      -----------------------------------------
      UPDATE AUTH CONTEXT
      -----------------------------------------
      */


      login(token, user);


      /*
      -----------------------------------------
      ROLE-BASED REDIRECTION
      -----------------------------------------
      */


      if (user.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/");
      }
    } catch (error) {
      setError(
        error.message || error.response?.data?.message || "Login failed.",
      );
    } finally {
      setLoading(false);
    }
  }


  return (
    <section style={styles.container}>
      <h1>Login</h1>


      <p style={styles.subtitle}>Welcome back to BookMyShow.</p>


      {error && <div style={styles.error}>{error}</div>}


      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={form.email}
          onChange={handleChange}
          disabled={loading}
          required
        />


        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          disabled={loading}
          required
        />


        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>


      <p style={styles.footer}>
        Don't have an account? <Link to="/signup">Signup</Link>
      </p>
    </section>
  );
}


const styles = {
  container: {
    maxWidth: "450px",


    margin: "40px auto",


    background: "#fff",


    padding: "30px",


    borderRadius: "8px",


    border: "1px solid #ddd",
  },


  subtitle: {
    marginTop: "10px",


    color: "#666",
  },


  form: {
    display: "flex",


    flexDirection: "column",


    gap: "15px",


    marginTop: "25px",
  },


  error: {
    marginTop: "20px",


    padding: "12px",


    background: "#ffebee",


    color: "#c62828",


    borderRadius: "4px",
  },


  footer: {
    marginTop: "20px",
  },
};


/*
=========================================================
LOGIN FLOW


User
↓
Enter Credentials
↓
Submit
↓
loginUser()
↓
Backend Validation
↓
JWT Returned
↓
AuthContext.login()
↓
localStorage Updated
↓
Role Check


Admin
↓
/admin/dashboard


User
↓
/


=========================================================


VERIFICATION


✓ Controlled inputs


✓ Uses loginUser()


✓ Uses AuthContext


✓ Prevents duplicate submissions


✓ JWT persisted


✓ User persisted


✓ Role-based redirection


✓ Backend contract verified


✓ Production-oriented MVP


=========================================================
*/
