import { users } from '@/api';
import { createUser } from '@/redux/states';
import { PrivateRoutes, PublicRoutes } from '@/routes/routes';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export const AuthCallbackGuard = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  useEffect(() => {
    users
      .getUser()
      .then((r) => {
        dispatch(createUser(r.data?.user));
        navigate(PrivateRoutes.SALES);
      })
      .catch(() => navigate(PublicRoutes.UNAUTHORIZED));
  }, []);

  return <></>;
};
