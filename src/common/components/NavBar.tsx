import { Link } from 'react-router-dom';

import { useAuth } from '../hooks/useAuth';
import { useUserStorage } from '../hooks/useUserStorage';

export default function NavBar() {
  const { user } = useUserStorage();

  return (
    <nav className="flex-1 flex justify-center">
      <ul className="flex space-x-4 lg:text-4xl font-extrabold text-customSteelblue divide-x-4 divide-customSteelblue">
        <li className="px-4 h-20 flex items-center  hover:text-sky-400 hover:transition duration-200 cursor-pointer">
          {user.company || 'COMPANIA'}
        </li>
        <li className="px-4 h-20 flex items-center hover:text-sky-400 hover:transition duration-200 cursor-pointer">
          <Link to="/panel"> PANEL ADMINISTRADOR</Link>
        </li>
        <li className="px-4 h-20 flex items-center  hover:text-sky-400 hover:transition duration-200 cursor-pointer">
          EXPORTAR
        </li>
      </ul>
    </nav>
  );
}
