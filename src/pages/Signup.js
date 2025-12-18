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
      alert("Signup Successful!");
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
  width: "calc(100% - 22px)"
};

const signupBtnStyle = {
  padding: "10px 20px",
  marginTop: "10px",
  backgroundColor: "#4CAF50",
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
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    borderRadius: "10px",
    textAlign: "center",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    backgroundColor: "#f9f9f9"
  }}>
    <h1 style={{ color: "#333", marginBottom: "20px" }}>Sign Up</h1>

    <form onSubmit={handleSignup}>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={inputStyle}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={inputStyle}
      />
      <button type="submit" style={signupBtnStyle}>Sign Up</button>
    </form>

    <p style={{ marginTop: "20px" }}>
      Already have an account?{" "}
      <span
        onClick={() => navigate("/login")}
        style={{ color: "#2196F3", cursor: "pointer" }}
      >
        Login
      </span>
    </p>
  </div>
);

}

export default Signup;
