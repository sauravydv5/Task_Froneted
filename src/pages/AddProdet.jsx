import React, { useState } from "react";
import { addItem } from "../components/api";
import { useNavigate } from "react-router-dom";

export default function AddProduct() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    price: "",
    category: "",
    description: "",
    photo: "",
    isActive: "true", // ✅ string rakha so select control works
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      await addItem({
        ...form,
        price: Number(form.price),
        isActive: form.isActive === "true", // ✅ string → boolean
      });
      setMessage("✅ Product added successfully!");
      navigate("/"); // direct redirect after success
    } catch (err) {
      console.error("❌ Error:", err.response?.data || err.message);
      setMessage("❌ Failed to add product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl p-6 mx-auto bg-white rounded-lg shadow">
      <h2 className="mb-6 text-2xl font-bold text-gray-800">Add New Product</h2>

      {message && <p className="mb-4 text-center">{message}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Product Title"
          value={form.title}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />

        <input
          type="text"
          name="category"
          placeholder="Category"
          value={form.category}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />

        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />

        <input
          type="url"
          name="photo"
          placeholder="Image URL"
          value={form.photo}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />

        <select
          name="isActive"
          value={form.isActive}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        >
          <option value="true">Active</option>
          <option value="false">Inactive</option>
        </select>

        <button
          type="submit"
          disabled={loading}
          className="w-full px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Adding..." : "Add Product"}
        </button>
      </form>
    </div>
  );
}
