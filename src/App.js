import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import ManageStock from "./pages/ManageStock";
import ProductHistory from "./pages/ProductHistory";
import Report from "./pages/Report";

import ProtectedRoute from "./routes/ProtectedRoute";
import Sidebar from "./components/Sidebar";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected routes with sidebar */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <div style={{ display: "flex" }}>
                <Sidebar />
                <div style={{ flex: 1, padding: "20px" }}>
                  <Dashboard />
                </div>
              </div>
            </ProtectedRoute>
          }
        />
        <Route
          path="/products"
          element={
            <ProtectedRoute>
              <div style={{ display: "flex" }}>
                <Sidebar />
                <div style={{ flex: 1, padding: "20px" }}>
                  <Products />
                </div>
              </div>
            </ProtectedRoute>
          }
        />
        <Route
          path="/manage-stock"
          element={
            <ProtectedRoute>
              <div style={{ display: "flex" }}>
                <Sidebar />
                <div style={{ flex: 1, padding: "20px" }}>
                  <ManageStock />
                </div>
              </div>
            </ProtectedRoute>
          }
        />
        <Route
          path="/product-history"
          element={
            <ProtectedRoute>
              <div style={{ display: "flex" }}>
                <Sidebar />
                <div style={{ flex: 1, padding: "20px" }}>
                  <ProductHistory />
                </div>
              </div>
            </ProtectedRoute>
          }
        />
        <Route
          path="/report"
          element={
            <ProtectedRoute>
              <div style={{ display: "flex" }}>
                <Sidebar />
                <div style={{ flex: 1, padding: "20px" }}>
                  <Report />
                </div>
              </div>
            </ProtectedRoute>
          }
        />

        {/* Default route */}
        <Route path="*" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;

