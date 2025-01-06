import { instance, users } from '@/api';

import { PRIVATE_KEY, CLIENT_EMAIL } from '@/config';
import { createUser } from '@/redux/states';
import { createBot } from '@/redux/states/bot.state';
import { PublicRoutes } from '@/routes/routes';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const AuthGuard = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const authenticateUser = async () => {
      try {
        const response = await instance.post('auth/signin', {
          private_key: PRIVATE_KEY,
          client_email: CLIENT_EMAIL,
        });

        localStorage.setItem('token', response.data);
        const userResponse = await users.getUser();
        dispatch(createUser(userResponse.data));

        const botReponse = await instance.get('/bot');
        dispatch(createBot(botReponse.data));
      } catch (error) {
        console.error('Authentication error:', error);
      }
    };

    console.log('Guard cargado');

    authenticateUser();
  }, []);

  const token = localStorage.getItem('token');

  return token ? <Outlet /> : <Navigate replace to={PublicRoutes.UNAUTHORIZED} />;
};

export default AuthGuard;
