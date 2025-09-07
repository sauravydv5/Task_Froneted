import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:4001" });

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

export const signup = (data) => API.post("/auth/signup", data);
export const login = (data) => API.post("/auth/login", data);
export const fetchItems = (params) => API.get("/items", { params });
export const addToCart = (data) => API.post("/cart/add", data);
export const removeFromCart = (data) => API.post("/cart/remove", data);
export const getCart = () => API.get("/cart");
