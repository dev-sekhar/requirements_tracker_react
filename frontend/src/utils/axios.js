import axios from "axios";
import { getTenantFromSubdomain } from "./tenant";
import logger from "./logger";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add request interceptor for tenant header
api.interceptors.request.use((config) => {
  const tenant = localStorage.getItem("tenant");
  if (tenant) {
    config.headers["X-Tenant-ID"] = tenant;
  }
  return config;
});

export default api;
