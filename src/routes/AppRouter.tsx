import { Navigate, Route, Routes } from 'react-router-dom';
import { RouterLayout } from '../components/RouterLayout';
import { HomePage } from '../pages/home';
import { LoginPage } from '@/pages/login';

import { OrdersPage } from '@/pages/orders';
import SalesPage from '@/pages/sales/SalesPage';
import { MenuPage } from '@/pages/menu';
import PanelPage from '@/pages/panel/PanelPage';
import { PrivateRoutes, PublicRoutes } from './routes';
import { AuthGuard } from '@/guards/AuthGuard';
import { AuthCallbackGuard } from '@/guards/AuthCallbackGuard/AuthCallbackGuard';

export const AppRouter: React.FC<{}> = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to={PrivateRoutes.SALES} />} />

      <Route path={PublicRoutes.AUTH_GOOGLE} element={<AuthCallbackGuard />} />
      <Route element={<AuthGuard />}>
        <Route path="/" element={<RouterLayout />}>
          <Route path="/" element={<HomePage />} />
          //# Seccion donde estaran todo los pedidos
          <Route path={PrivateRoutes.ORDERS} element={<OrdersPage />} />
          //# Seccion donde estaran las estadisticas de ventas
          <Route path={PrivateRoutes.SALES} element={<SalesPage />} />
          //# Seccion donde estara el menu con productos disponibles
          <Route path={PrivateRoutes.MENU} element={<MenuPage />} />
          //# Seccion donde estara el panel profile
          <Route path={PrivateRoutes.PANEL} element={<PanelPage />} />
        </Route>
      </Route>
    </Routes>
  );
};
