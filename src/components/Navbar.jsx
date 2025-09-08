import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";

export default function Navbar({ user, setUser, cartCount }) {
  const navigate = useNavigate();
  const [animateCart, setAnimateCart] = useState(false);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  // Trigger cart animation when cartCount changes
  useEffect(() => {
    if (cartCount > 0) {
      setAnimateCart(true);
      const timer = setTimeout(() => setAnimateCart(false), 300); // 0.3s animation
      return () => clearTimeout(timer);
    }
  }, [cartCount]);

  return (
    <nav className="bg-white shadow-md">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            to="/"
            className="text-2xl font-bold text-blue-600 transition-transform hover:scale-105 hover:text-blue-800"
          >
            MyShop
          </Link>

          {/* Links & Buttons */}
          <div className="flex items-center gap-6">
            <Link
              to="/"
              className="font-medium text-gray-700 transition hover:text-blue-600 hover:scale-105"
            >
              Products
            </Link>
            <Link
              to="/add-product"
              className="font-medium text-gray-700 transition hover:text-blue-600 hover:scale-105"
            >
              Add Product
            </Link>

            <Link
              to="/cart"
              className="relative flex items-center gap-1 font-medium text-gray-700 transition hover:text-blue-600"
            >
              <FaShoppingCart
                className={`transition-transform ${
                  animateCart ? "animate-bounce text-green-500" : ""
                }`}
              />
              Cart
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-2 -translate-y-2 bg-red-600 rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>

            {user ? (
              <button
                onClick={logout}
                className="px-4 py-2 text-white transition transform bg-red-600 rounded shadow hover:scale-105 hover:bg-red-700"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                className="px-4 py-2 text-white transition transform bg-blue-600 rounded shadow hover:scale-105 hover:bg-blue-700"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
