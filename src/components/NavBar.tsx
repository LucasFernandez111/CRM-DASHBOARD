import { orders } from '@/api';
import { LOGO_WB } from '@/assets';
import { useNotification } from '@/hooks';
import { AppStore } from '@/redux/store';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { FaAlignJustify } from 'react-icons/fa6';

export default function NavBar({ toggleSidebar }: { toggleSidebar: (isOpen: boolean) => void }) {
  const userState = useSelector((state: AppStore) => state.user);
  const { alertError } = useNotification();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleCloseApp = () => window.ipcRenderer.send('close-window');

  const onPrint = () => {
    try {
      orders.getPDFSales();
    } catch (error) {
      alertError('Error al generar el PDF');
    }
  };

  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
    toggleSidebar(!isSidebarOpen);
  };

  return (
    <nav className=" z-50 bg-white col-span-full  h-28 p-4">
      <div className="flex  justify-between items-center h-full">
        <div className="flex justify-center items-center gap-8 ">
          <div
            onClick={handleSidebarToggle}
            className="bg-customSteelblue  rounded-full p-5  cursor-pointer transition duration-300 hover:bg-sky-400"
          >
            <FaAlignJustify size={30} color="white" />
          </div>

          <div className="max-w-20 max-height-20 bg-customSteelblue rounded-2xl">
            <img src={LOGO_WB} alt="Logo Company" className=" object-cover size-20" />
          </div>
        </div>

        <ul className="flex justify-center lg:text-4xl font-extrabold text-customSteelblue divide-x divide-customSteelblue">
          <li className="px-4 h-20 flex items-center hover:text-sky-400 transition duration-200 cursor-pointer uppercase">
            {userState.company ?? 'COMPANIA'}
          </li>
          <li className="px-4 h-20 flex items-center hover:text-sky-400 transition duration-200 cursor-pointer">
            <Link to="/panel">PANEL ADMINISTRADOR</Link>
          </li>
          <li
            className="px-4 h-20 flex items-center hover:text-sky-400 transition duration-200 cursor-pointer"
            onClick={onPrint}
          >
            EXPORTAR
          </li>
        </ul>

        <button
          className="bg-customSteelblue text-white rounded-2xl p-5 text-2xl font-extrabold transition duration-300 hover:bg-sky-400"
          onClick={handleCloseApp}
        >
          SALIR
        </button>
      </div>
    </nav>
  );
}
