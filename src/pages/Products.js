// src/pages/Products.js
import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { db } from "../firebase";
import { collection, getDocs, addDoc } from "firebase/firestore";

function Products() {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");

  const productsCollection = collection(db, "products");

  const fetchProducts = async () => {
    const data = await getDocs(productsCollection);
    setProducts(data.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    if (!name || !quantity || !price) { alert("All fields required"); return; }
    await addDoc(productsCollection, { name, quantity: Number(quantity), price: Number(price) });
    setName(""); setQuantity(""); setPrice("");
    fetchProducts();
  };

  useEffect(() => { fetchProducts(); }, []);

  const inputStyle = { padding: "10px", margin: "5px", width: "150px", borderRadius: "5px", border: "1px solid #ccc" };
  const btnStyle = { padding: "10px 20px", marginLeft: "5px", background: "#1976D2", color: "#fff", border: "none", borderRadius: "5px" };

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div style={{ marginLeft: "220px", padding: "30px", width: "100%" }}>
        <h1 style={{ color: "#1976D2" }}>Products</h1>
        <form onSubmit={handleAddProduct} style={{ marginBottom: "20px" }}>
          <input style={inputStyle} placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
          <input style={inputStyle} type="number" placeholder="Quantity" value={quantity} onChange={e => setQuantity(e.target.value)} />
          <input style={inputStyle} type="number" placeholder="Price" value={price} onChange={e => setPrice(e.target.value)} />
          <button style={btnStyle} type="submit">Add</button>
        </form>

        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#1976D2", color: "#fff" }}>
              <th style={{ padding: "10px", border: "1px solid #ccc" }}>Name</th>
              <th style={{ padding: "10px", border: "1px solid #ccc" }}>Quantity</th>
              <th style={{ padding: "10px", border: "1px solid #ccc" }}>Price</th>
            </tr>
          </thead>
          <tbody>
            {products.map(p => (
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

export default Products;

