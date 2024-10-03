import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToken } from '../common/hooks/useToken';
import { useAuth } from '../common/hooks/useAuth';

const AuthCallBack = () => {
  const navigate = useNavigate();
  const { token } = useToken();
  const { authenticateUser } = useAuth();

  useEffect(() => {
    if (!token) navigate('/');
    authenticateUser();
    navigate('/ventas');
  }, [token, navigate]);

  return (
    <div className="flex justify-center items-center w-screen h-screen bg-customSteelblue filter brightness-75">
      <h1 className="text-3xl font-bold text-white">Cargando...</h1>
    </div>
  );
};

export default AuthCallBack;
