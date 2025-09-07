import React, { useEffect, useState } from "react";
import { fetchItems, addToCart } from "../components/api";
import { FaSearch } from "react-icons/fa";

export default function Products() {
  const [items, setItems] = useState([]);
  const [filters, setFilters] = useState({ search: "" });
  const [loading, setLoading] = useState(false);
  const [cartLoading, setCartLoading] = useState(null);

  // Load items from backend
  const loadItems = async () => {
    setLoading(true);
    try {
      const { data } = await fetchItems(filters);
      setItems(data.items); // backend se items array
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadItems();
  }, []);

  // Add item to cart
  const handleAddToCart = async (id) => {
    setCartLoading(id);
    try {
      await addToCart({ itemId: id, qty: 1 });
      alert("Item added to cart");
    } catch (err) {
      console.error(err);
      alert("Login to add items");
    } finally {
      setCartLoading(null);
    }
  };

  return (
    <div className="p-6 mx-auto max-w-7xl">
      {/* Search */}
      <div className="flex gap-2 mb-6">
        <div className="relative flex-1">
          <FaSearch className="absolute text-gray-400 transform -translate-y-1/2 top-1/2 left-3" />
          <input
            placeholder="Search items..."
            className="w-full py-2 pl-10 pr-4 transition border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={filters.search}
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
            onKeyDown={(e) => e.key === "Enter" && loadItems()}
          />
        </div>
        <button
          onClick={loadItems}
          className="flex items-center gap-2 px-5 py-2 text-white transition transform bg-blue-600 rounded-lg hover:bg-blue-700 hover:scale-105"
        >
          <FaSearch />
          Search
        </button>
      </div>

      {/* Loading / Empty */}
      {loading ? (
        <p className="text-center text-gray-500">Loading items...</p>
      ) : items.length === 0 ? (
        <p className="text-center text-gray-500">No items found</p>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {items.map((item) => (
            <div
              key={item._id}
              className="relative p-4 transition-all duration-200 transform bg-white rounded-lg shadow hover:shadow-lg hover:-translate-y-1"
            >
              {/* Category badge */}
              {item.category && (
                <span className="absolute px-2 py-1 text-xs font-semibold text-white bg-blue-600 rounded top-2 left-2">
                  {item.category}
                </span>
              )}

              {/* Item Image */}
              {item.photo ? (
                <img
                  src={item.photo}
                  alt={item.title}
                  className="object-cover w-full h-40 mb-3 rounded-lg"
                />
              ) : (
                <div className="flex items-center justify-center w-full h-40 mb-3 text-gray-400 bg-gray-100 rounded-lg">
                  No Image
                </div>
              )}

              {/* Item Details */}
              <h3 className="mb-1 text-lg font-bold">{item.title}</h3>
              <p className="mb-2 text-sm text-gray-600 line-clamp-2">
                {item.description || "No description available"}
              </p>
              <p className="mb-3 font-semibold text-gray-800">${item.price}</p>

              {/* Add to Cart */}
              <button
                onClick={() => handleAddToCart(item._id)}
                disabled={cartLoading === item._id}
                className={`w-full py-2 text-white rounded-lg transition transform ${
                  cartLoading === item._id
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-green-600 hover:bg-green-700 hover:scale-105"
                }`}
              >
                {cartLoading === item._id ? "Adding..." : "Add to Cart"}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
