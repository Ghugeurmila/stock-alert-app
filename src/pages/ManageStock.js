// src/pages/ManageStock.js
import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { db } from "../firebase";
import { collection, doc, getDocs, updateDoc } from "firebase/firestore";

function ManageStock() {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    const data = await getDocs(collection(db, "products"));
    setProducts(data.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  };

  const updateQty = async (id, qty) => {
    if (qty < 0) qty = 0; // prevent negative
    const productDoc = doc(db, "products", id);
    await updateDoc(productDoc, { quantity: qty });
    fetchProducts();
  };

  useEffect(() => { fetchProducts(); }, []);

  const inputStyle = { width: "60px", padding: "5px", margin: "0 5px", textAlign: "center", borderRadius: "5px", border: "1px solid #ccc" };
  const btnStyle = { padding: "5px 10px", margin: "0 5px", borderRadius: "5px", border: "none", cursor: "pointer" };

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div style={{ marginLeft: "220px", padding: "30px", width: "100%" }}>
        <h1 style={{ color: "#1976D2" }}>Manage Stock</h1>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ backgroundColor: "#1976D2", color: "#fff" }}>
              <th style={{ padding: "10px", border: "1px solid #ccc" }}>Name</th>
              <th style={{ padding: "10px", border: "1px solid #ccc" }}>Quantity</th>
              <th style={{ padding: "10px", border: "1px solid #ccc" }}>Update</th>
            </tr>
          </thead>
          <tbody>
            {products.map(p => (
              <tr key={p.id}>
                <td style={{ padding: "10px", border: "1px solid #ccc" }}>{p.name}</td>
                <td style={{ padding: "10px", border: "1px solid #ccc" }}>{p.quantity}</td>
                <td style={{ padding: "10px", border: "1px solid #ccc" }}>
                  <button style={{...btnStyle, backgroundColor: "#4CAF50", color: "#fff"}} onClick={()=>updateQty(p.id, p.quantity+1)}>+</button>
                  <button style={{...btnStyle, backgroundColor: "#f44336", color: "#fff"}} onClick={()=>updateQty(p.id, p.quantity-1)}>−</button>
                  <input style={inputStyle} type="number" value={p.quantity} onChange={(e)=>updateQty(p.id, Number(e.target.value))} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ManageStock;

