import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";

function Dashboard() {
  const navigate = useNavigate();
  const [lowStockProducts, setLowStockProducts] = useState([]);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  // Fetch low stock products
  const fetchLowStock = async () => {
  const productsCollection = collection(db, "products");
  const data = await getDocs(productsCollection);

  const lowStock = data.docs
    .map((doc) => ({ id: doc.id, ...doc.data() }))
    .filter((p) => p.quantity <= 5);

  console.log("All products:", data.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  console.log("Low stock products:", lowStock);

  setLowStockProducts(lowStock);
};


  useEffect(() => {
    fetchLowStock();
  }, []);
const navBtnStyle = {
  padding: "10px 20px",
  margin: "10px",
  backgroundColor: "#2196F3",
  color: "#fff",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer"
};

const logoutBtnStyle = {
  padding: "10px 20px",
  marginTop: "20px",
  backgroundColor: "#f44336",
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
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    borderRadius: "10px",
    textAlign: "center",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    backgroundColor: "#f9f9f9"
  }}>
    <h1 style={{ color: "#333", marginBottom: "10px" }}>Stock Alert App</h1>
    <p style={{ color: "#555", marginBottom: "30px" }}>Dashboard Overview</p>

    {lowStockProducts.length > 0 && (
      <div style={{
        backgroundColor: "#ffcccc",
        color: "#b71c1c",
        padding: "15px",
        borderRadius: "8px",
        marginBottom: "30px"
      }}>
        <h3>⚠️ Low Stock Alert!</h3>
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {lowStockProducts.map((p) => (
            <li key={p.id} style={{ margin: "5px 0" }}>
              {p.name} - Qty: {p.quantity}
            </li>
          ))}
        </ul>
      </div>
    )}

    <button
      onClick={() => navigate("/products")}
      style={navBtnStyle}
    >
      Go to Products
    </button>

    <br />

    <button
      onClick={handleLogout}
      style={logoutBtnStyle}
    >
      Logout
    </button>
  </div>
);

}

export default Dashboard;

