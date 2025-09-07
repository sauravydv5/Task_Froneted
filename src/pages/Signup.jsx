import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signup } from "../components/api";

export default function Signup({ setUser }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await signup({ name, email, password });
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      setUser(data.user);
      navigate("/");
    } catch {
      alert("Signup failed");
    }
  };

  return (
    <div className="flex justify-center items-center h-[80vh]">
      <form
        className="bg-white shadow p-6 rounded w-96"
        onSubmit={handleSubmit}
      >
        <h2 className="text-xl mb-4">Signup</h2>
        <input
          type="text"
          placeholder="Name"
          className="border p-2 w-full mb-3"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          className="border p-2 w-full mb-3"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="border p-2 w-full mb-3"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="bg-blue-600 text-white px-4 py-2 rounded w-full">
          Signup
        </button>
      </form>
    </div>
  );
}
