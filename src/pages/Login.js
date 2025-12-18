// src/pages/Login.js
import React, { useState } from "react";
import { auth } from "../firebase";
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Handle login
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Login Successful!");
      navigate("/dashboard");
    } catch (error) {
      if (error.code === "auth/wrong-password") {
        alert("Wrong password. Please try again.");
      } else if (error.code === "auth/user-not-found") {
        alert("User not found. Please sign up.");
      } else {
        alert(error.message);
      }
    }
  };

  // Handle forgot password
  const handleForgotPassword = async () => {
    if (!email) {
      alert("Please enter your email first");
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
      alert("Password reset email sent. Check your inbox.");
    } catch (error) {
      alert(error.message);
    }
  };

  // Styles
  const inputStyle = {
    padding: "10px",
    margin: "10px 0",
    borderRadius: "5px",
    border: "1px solid #ccc",
    width: "calc(100% - 22px)"
  };

  const loginBtnStyle = {
    padding: "10px 20px",
    marginTop: "10px",
    backgroundColor: "#4CAF50",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    width: "100%"
  };

  const linkStyle = {
    color: "#2196F3",
    cursor: "pointer"
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
      <h1 style={{ color: "#333", marginBottom: "20px" }}>Login</h1>

      <form onSubmit={handleLogin}>
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
        <button type="submit" style={loginBtnStyle}>Login</button>
      </form>

      <p style={{ marginTop: "15px" }}>
        <span onClick={handleForgotPassword} style={linkStyle}>
          Forgot Password?
        </span>
      </p>

      <p style={{ marginTop: "20px" }}>
        Don't have an account?{" "}
        <span
          onClick={() => navigate("/signup")}
          style={linkStyle}
        >
          Sign Up
        </span>
      </p>
    </div>
  );
}

export default Login;

