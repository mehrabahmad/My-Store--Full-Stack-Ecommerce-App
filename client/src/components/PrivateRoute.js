import { Navigate } from 'react-router-dom';
import { getUser } from '../utils/auth';

const PrivateRoute = ({ children }) => {
  const user = getUser();

  return user ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
