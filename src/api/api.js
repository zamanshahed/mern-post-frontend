// src/api/api.js
import axios from "axios";
import {
  getAccessToken,
  setAccessToken,
  clearAccessToken,
} from "../auth/authStorage";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE || "/api",
  withCredentials: true, // send cookies (refresh token) to auth endpoints
});

let isRefreshing = false;
let failedQueue = [];

function processQueue(err, token = null) {
  failedQueue.forEach((p) => (err ? p.reject(err) : p.resolve(token)));
  failedQueue = [];
}

api.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // queue requests while a refresh is in progress
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then((token) => {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return api(originalRequest);
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;
      try {
        // call refresh endpoint (server must check httpOnly refresh cookie)
        const resp = await axios.post(
          "/api/auth/refresh",
          {},
          { withCredentials: true },
        );
        const newAccessToken = resp.data.accessToken;
        setAccessToken(newAccessToken);
        processQueue(null, newAccessToken);
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      } catch (err) {
        processQueue(err, null);
        clearAccessToken();
        // optional: redirect to login or allow loader redirect to catch it
        throw err;
      } finally {
        isRefreshing = false;
      }
    }
    throw error;
  },
);

export default api;
