import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "https://ai-resume-analyzer-ha5v.onrender.com/api",
  withCredentials: true,
});

export default API;