// src/routes/ProtectedRoute.js
import React from "react";
import { Navigate } from "react-router-dom";
import { auth } from "../firebase";

function ProtectedRoute({ children }) {
  const user = auth.currentUser; // check if logged in

  if (!user) {
    return <Navigate to="/login" />; // redirect if not logged in
  }

  return children;
}

export default ProtectedRoute;

