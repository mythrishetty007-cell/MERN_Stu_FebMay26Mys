// src/pages/Signup.jsx


/*
=========================================================
SPRINT 1 – SIGNUP PAGE


TOPICS COVERED:


✓ Controlled Components
✓ useState
✓ Form Handling
✓ Event Handling
✓ Link Navigation


WHY THIS COMPONENT?


Signup is the starting point of the
authentication journey.


Sprint 1:


UI Shell
↓
Basic Form Handling


Sprint 2:


Register API
↓
OTP Verification
↓
Role Assignment
↓
Session Management


=========================================================
*/


import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";


export default function Signup() {
  const navigate = useNavigate();


  const [form, setForm] = useState({
    name: "",

    email: "",

    password: "",

    confirmPassword: "",
  });

  function handleChange(event) {
    const {
      name,

      value,
    } = event.target;


    setForm((previous) => ({
      ...previous,


      [name]: value,
    }));
  }


  function handleSubmit(event) {
    event.preventDefault();


    /*
    Sprint 2:
    Replace with registration API.
    */


    console.log(
      "Signup Form:",

     form,
    );


    navigate("/login");
  }


  return (
    <section style={styles.container}>
      <h1>Create Account</h1>


      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          required
        />


        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />


        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />


        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={form.confirmPassword}
          onChange={handleChange}
          required
        />


        <button type="submit">Signup</button>
      </form>


      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </section>
  );
}


const styles = {
  container: {
    maxWidth: "450px",
    margin: "40px auto",
  },

  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    marginTop: "20px",
  },
};


/*
=========================================================
KEY TAKEAWAYS


1. Controlled components simplify
   form handling.


2. Signup and Login share
   similar patterns.


3. Sprint 2 introduces OTP-based
   registration.

=========================================================
*/