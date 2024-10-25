import { Route, Routes } from 'react-router-dom';
import { RouterLayout } from '../components/RouterLayout';
import { HomePage } from '../pages/home';
import { LoginPage } from '@/pages/login';

import { OrdersPage } from '@/pages/orders';
import SalesPage from '@/pages/sales/SalesPage';
import { MenuPage } from '@/pages/menu';

export const AppRouter: React.FC<{}> = () => {
  return (
    <Routes>
      {/* <Route path="/" element={<LoginPage />} /> */}

      <Route path="/" element={<RouterLayout />}>
        <Route path="/" element={<HomePage />} />
        //# Seccion donde estaran todo los pedidos
        <Route path="/pedidos" element={<OrdersPage />} />
        //# Seccion donde estaran las estadisticas de ventas
        <Route path="/ventas" element={<SalesPage />} />
        //# Seccion donde estara el menu con productos disponibles
        <Route path="/menu" element={<MenuPage />} />
      </Route>
    </Routes>
  );
};
