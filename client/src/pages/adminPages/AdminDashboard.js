import { Link } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <Link
          to="/admin/users"
          className="bg-white shadow-md rounded-xl p-6 text-center border hover:bg-blue-50 transition"
        >
          <h2 className="text-xl font-semibold mb-2">Manage Users</h2>
          <p className="text-gray-600">View and control registered users</p>
        </Link>

        <Link
          to="/admin/products"
          className="bg-white shadow-md rounded-xl p-6 text-center border hover:bg-green-50 transition"
        >
          <h2 className="text-xl font-semibold mb-2">Manage Products</h2>
          <p className="text-gray-600">Add, edit, or delete products</p>
        </Link>

        <Link
          to="/admin/orders"
          className="bg-white shadow-md rounded-xl p-6 text-center border hover:bg-yellow-50 transition"
        >
          <h2 className="text-xl font-semibold mb-2">Manage Orders</h2>
          <p className="text-gray-600">Track and update order statuses</p>
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboard;
