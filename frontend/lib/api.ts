import axios from "axios";

const api = axios.create({
  baseURL: "https://YOUR-RENDER-BACKEND.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;