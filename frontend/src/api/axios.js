import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:3000/api",
    withCredentials: true // 🔥 IMPORTANT (cookies)
});

export default API;