import React, { useEffect, useState } from "react";
import { fetchItems, addToCart } from "../components/api";

export default function Products() {
  const [items, setItems] = useState([]);
  const [filters, setFilters] = useState({ q: "" });

  const loadItems = async () => {
    try {
      const { data } = await fetchItems(filters);
      setItems(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadItems();
  }, []);

  const handleAddToCart = async (id) => {
    try {
      await addToCart({ itemId: id, qty: 1 });
      alert("Added to cart");
    } catch {
      alert("Login to add items");
    }
  };

  return (
    <div className="p-6">
      <div className="flex gap-2 mb-4">
        <input
          placeholder="Search"
          className="p-2 border"
          value={filters.q}
          onChange={(e) => setFilters({ ...filters, q: e.target.value })}
        />
        <button onClick={loadItems} className="px-4 text-white bg-blue-600">
          Filter
        </button>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {items.map((item) => (
          <div key={item._id} className="p-4 bg-white rounded shadow">
            <h3 className="text-lg font-bold">{item.name}</h3>
            <p>{item.description}</p>
            <p className="font-semibold">${item.price}</p>
            <button
              onClick={() => handleAddToCart(item._id)}
              className="px-4 py-1 mt-2 text-white bg-green-600 rounded"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
