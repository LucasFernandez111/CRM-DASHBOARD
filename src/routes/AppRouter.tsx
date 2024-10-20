import { Route, Routes } from 'react-router-dom';
import { RouterLayout } from '../components/RouterLayout';
import { HomePage } from '../pages/home';
import { LoginPage } from '@/pages/login';

import { OrdersPage } from '@/pages/Orders';

export const AppRouter: React.FC<{}> = () => {
  return (
    <Routes>
      {/* <Route path="/" element={<LoginPage />} /> */}

      <Route path="/" element={<RouterLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/orders" element={<OrdersPage />} />
      </Route>
    </Routes>
  );
};
