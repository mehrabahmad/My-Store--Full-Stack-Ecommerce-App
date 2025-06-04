import { useLocation } from "react-router-dom";

const OrderPlaced = () => {
  const { state: order } = useLocation();

  if (!order) return <div className="p-4">No order data found.</div>;

  return (
    <div className="max-w-3xl mx-auto mt-10 p-4 shadow rounded bg-white">
      <h2 className="text-2xl font-semibold text-green-600 mb-4">
        🎉 Order Placed Successfully!
      </h2>

      <p className="mb-4">
        Order ID: <strong>{order._id}</strong>
      </p>
      <p className="mb-4">Delivery Address: {order.address}</p>
      <p className="mb-6">Total Price: ₹{order.totalPrice.toFixed(2)}</p>

      <div className="space-y-4">
        {order.orderItems.map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-between border p-3 rounded"
          >
            <div className="flex items-center gap-4">
              <img
                src={item.image}
                alt={item.title}
                className="w-16 h-16 object-cover rounded"
              />
              <div>
                <p className="font-semibold">{item.title}</p>
                <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
              </div>
            </div>
            <div className="text-right">
              ₹{(item.price * item.quantity).toFixed(2)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderPlaced;

// import React from "react";
// import { useLocation, Link } from "react-router-dom";

// const OrderSuccess = () => {
//   const { state } = useLocation();

//   const order = state?.orderItems;

//   if (!order) {
//     return (
//       <div className="text-center mt-10 text-red-600 font-semibold">
//         No order information found.
//       </div>
//     );
//   }
//   return (
//     <div className="flex flex-col items-center min-h-screen bg-green-50 p-6">
//       <div className="bg-white shadow-xl rounded-2xl p-6 max-w-2xl w-full">
//         <h2 className="text-3xl font-bold text-green-600 mb-4 text-center">
//           🎉 Order Confirmed!
//         </h2>

//         <p className="text-gray-700 mb-2">
//           <strong>Order ID:</strong> {order._id}
//         </p>
//         <p className="text-gray-700 mb-4">
//           <strong>Shipping Address:</strong> {order.address}
//         </p>

//         <div className="mb-4">
//           <h3 className="text-xl font-semibold mb-4">Items:</h3>
//           {order.orderItems.map((item, index) => (
//             <div
//               key={index}
//               className="flex items-center justify-between bg-gray-50 rounded-xl p-3 mb-3 shadow-sm"
//             >
//               <div className="flex items-center gap-4">
//                 <img
//                   src={item.image}
//                   alt={item.title}
//                   className="w-16 h-16 object-cover rounded-lg"
//                 />
//                 <div>
//                   <h4 className="font-medium">{item.title}</h4>
//                   <p className="text-sm text-gray-600">
//                     Quantity: {item.quantity}
//                   </p>
//                 </div>
//               </div>
//               <div className="text-right font-semibold">
//                 ${(item.price * item.quantity).toFixed(2)}
//               </div>
//             </div>
//           ))}
//         </div>

//         <div className="text-lg font-semibold text-right text-gray-800">
//           Total: ${order.totalPrice.toFixed(2)}
//         </div>

//         <div className="text-center mt-6">
//           <Link
//             to="/"
//             className="inline-block bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-xl"
//           >
//             Continue Shopping
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default OrderSuccess;
