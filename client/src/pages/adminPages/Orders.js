import { useEffect, useState } from "react";
import axios from "axios";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.get("/api/admin/orders", {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(data);
      setOrders(data);
    } catch (error) {
      console.error("Failed to fetch orders:", error);
    }
  };

  const updateStatus = async (orderId, newStatus) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `/api/admin/orders/${orderId}`,
        { status: newStatus },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      fetchOrders(); // refresh
    } catch (error) {
      console.error("Failed to update status:", error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">All Orders</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">Order ID</th>
              <th className="p-2 border">User</th>
              <th className="p-2 border">Address</th>
              <th className="p-2 border">Items</th>
              <th className="p-2 border">Total</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders
              .slice()
              .reverse()
              .map((order) => (
                <tr key={order._id} className="border-t hover:bg-gray-50">
                  <td className="p-2 border">{order._id}</td>
                  <td className="p-2 border">{order.user?.name}</td>
                  <td className="p-2 border">{order.address}</td>
                  <td className="p-2 border">
                    {order.orderItems.map((item, index) => (
                      <div key={`${item._id}-${index}`}>
                        {item.title} x {item.quantity}
                      </div>
                    ))}
                  </td>
                  <td className="p-2 border">${order.totalPrice.toFixed(2)}</td>
                  <td className="p-2 border">{order.status}</td>
                  <td className="p-2 border">
                    <select
                      className="border p-1 rounded"
                      value={order.status}
                      onChange={(e) => updateStatus(order._id, e.target.value)}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                    </select>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;
