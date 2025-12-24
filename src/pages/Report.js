// src/pages/Report.js
import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

function Report() {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    const data = await getDocs(collection(db, "products"));
    setProducts(data.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  };

  useEffect(()=>{ fetchProducts(); }, []);

  const totalStock = products.reduce((sum,p)=>sum+p.quantity,0);
  const totalValue = products.reduce((sum,p)=>sum+(p.quantity*p.price),0);

  const cardStyle = { background: "#e3f2fd", padding: "20px", margin: "10px 0", borderRadius: "8px", boxShadow: "0 2px 5px rgba(0,0,0,0.1)" };

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div style={{ marginLeft: "220px", padding: "30px", width: "100%" }}>
        <h1 style={{ color: "#1976D2" }}>Report</h1>

        <div style={cardStyle}>
          <h3>Total Products</h3>
          <p>{products.length}</p>
        </div>

        <div style={cardStyle}>
          <h3>Total Stock Quantity</h3>
          <p>{totalStock}</p>
        </div>

        <div style={cardStyle}>
          <h3>Total Stock Value</h3>
          <p>₹{totalValue}</p>
        </div>
      </div>
    </div>
  );
}

export default Report;

