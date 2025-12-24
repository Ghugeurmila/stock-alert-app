// src/pages/Signup.js
import React, { useState } from "react";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/dashboard");
    } catch (error) {
      alert(error.message);
    }
  };

  const inputStyle = {
    padding: "10px",
    margin: "10px 0",
    borderRadius: "5px",
    border: "1px solid #ccc",
    width: "100%",
    boxSizing: "border-box"
  };

  const btnStyle = {
    padding: "10px 20px",
    marginTop: "10px",
    backgroundColor: "#1976D2",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    width: "100%"
  };

  return (
    <div style={{
      maxWidth: "400px",
      margin: "80px auto",
      padding: "30px",
      boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
      borderRadius: "10px",
      backgroundColor: "#f9f9f9",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      textAlign: "center"
    }}>
      <h1 style={{ color: "#1976D2", marginBottom: "20px" }}>Sign Up</h1>
      <form onSubmit={handleSignup}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={inputStyle}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={inputStyle}
          required
        />
        <button type="submit" style={btnStyle}>Sign Up</button>
      </form>
      <p style={{ marginTop: "20px" }}>
        Already have an account?{" "}
        <span
          onClick={() => navigate("/login")}
          style={{ color: "#1976D2", cursor: "pointer" }}
        >
          Login
        </span>
      </p>
    </div>
  );
}

export default Signup;

