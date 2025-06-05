import { jwtDecode } from "jwt-decode";

export const getUser = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    return jwtDecode(token);
  } catch (e) {
    return null;
  }
};

export const getUserInfo = () => {
  const token = getUserToken();
  if (!token) return null;

  try {
    return jwtDecode(token); // returns user object: { _id, name, isAdmin, ... }
  } catch (error) {
    console.error("Invalid token:", error);
    return null;
  }
};

export const getUserToken = () => {
  try {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    return userInfo?.token;
  } catch (err) {
    return null;
  }
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("userInfo");
  // localStorage.removeItem("user");
};
