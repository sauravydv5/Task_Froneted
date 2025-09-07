import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../components/api";

export default function Login({ setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await login({ email, password });
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      setUser(data.user);
      navigate("/");
    } catch {
      alert("Login failed");
    }
  };

  return (
    <div className="flex justify-center items-center h-[80vh]">
      <form
        className="p-6 bg-white rounded shadow w-96"
        onSubmit={handleSubmit}
      >
        <h2 className="mb-4 text-xl">Login</h2>
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 mb-3 border"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 mb-3 border"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="w-full px-4 py-2 text-white bg-blue-600 rounded">
          Login
        </button>
      </form>
    </div>
  );
}
