// src/pages/Dashboard.js
import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

function Dashboard() {
  const [lowStockProducts, setLowStockProducts] = useState([]);

  const fetchLowStock = async () => {
    const data = await getDocs(collection(db, "products"));
    const lowStock = data.docs.map(doc => ({ id: doc.id, ...doc.data() }))
      .filter(p => p.quantity <= 5);
    setLowStockProducts(lowStock);
  };

  useEffect(() => { fetchLowStock(); }, []);

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div style={{ marginLeft: "220px", padding: "30px", width: "100%" }}>
        <h1 style={{ color: "#1976D2" }}>Dashboard</h1>
        <p>Overview of low stock products</p>

        {lowStockProducts.length > 0 ? (
          <div style={{ backgroundColor: "#ffebee", padding: "15px", borderRadius: "8px", marginTop: "20px" }}>
            <h3 style={{ color: "#d32f2f" }}>⚠️ Low Stock Alert</h3>
            <ul>
              {lowStockProducts.map(p => (
                <li key={p.id}>{p.name} - Qty: {p.quantity}</li>
              ))}
            </ul>
          </div>
        ) : (
          <p style={{ marginTop: "20px" }}>All products are sufficiently stocked.</p>
        )}
      </div>
    </div>
  );
}

export default Dashboard;

