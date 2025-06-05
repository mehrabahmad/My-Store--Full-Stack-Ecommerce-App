import axios from "axios";
import { getUserToken } from "../utils/auth";

const headers = () => ({
  headers: { Authorization: `Bearer ${getUserToken()}` },
});

export const fetchDashboardStats = () =>
  axios.get("/api/admin/stats", headers());

export const fetchRecentOrders = () =>
  axios.get("/api/admin/recent-orders", headers());
