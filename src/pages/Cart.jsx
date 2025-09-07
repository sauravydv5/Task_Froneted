import React, { useEffect, useState } from "react";
import { getCart, removeFromCart } from "../components/api";

export default function Cart() {
  const [cart, setCart] = useState([]);

  const loadCart = async () => {
    try {
      const { data } = await getCart();
      setCart(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleRemove = async (id) => {
    try {
      await removeFromCart({ itemId: id });
      loadCart();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadCart();
  }, []);

  return (
    <div className="p-6">
      <h2 className="mb-4 text-xl">Your Cart</h2>
      {cart.length === 0 ? (
        <p>No items in cart</p>
      ) : (
        <div className="space-y-4">
          {cart.map((c) => (
            <div
              key={c.item._id}
              className="flex justify-between p-4 bg-white rounded shadow"
            >
              <span>
                {c.item.name} - ${c.item.price} x {c.qty}
              </span>
              <button
                onClick={() => handleRemove(c.item._id)}
                className="px-3 py-1 text-white bg-red-600 rounded"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
