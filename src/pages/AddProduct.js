// src/pages/AddProduct.js
import React, { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

function AddProduct() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");

  const productsCollection = collection(db, "products");

  const handleAddProduct = async (e) => {
    e.preventDefault();
    if (!name || !quantity || !price) {
      alert("All fields are required");
      return;
    }

    await addDoc(productsCollection, {
      name,
      quantity: Number(quantity),
      price: Number(price),
    });

    setName("");
    setQuantity("");
    setPrice("");
    alert("Product added successfully!");
  };

  return (
    <div style={container}>
      <h1 style={{ textAlign: "center", marginBottom: 20 }}>Add Product</h1>

      <form onSubmit={handleAddProduct} style={form}>
        <input
          type="text"
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={input}
        />
        <input
          type="number"
          placeholder="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          style={input}
        />
        <input
          type="number"
          placeholder="Price (₹)"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          style={input}
        />
        <button type="submit" style={btn}>Add Product</button>
      </form>

      <button style={backBtn} onClick={() => navigate("/dashboard")}>
        Back to Dashboard
      </button>
    </div>
  );
}

// Styles
const container = {
  maxWidth: 500,
  margin: "50px auto",
  padding: 30,
  boxShadow: "0 4px 15px rgba(0,0,0,0.15)",
  borderRadius: 12,
  backgroundColor: "#f9f9f9",
  fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
};

const form = { display: "flex", flexDirection: "column", gap: 15, marginBottom: 20 };
const input = { padding: 12, borderRadius: 8, border: "1px solid #ccc", fontSize: 16 };
const btn = { padding: 12, backgroundColor: "#4CAF50", color: "#fff", border: "none", borderRadius: 8, cursor: "pointer", fontSize: 16 };
const backBtn = { padding: "12px 25px", backgroundColor: "#f44336", color: "#fff", border: "none", borderRadius: 8, cursor: "pointer", fontSize: 16 };

export default AddProduct;

