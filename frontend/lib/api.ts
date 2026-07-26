import axios from "axios";

const api = axios.create({
  baseURL: "https://medintel-phhj.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;