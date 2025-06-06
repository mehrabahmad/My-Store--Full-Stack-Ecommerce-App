import { useCart } from "../context/CartContext";
import React, { useState } from "react";
// import axios from "axios";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

export default function CartPage() {
  const { cartItems, fetchCart, updateCartItem, removeFromCart, loading } =
    useCart();

  const [address, setAddress] = useState("");
  const navigate = useNavigate();

  const handleQuantityChange = (cartItemId, quantity) => {
    console.log(cartItemId);
    console.log(quantity);
    if (quantity < 1) return;
    updateCartItem(cartItemId, quantity);
  };

  const placeOrder = async () => {
    if (!address.trim()) {
      alert("Please enter a shipping address.");
      return;
    }
    try {
      const totalPrice = cartItems.reduce(
        (acc, item) => acc + item.product.price * item.quantity,
        0
      );

      const orderItems = cartItems.map((item) => ({
        _id: item.product._id,
        title: item.product.title,
        price: item.product.price,
        image: item.product.image,
        quantity: item.quantity,
        // product: item.product._id,
        // quantity: item.quantity,
      }));

      const { data } = await API.post(
        "/orders",
        { orderItems, totalPrice, address },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(data);
      navigate("/order-success", { state: data });

      // alert("Order placed successfully!");
      fetchCart();
      // setAddress("");
    } catch (error) {
      console.error("Order failed:", error);
      alert("Failed to place order.");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
      </div>
    );
  }

  const totalPrice = cartItems.reduce((acc, item) => {
    return acc + item.product.price * item.quantity;
  }, 0);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6">Your Cart</h2>
      {cartItems.length === 0 ? (
        <p className="text-gray-600">Your cart is empty.</p>
      ) : (
        <>
          {cartItems.map((item) => (
            <div key={item._id} className="border p-4 mb-4 rounded shadow">
              <div className="flex gap-4 items-center">
                <img
                  src={item.product.image}
                  alt={item.product.title}
                  className="w-24 h-24 object-cover rounded"
                />
                <div className="flex-1">
                  <h3 className="text-lg font-semibold">
                    {item.product.title}
                  </h3>
                  <p className="text-gray-600 mb-2">${item.product.price}</p>
                  <div className="flex items-center gap-2">
                    <label>Quantity:</label>
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) =>
                        handleQuantityChange(item._id, parseInt(e.target.value))
                      }
                      className="border rounded px-2 py-1 w-20"
                    />
                  </div>
                </div>
                <button
                  onClick={() => removeFromCart(item.product._id)}
                  className="text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          <div className="text-right text-lg font-semibold border-t pt-4">
            Total Price: ₹{totalPrice.toFixed(2)}
          </div>

          <div className="border-t pt-4 mt-6">
            <label className="block mb-2 font-medium">Delivery Address:</label>
            <textarea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full border rounded p-2 mb-4"
              rows="3"
              placeholder="Enter delivery address..."
            />

            <button
              onClick={placeOrder}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded transition"
            >
              Place Order
            </button>
          </div>
        </>
      )}
    </div>
  );
}

// import { useEffect } from "react";
// import { useCart } from "../context/CartContext";

// const CartPage = () => {
//   const { cartItems, fetchCart, updateCartItem, removeFromCart } = useCart();

//   useEffect(() => {
//     fetchCart();
//   }, [fetchCart]);

//   if (!cartItems || cartItems.length === 0) {
//     return (
//       <p className="text-center text-gray-500 mt-10">Your cart is empty.</p>
//     );
//   }

//   return (
//     <div className="max-w-4xl mx-auto p-4">
//       <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
//       {cartItems.map((item) => (
//         <div key={item._id} className="flex items-center gap-4 border-b py-4">
//           <img
//             src={item.product.image}
//             alt={item.product.title}
//             className="w-20 h-20 object-cover rounded"
//           />
//           <div className="flex-1">
//             <h3 className="text-lg font-semibold">{item.product.title}</h3>
//             <p className="text-gray-600">${item.product.price}</p>
//             <div className="flex items-center mt-2">
//               <label className="mr-2">Qty:</label>
//               <input
//                 type="number"
//                 min="1"
//                 value={item.quantity}
//                 onChange={(e) => updateCartItem(item._id, e.target.value)}
//                 className="w-16 px-2 py-1 border rounded"
//               />
//             </div>
//           </div>
//           <button
//             onClick={() => removeFromCart(item._id)}
//             className="text-red-500 hover:text-red-700"
//           >
//             Remove
//           </button>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default CartPage;

// import { useEffect, useState } from "react";
// import { placeOrder } from "../api/order";
// import { useNavigate } from "react-router-dom";

// function CartPage() {
//   const [cartItems, setCartItems] = useState([]);
//   const [address, setAddress] = useState("");
//   const navigate = useNavigate();

//   useEffect(() => {
//     const stored = localStorage.getItem("cart");
//     setCartItems(stored ? JSON.parse(stored) : []);
//   }, []);

//   const totalPrice = cartItems.reduce(
//     (acc, item) => acc + item.quantity * item.price,
//     0
//   );

//   const clearCart = () => {
//     localStorage.removeItem("cart");
//     setCartItems([]);
//   };

//   const handlePlaceOrder = async () => {
//     if (!address.trim()) return alert("Please enter your address.");

//     const orderData = {
//       orderItems: cartItems.map((item) => ({
//         _id: item._id,
//         title: item.title,
//         price: item.price,
//         quantity: item.quantity,
//         image: item.image,
//       })),
//       totalPrice,
//       address,
//     };

//     try {
//       const { data } = await placeOrder(orderData);
//       console.log("test 1");
//       clearCart();
//       navigate("/order-success", { state: { order: data } });
//     } catch (err) {
//       alert("Failed to place order");
//       console.error(err);
//     }
//   };

//   return (
//     <div style={styles.container}>
//       <h2 style={styles.heading}>🛒 Your Cart</h2>

//       {cartItems.length === 0 ? (
//         <p style={styles.emptyMessage}>Your cart is empty.</p>
//       ) : (
//         <>
//           <ul style={styles.list}>
//             {cartItems.map((item) => (
//               <li key={item._id} style={styles.listItem}>
//                 <img src={item.image} alt={item.title} style={styles.image} />
//                 <div style={styles.details}>
//                   <h3 style={styles.title}>{item.title}</h3>
//                   <p style={styles.category}>{item.category}</p>
//                   <p style={styles.price}>
//                     ₹{item.price.toFixed(2)} × {item.quantity} = ₹
//                     {(item.price * item.quantity).toFixed(2)}
//                   </p>
//                 </div>
//               </li>
//             ))}
//           </ul>

//           <div style={styles.total}>
//             <strong>Total: ₹{totalPrice.toFixed(2)}</strong>
//           </div>

//           <textarea
//             placeholder="Enter shipping address"
//             value={address}
//             onChange={(e) => setAddress(e.target.value)}
//             rows={3}
//             style={styles.textarea}
//           />

//           <button onClick={handlePlaceOrder} style={styles.button}>
//             📦 Place Order
//           </button>
//         </>
//       )}
//     </div>
//   );
// }

// const styles = {
//   container: {
//     maxWidth: 800,
//     margin: "40px auto",
//     padding: 20,
//     fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
//     backgroundColor: "#f8f9fa",
//     borderRadius: 8,
//     boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
//   },
//   heading: {
//     textAlign: "center",
//     marginBottom: 30,
//     color: "#333",
//   },
//   emptyMessage: {
//     textAlign: "center",
//     fontSize: 18,
//     color: "#666",
//   },
//   list: {
//     listStyle: "none",
//     padding: 0,
//     marginBottom: 20,
//   },
//   listItem: {
//     display: "flex",
//     alignItems: "center",
//     marginBottom: 20,
//     backgroundColor: "#fff",
//     borderRadius: 6,
//     padding: 15,
//     boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
//   },
//   image: {
//     width: 100,
//     height: 100,
//     objectFit: "cover",
//     borderRadius: 6,
//     marginRight: 20,
//     boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
//   },
//   details: {
//     flex: 1,
//   },
//   title: {
//     margin: "0 0 6px 0",
//     fontSize: 20,
//     color: "#222",
//   },
//   category: {
//     margin: "0 0 10px 0",
//     color: "#777",
//     fontStyle: "italic",
//   },
//   price: {
//     fontWeight: "bold",
//     fontSize: 16,
//     color: "#111",
//   },
//   total: {
//     textAlign: "right",
//     fontSize: 22,
//     marginBottom: 20,
//     color: "#000",
//   },
//   textarea: {
//     width: "100%",
//     padding: 12,
//     fontSize: 16,
//     borderRadius: 6,
//     border: "1px solid #ccc",
//     resize: "vertical",
//     marginBottom: 20,
//     boxSizing: "border-box",
//   },
//   button: {
//     backgroundColor: "#007bff",
//     border: "none",
//     color: "white",
//     padding: "12px 25px",
//     fontSize: 18,
//     borderRadius: 6,
//     cursor: "pointer",
//     transition: "background-color 0.3s ease",
//   },
// };

// export default CartPage;

// // // src/pages/CartPage.js
// // import { useEffect, useState } from "react";
// // import { placeOrder } from "../api/order";
// // import { useNavigate } from "react-router-dom";

// // function CartPage() {
// //   const [cartItems, setCartItems] = useState([]);
// //   const [address, setAddress] = useState("");
// //   const navigate = useNavigate();

// //   // Load cart from localStorage on page load
// //   useEffect(() => {
// //     const stored = localStorage.getItem("cart");
// //     setCartItems(stored ? JSON.parse(stored) : []);
// //   }, []);
// //   console.log("aa");
// //   console.log(cartItems);

// //   // Calculate total price
// //   const totalPrice = cartItems.reduce(
// //     (acc, item) => acc + item.quantity * item.price,
// //     0
// //   );

// //   // Clear cart
// //   const clearCart = () => {
// //     localStorage.removeItem("cart");
// //     setCartItems([]);
// //   };

// //   // Handle placing an order
// //   const handlePlaceOrder = async () => {
// //     if (!address.trim()) return alert("Please enter your address.");

// //     const orderData = {
// //       orderItems: cartItems,
// //       totalPrice,
// //       address,
// //     };

// //     try {
// //       await placeOrder(orderData);
// //       clearCart();
// //       navigate("/orders");
// //     } catch (err) {
// //       alert("Failed to place order");
// //       console.error(err);
// //     }
// //   };

// //   return (
// //     <div style={{ padding: "20px" }}>
// //       <h2>🛒 Your Cart</h2>

// //       {cartItems.length === 0 ? (
// //         <p>Your cart is empty.</p>
// //       ) : (
// //         <div>
// //           <ul>
// //             {cartItems.map((item) => (
// //               <li key={item._id} style={{ marginBottom: "10px" }}>
// //                 <strong>{item.title}</strong> — ₹{item.price} × {item.quantity}
// //               </li>
// //             ))}
// //           </ul>

// //           <p>
// //             <strong>Total:</strong> ₹{totalPrice}
// //           </p>

// //           <textarea
// //             placeholder="Enter shipping address"
// //             value={address}
// //             onChange={(e) => setAddress(e.target.value)}
// //             rows={3}
// //             style={{ width: "300px", display: "block", margin: "10px 0" }}
// //           />

// //           <button onClick={handlePlaceOrder}>📦 Place Order</button>
// //         </div>
// //       )}
// //     </div>
// //   );
// // }

// // export default CartPage;
