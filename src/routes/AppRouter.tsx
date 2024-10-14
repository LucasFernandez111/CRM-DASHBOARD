import { Route, Routes } from 'react-router-dom';
import { RouterLayout } from '../common/RouterLayout';
import { HomePage } from '../pages/home';
import { LoginPage } from '../pages';
import { Orders } from '../sections/pedidos/Orders';

export const AppRouter: React.FC<{}> = () => {
  return (
    <Routes>
      {/* <Route path="/" element={<LoginPage />} /> */}

      <Route path="/" element={<RouterLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/orders" element={<Orders />} />
      </Route>
    </Routes>
  );
};
