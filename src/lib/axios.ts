// src/lib/axios.ts
import axios from "axios";

const axiosClient = axios.create({
  baseURL:  "https://reservemyturf-server.onrender.com",
  withCredentials: true,
});

export default axiosClient;
