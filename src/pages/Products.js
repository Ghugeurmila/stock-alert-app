// src/pages/Products.js
import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

function Products() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [products, setProducts] = useState([]);

  const productsCollection = collection(db, "products");

  // Add new product
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
    fetchProducts(); // refresh list
  };

  // Fetch products
  const fetchProducts = async () => {
    const data = await getDocs(productsCollection);
    setProducts(data.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
  };

  // Edit product
  const handleEditProduct = async (product) => {
    const newName = prompt("Enter new name:", product.name);
    const newQty = prompt("Enter new quantity:", product.quantity);
    const newPrice = prompt("Enter new price:", product.price);

    if (newName && newQty && newPrice) {
      const productDoc = doc(db, "products", product.id);
      await updateDoc(productDoc, {
        name: newName,
        quantity: Number(newQty),
        price: Number(newPrice),
      });
      fetchProducts(); // refresh list
    }
  };

  // Delete product
  const handleDeleteProduct = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      const productDoc = doc(db, "products", id);
      await deleteDoc(productDoc);
      fetchProducts(); // refresh list
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);
const inputStyle = {
  padding: "10px",
  margin: "5px",
  borderRadius: "5px",
  border: "1px solid #ccc",
  width: "calc(100% - 22px)"
};

const addBtnStyle = {
  padding: "10px 20px",
  marginTop: "10px",
  backgroundColor: "#4CAF50",
  color: "#fff",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer"
};

const editBtnStyle = {
  padding: "5px 10px",
  marginRight: "5px",
  backgroundColor: "#2196F3",
  color: "#fff",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer"
};

const deleteBtnStyle = {
  padding: "5px 10px",
  backgroundColor: "#f44336",
  color: "#fff",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer"
};

const backBtnStyle = {
  marginTop: "20px",
  padding: "10px 20px",
  backgroundColor: "#555",
  color: "#fff",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer"
};

  return (
  <div style={{
    maxWidth: "600px",
    margin: "50px auto",
    padding: "20px",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
    borderRadius: "10px",
    textAlign: "center",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    backgroundColor: "#f9f9f9"
  }}>
    <h1 style={{ color: "#333", marginBottom: "20px" }}>Products</h1>

    <form onSubmit={handleAddProduct} style={{ marginBottom: "30px" }}>
      <input
        type="text"
        placeholder="Product Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={inputStyle}
      />
      <input
        type="number"
        placeholder="Quantity"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        style={inputStyle}
      />
      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        style={inputStyle}
      />
      <button type="submit" style={addBtnStyle}>Add Product</button>
    </form>

    <h2 style={{ color: "#555" }}>Products List</h2>
    <ul style={{ listStyle: "none", padding: 0 }}>
      {products.map((p) => (
        <li key={p.id} style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "#fff",
          padding: "10px",
          margin: "10px 0",
          borderRadius: "5px",
          boxShadow: "0 2px 5px rgba(0,0,0,0.1)"
        }}>
          <span>{p.name} - Qty: {p.quantity} - Price: ₹{p.price}</span>
          <div>
            <button onClick={() => handleEditProduct(p)} style={editBtnStyle}>Edit</button>
            <button onClick={() => handleDeleteProduct(p.id)} style={deleteBtnStyle}>Delete</button>
          </div>
        </li>
      ))}
    </ul>

    <button
      onClick={() => navigate("/dashboard")}
      style={backBtnStyle}
    >
      Back to Dashboard
    </button>
  </div>
);

}

export default Products;

