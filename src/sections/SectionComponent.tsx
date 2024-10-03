import { lazy } from 'react';
import PanelAdmin from './panel/PanelAdmin';

export type Sections = 'VENTAS' | 'PEDIDOS' | 'MENU' | 'EXPORT' | 'PANEL';

const VentasComponent = lazy(() => import('./ventas/Ventas'));
// const PedidosComponent = lazy(() => import("./pedidos/Pedidos"));
const MenuComponent = lazy(() => import('./menu/Menu'));

const SectionComponent = ({ section }: { section: Sections }) => {
  switch (section) {
    case 'VENTAS':
      return <VentasComponent />;
    case 'PEDIDOS':
    // return <PedidosComponent />;
    case 'MENU':
      return <MenuComponent />;
    case 'PANEL':
      return <PanelAdmin />;
    default:
      return <div>Sección no encontrada</div>;
  }
};

export default SectionComponent;
