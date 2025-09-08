import axios from "axios";

// const API = axios.create({ baseURL: "http://localhost:4001" });
const API = axios.create({ baseURL: "https://task1-1-fc4k.onrender.com" });

// Attach JWT token automatically
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

// Auth
export const signup = (data) => API.post("/auth/signup", data);
export const login = (data) => API.post("/auth/login", data);

// Items
export const fetchItems = (params) => API.get("/items/list", { params });

// Cart
export const addToCart = (data) => API.post("/cart/add", data);
export const removeFromCart = (itemId) => API.delete(`/cart/remove/${itemId}`);
export const updateCart = (data) => API.patch("/cart/update", data);
export const clearCart = () => API.delete("/cart/clear");
export const getCart = () => API.get("/cart");
export const addItem = (data) => API.post("/items", data);

export default API;
