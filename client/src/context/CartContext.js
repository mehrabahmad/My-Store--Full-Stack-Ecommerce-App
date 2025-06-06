import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
// import axios from "axios";
import { getUserToken } from "../utils/auth";
import API from "../api/axios";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCart = useCallback(async () => {
    try {
      setLoading(true);
      // const { data } = await axios.get("/api/cart", {
      const { data } = await API.get("/cart", {
        headers: {
          Authorization: `Bearer ${getUserToken()}`,
        },
      });
      setCartItems(Array.isArray(data?.cartItems) ? data.cartItems : []);
    } catch (error) {
      console.error("Error fetching cart:", error);
      setCartItems([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const addToCart = async (productId, quantity = 1) => {
    try {
      await API.post(
        "/cart",
        { product: productId, quantity },
        {
          headers: { Authorization: `Bearer ${getUserToken()}` },
        }
      );
      fetchCart(); // refresh
    } catch (error) {
      console.error("Add to cart failed:", error);
    }
  };

  const updateCartItem = async (cartItemId, quantity) => {
    await API.put(
      `/cart/${cartItemId}`,
      { quantity },
      {
        headers: { Authorization: `Bearer ${getUserToken()}` },
      }
    );
    fetchCart(); // refresh
  };

  const removeFromCart = async (productId) => {
    try {
      await API.delete(`/cart/${productId}`, {
        headers: { Authorization: `Bearer ${getUserToken()}` },
      });
      fetchCart();
    } catch (error) {
      console.error("Remove from cart failed:", error);
    }
  };

  useEffect(() => {
    const token = getUserToken();
    if (token) fetchCart();
  }, [fetchCart]);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        updateCartItem,
        fetchCart,
        addToCart,
        removeFromCart,
        loading,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
