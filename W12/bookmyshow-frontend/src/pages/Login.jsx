// src/pages/Login.jsx

/*
=========================================================
SPRINT 1 – LOGIN PAGE

TOPICS COVERED:

✓ Controlled Components
✓ useState
✓ Forms
✓ Event Handling
✓ useNavigate


WHY THIS COMPONENT?


Authentication is a critical part of every application.


Sprint 1:


UI Shell


Sprint 2:


JWT Authentication
↓
Axios
↓
Context API
↓
Session Persistence


=========================================================
*/


import { useState } from "react";


import { Link, useNavigate } from "react-router-dom";


export default function Login() {
  const navigate = useNavigate();


  const [form, setForm] = useState({
    email: "",


    password: "",
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
    Replace with authentication API.
    */

    console.log("Login Form:",form,
    );
    navigate("/");
  }


  return (
    <section style={styles.container}>
      <h1>Login</h1>


      <form onSubmit={handleSubmit} style={styles.form}>
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


        <button type="submit">Login</button>
      </form>


      <p>
        Don't have an account? <Link to="/signup">Signup</Link>
      </p>
    </section>
  );
}


const styles = {
  container: {
    maxWidth: "400px",
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


1. Controlled components manage
   form state.


2. Forms evolve incrementally.


3. Sprint 2 introduces real
   authentication.


=========================================================
*/