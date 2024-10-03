import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../common/hooks/useAuth';

const ProtectedRoutes = () => {
  const { isAuthenticatedUser } = useAuth();

  if (!isAuthenticatedUser) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default ProtectedRoutes;
