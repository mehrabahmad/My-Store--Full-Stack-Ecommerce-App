// /api/order.js
import axios from "axios";

const API = axios.create({
  baseURL: "/api",
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export const getUserOrders = () => API.get("/orders/my");

// export const placeOrder = async (orderData) => {
//   const res = await API.post("/orders", orderData);
//   return res.data;
// };
// const user = JSON.parse(localStorage.getItem("userInfo"));
// const user = localStorage.getItem("userInfo");

// const user = storedUser && storedUser !== "undefined" ? JSON.parse(storedUser) : null;
export const placeOrder = async (orderData) => {
  const storedUser = localStorage.getItem("userInfo");
  const user = JSON.parse(storedUser);

  const token = user?.token;

  return await axios.post("/api/orders", orderData, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};
