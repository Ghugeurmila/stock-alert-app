// src/pages/ProductHistory.js
import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

function ProductHistory() {
  const [history, setHistory] = useState([]);

  const fetchHistory = async () => {
    const data = await getDocs(collection(db, "products"));
    setHistory(data.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  };

  useEffect(()=>{ fetchHistory(); }, []);

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div style={{ marginLeft: "220px", padding: "30px", width: "100%" }}>
        <h1 style={{ color: "#1976D2" }}>Product History</h1>
        <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "20px" }}>
          <thead>
            <tr style={{ backgroundColor: "#1976D2", color: "#fff" }}>
              <th style={{ padding: "10px", border: "1px solid #ccc" }}>Name</th>
              <th style={{ padding: "10px", border: "1px solid #ccc" }}>Quantity</th>
              <th style={{ padding: "10px", border: "1px solid #ccc" }}>Price</th>
            </tr>
          </thead>
          <tbody>
            {history.map(p => (
              <tr key={p.id}>
                <td style={{ padding: "10px", border: "1px solid #ccc" }}>{p.name}</td>
                <td style={{ padding: "10px", border: "1px solid #ccc" }}>{p.quantity}</td>
                <td style={{ padding: "10px", border: "1px solid #ccc" }}>₹{p.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ProductHistory;

