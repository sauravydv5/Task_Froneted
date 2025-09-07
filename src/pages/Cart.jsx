import React, { useEffect, useState } from "react";
import { getCart, removeFromCart, updateCart } from "../components/api";

export default function Cart() {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const [removingId, setRemovingId] = useState(null);
  const [updatingId, setUpdatingId] = useState(null);

  // Load cart from backend
  const loadCart = async () => {
    setLoading(true);
    try {
      const { data } = await getCart();
      setCart(data.items || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Remove item
  const handleRemove = async (id) => {
    setRemovingId(id);
    try {
      await removeFromCart(id);
      setCart(cart.filter((c) => c.item.id !== id)); // optimistic UI
    } catch (err) {
      console.error(err);
      loadCart();
    } finally {
      setRemovingId(null);
    }
  };

  // Update quantity
  const handleQtyChange = async (id, qty) => {
    if (qty < 1) return;
    setUpdatingId(id);
    try {
      await updateCart({ itemId: id, qty });
      setCart(cart.map((c) => (c.item.id === id ? { ...c, qty } : c)));
    } catch (err) {
      console.error(err);
      loadCart();
    } finally {
      setUpdatingId(null);
    }
  };

  // Calculate total
  const calculateTotal = () => {
    return cart.reduce((acc, c) => acc + c.item.price * c.qty, 0).toFixed(2);
  };

  useEffect(() => {
    loadCart();
  }, []);

  return (
    <div className="max-w-5xl p-6 mx-auto">
      <h2 className="mb-6 text-3xl font-bold text-gray-800">Your Cart</h2>

      {loading ? (
        <p className="text-center text-gray-500">Loading cart...</p>
      ) : cart.length === 0 ? (
        <p className="text-center text-gray-500">Your cart is empty</p>
      ) : (
        <>
          <div className="space-y-4">
            {cart.map((c) => (
              <div
                key={c.item.id}
                className="flex flex-col items-center p-4 transition-shadow bg-white rounded-lg shadow hover:shadow-md sm:flex-row"
              >
                {/* Item Image */}
                <img
                  src={
                    c.item.photo ||
                    c.item.imageUrl ||
                    "https://via.placeholder.com/80"
                  }
                  alt={c.item.title}
                  className="object-cover w-24 h-24 rounded"
                />

                {/* Item Info */}
                <div className="flex-1 mt-2 sm:mt-0 sm:ml-4">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {c.item.title}
                  </h3>
                  <p className="text-gray-600 line-clamp-2">
                    {c.item.description || "No description available"}
                  </p>
                  <p className="mt-1 font-medium text-gray-700">
                    ${c.item.price} x {c.qty} = $
                    {(c.item.price * c.qty).toFixed(2)}
                  </p>

                  {/* Quantity Controls */}
                  <div className="flex items-center mt-2 space-x-2">
                    <button
                      onClick={() => handleQtyChange(c.item.id, c.qty - 1)}
                      disabled={updatingId === c.item.id || c.qty === 1}
                      className="px-2 py-1 text-white bg-gray-500 rounded disabled:cursor-not-allowed disabled:bg-gray-300"
                    >
                      -
                    </button>
                    <span>{c.qty}</span>
                    <button
                      onClick={() => handleQtyChange(c.item.id, c.qty + 1)}
                      disabled={updatingId === c.item.id}
                      className="px-2 py-1 text-white bg-gray-500 rounded disabled:cursor-not-allowed disabled:bg-gray-300"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Remove Button */}
                <button
                  onClick={() => handleRemove(c.item.id)}
                  disabled={removingId === c.item.id}
                  className={`px-4 py-2 mt-2 text-white rounded sm:mt-0 ${
                    removingId === c.item.id
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-red-600 hover:bg-red-700 transition"
                  }`}
                >
                  {removingId === c.item.id ? "Removing..." : "Remove"}
                </button>
              </div>
            ))}
          </div>

          {/* Total & Checkout */}
          <div className="flex flex-col items-end justify-between p-4 mt-6 bg-gray-100 rounded-lg sm:flex-row">
            <span className="text-lg font-semibold">
              Total: ${calculateTotal()}
            </span>
            <button className="px-6 py-2 mt-2 text-white transition-colors bg-green-600 rounded hover:bg-green-700 sm:mt-0">
              Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}
