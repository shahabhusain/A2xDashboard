import axios from "axios";
import { getToken } from "./auth";

export const axiosPublic = axios.create({
  baseURL: import.meta.env.VITE_LIVE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});
console.log("live url", import.meta.env.VITE_LIVE_URL)

axiosPublic.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
