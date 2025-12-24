// src/components/Sidebar.js
import React from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import {
  FaTachometerAlt,
  FaBoxOpen,
  FaWarehouse,
  FaHistory,
  FaChartPie,
  FaSignOutAlt
} from "react-icons/fa";

function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  const menuItems = [
    { name: "Dashboard", icon: <FaTachometerAlt />, path: "/dashboard" },
    { name: "Products", icon: <FaBoxOpen />, path: "/products" },
    { name: "Manage Stock", icon: <FaWarehouse />, path: "/manage-stock" },
    { name: "Product History", icon: <FaHistory />, path: "/product-history" },
    { name: "Report", icon: <FaChartPie />, path: "/report" }
  ];

  const sidebarStyle = {
    width: "220px",
    height: "100vh",
    position: "fixed",
    left: 0,
    top: 0,
    backgroundColor: "#1976D2",
    padding: "20px 0",
    color: "#fff",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  };

  const menuStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "5px",
    width: "100%",
  };

  const btnStyle = {
    display: "flex",
    alignItems: "center",
    padding: "12px 20px",
    width: "100%",
    background: "none",
    border: "none",
    color: "#fff",
    cursor: "pointer",
    fontSize: "16px",
    textAlign: "left",
    borderRadius: "5px",
    transition: "all 0.2s ease"
  };

  const logoutStyle = {
    ...btnStyle,
    backgroundColor: "#f44336",
    margin: "10px 0"
  };

  const handleMouseEnter = (e) => {
    e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.1)";
  };

  const handleMouseLeave = (e) => {
    if (e.currentTarget.id === "logout-btn") {
      e.currentTarget.style.backgroundColor = "#f44336";
    } else {
      e.currentTarget.style.backgroundColor = "transparent";
    }
  };

  return (
    <div style={sidebarStyle}>
      <div style={menuStyle}>
        {menuItems.map((item) => (
          <button
            key={item.name}
            style={btnStyle}
            onClick={() => navigate(item.path)}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <span style={{ marginRight: "12px" }}>{item.icon}</span>
            {item.name}
          </button>
        ))}
      </div>

      <button
        id="logout-btn"
        style={logoutStyle}
        onClick={handleLogout}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <FaSignOutAlt style={{ marginRight: "12px" }} /> Logout
      </button>
    </div>
  );
}

export default Sidebar;

