import { AppStore } from '@/redux/store';
import { PublicRoutes } from '@/routes/routes';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const AuthGuard = () => {
  const userState = useSelector((state: AppStore) => state.user);

  return userState._id ? <Outlet /> : <Navigate replace to={PublicRoutes.LOGIN} />;
};

export default AuthGuard;
