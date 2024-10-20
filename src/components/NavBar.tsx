import { Link } from 'react-router-dom';

export default function NavBar() {
  return (
    <nav className="col-span-full  p-4">
      <div className="flex justify-around">
        <div className="w-20 bg-customSteelblue rounded-xl">
          <img src="https://i.postimg.cc/DwXfrjpH/Mesa-de-trabajo-3.png" alt="logo" className=" object-cover" />
        </div>
        <ul className="flex justify-center lg:text-4xl font-extrabold text-customSteelblue divide-x divide-customSteelblue">
          <li className="px-4 h-20 flex items-center hover:text-sky-400 transition duration-200 cursor-pointer">
            COMPANIA
          </li>
          <li className="px-4 h-20 flex items-center hover:text-sky-400 transition duration-200 cursor-pointer">
            <Link to="/panel">PANEL ADMINISTRADOR</Link>
          </li>
          <li className="px-4 h-20 flex items-center hover:text-sky-400 transition duration-200 cursor-pointer">
            EXPORTAR
          </li>
        </ul>
        <button className="bg-customSteelblue text-white rounded-3xl px-6 py-2 text-2xl font-extrabold transition duration-300 hover:bg-sky-400">
          SALIR
        </button>
      </div>
    </nav>
  );
}
