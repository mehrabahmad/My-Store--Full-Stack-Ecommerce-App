import { Navigate, Outlet } from "react-router-dom";
import { getUserInfo } from "../../utils/auth";

const AdminRoute = () => {
  const user = getUserInfo();

  if (!user || !user.isAdmin) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default AdminRoute;
