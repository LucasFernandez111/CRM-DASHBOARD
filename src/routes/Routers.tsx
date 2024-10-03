import { Route, Routes } from "react-router-dom";
import ProtectedRoutes from "./ProtectedRoutes";
import DashBoard from "../pages/DashBoard";
import Login from "../pages/Login";
import AuthCallBack from "../auth/AuthCallBack";

const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />

      <Route path="/auth/callback" element={<AuthCallBack />} />

      <Route element={<ProtectedRoutes />}>
        {/* Rutas protegidas por authenticacion */}
        <Route path="/ventas" element={<DashBoard section="VENTAS" />} />
        <Route path="/pedidos" element={<DashBoard section="PEDIDOS" />} />
        <Route path="/menu" element={<DashBoard section="MENU" />} />
        <Route path="/panel" element={<DashBoard section="PANEL" />} />
      </Route>
    </Routes>
  );
};
export default Routers;
