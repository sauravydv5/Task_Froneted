import React, { useState } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Products from "./pages/Product";
import Cart from "./pages/Cart";

export default function App() {
  const [user, setUser] = useState(localStorage.getItem("user"));
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  return (
    <div className="min-h-screen">
      <nav className="flex justify-between p-4 text-white bg-blue-600">
        <Link to="/" className="font-bold">
          MyShop
        </Link>
        <div className="flex gap-4">
          <Link to="/">Products</Link>
          <Link to="/cart">Cart</Link>
          {user ? (
            <button onClick={logout}>Logout</button>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/signup">Signup</Link>
            </>
          )}
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/signup" element={<Signup setUser={setUser} />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </div>
  );
}
