// src/pages/Signup.jsx
/*
=========================================================
SPRINT 2 – REAL SIGNUP INTEGRATION


TOPICS COVERED:


✓ Controlled Components
✓ useState
✓ Form Submission
✓ API Integration
✓ Loading State
✓ Error Handling
✓ useNavigate


WHY THIS COMPONENT?


Signup is the user's entry point into
the authentication system.


Sprint 1:


UI Shell
↓
console.log()


Sprint 2:


Signup Form
↓
registerUser()
↓
Backend Validation
↓
Success Feedback
↓
Login Page


IMPLEMENTATION NOTES


• Uses registerUser() from authApi.js
• Prevents duplicate submissions
• Preserves backend error messages
• Redirects users to login after success


KEY TAKEAWAYS


Pages manage UI.
API files manage communication.


=========================================================
*/


import { useState } from "react";


import { Link, useNavigate } from "react-router-dom";


import { registerUser } from "../api/authApi";


export default function Signup() {
  const navigate = useNavigate();


  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });


  const [loading, setLoading] = useState(false);


  const [error, setError] = useState("");


  const [success, setSuccess] = useState("");


  function handleChange(event) {
    const { name, value } = event.target;


    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  }


  async function handleSubmit(event) {
    event.preventDefault();


    /*
    -----------------------------------------
    CLIENT VALIDATION
    -----------------------------------------
    */


    setError("");
    setSuccess("");


    if (!form.name.trim() || !form.email.trim() || !form.password.trim()) {
      setError("All fields are required.");


      return;
    }


    /*
    -----------------------------------------
    PREVENT DUPLICATE SUBMITS
    -----------------------------------------
    */


    if (loading) return;


    try {
      setLoading(true);


      const response = await registerUser(form);


      /*
      Expected Backend Response


      {
        success: true,
        message: "User registered successfully"
      }
      */


      setSuccess(response.message || "Registration successful.");


      /*
      -----------------------------------------
      REDIRECT TO LOGIN
      -----------------------------------------
      */


      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (error) {
      setError(error.message || "Registration failed.");
    } finally {
      setLoading(false);
    }
  }


  return (
    <section style={styles.container}>
      <h1>Create Account</h1>


      <p style={styles.subtitle}>Join BookMyShow and start booking tickets.</p>


      {error && <div style={styles.error}>{error}</div>}


      {success && <div style={styles.success}>{success}</div>}


      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          disabled={loading}
          required
        />


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
          {loading ? "Creating Account..." : "Signup"}
        </button>
      </form>


      <p style={styles.footer}>
        Already have an account? <Link to="/login">Login</Link>
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


  success: {
    marginTop: "20px",


    padding: "12px",


    background: "#e8f5e9",


    color: "#2e7d32",


    borderRadius: "4px",
  },


  footer: {
    marginTop: "20px",
  },
};


/*
=========================================================
USER FLOW


Signup Page
↓
Fill Form
↓
Submit
↓
registerUser()
↓
Backend Validation


Success
↓
Show Message
↓
Redirect Login


Failure
↓
Display Backend Error


=========================================================


VERIFICATION


✓ Controlled inputs


✓ Uses registerUser()


✓ Prevents duplicate submissions


✓ Loading state implemented


✓ Backend errors preserved


✓ Success feedback shown


✓ Redirects to login


✓ OTP UI removed


✓ Production-oriented MVP


=========================================================
*/
