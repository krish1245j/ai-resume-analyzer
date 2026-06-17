import axios from "axios";

const API = axios.create({
    baseURL: "https://ai-resume-analyzer-ha5v.onrender.com",
    withCredentials: true // 🔥 IMPORTANT (cookies)
});

export default API;