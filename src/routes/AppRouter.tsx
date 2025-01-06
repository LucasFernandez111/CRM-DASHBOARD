import { AuthGuard } from '@/guards/AuthGuard';
import { MenuPage } from '@/pages/menu';
import { OrdersPage } from '@/pages/orders';
import PanelPage from '@/pages/panel/PanelPage';
import SalesPage from '@/pages/sales/SalesPage';
import { Navigate, Route, Routes } from 'react-router-dom';
import { RouterLayout } from '../components/RouterLayout';
import { PrivateRoutes, PublicRoutes } from './routes';
import Unautorized from '@/pages/Unauthorized/Unautorized';

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to={PrivateRoutes.SALES} />} />

      <Route path={PublicRoutes.UNAUTHORIZED} element={<Unautorized />} />
      <Route element={<AuthGuard />}>
        <Route element={<RouterLayout />}>
          <Route path={PrivateRoutes.HOME} element={<SalesPage />} />

          {/* //# Seccion donde estaran las estadisticas de ventas */}
          <Route path={PrivateRoutes.SALES} element={<SalesPage />} />
          {/* //# Seccion donde estaran todo los pedidos */}
          <Route path={PrivateRoutes.ORDERS} element={<OrdersPage />} />

          {/* //# Seccion donde estara el menu con productos disponibles */}
          <Route path={PrivateRoutes.MENU} element={<MenuPage />} />
          {/* //# Seccion donde estara el panel profile */}
          <Route path={PrivateRoutes.PANEL} element={<PanelPage />} />
        </Route>
      </Route>
    </Routes>
  );
};
