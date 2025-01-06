import { DateContext } from '@/context/DateContextProvider';
import { useContext } from 'react';
import { BsCalendar2DateFill } from 'react-icons/bs';
import { MdOutlineRestaurantMenu } from 'react-icons/md';
import { IoBarChart } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import { BiSolidFoodMenu } from 'react-icons/bi';
import DateRangeComp from './DateRangeComp';

export const SideBar: React.FC<{ isOpen: boolean; toggleSidebar: () => void }> = ({ isOpen, toggleSidebar }) => {
  const { dateRange } = useContext(DateContext);
  const navigate = useNavigate();

  const handleNavigation = (section: string) => {
    navigate(section);
    toggleSidebar(); // Cierra el sidebar al navegar
  };

  return (
    <aside
      className={`z-10 fixed top-0  left-0 h-full  w-56 xl:col-span-1  bg-white shadow-lg transform transition-transform ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      <div className="flex h-full flex-col justify-around mt-12">
        <ul className="text-2xl font-extrabold flex gap-11 flex-col text-customSteelblue">
          {[
            {
              icon: <IoBarChart size={40} color="#094B81" />,
              label: 'VENTAS',
              path: 'ventas',
            },
            {
              icon: <BiSolidFoodMenu size={40} color="#094B81" />,
              label: 'PEDIDOS',
              path: 'pedidos',
            },
            {
              icon: <MdOutlineRestaurantMenu size={40} color="#094B81" />,
              label: 'MENU',
              path: 'menu',
            },
          ].map((item, i) => (
            <div
              key={i}
              onClick={() => handleNavigation(item.path)}
              className="flex items-center justify-start gap-2  cursor-pointer  hover:text-sky-400  hover:bg-slate-600 hover:bg-opacity-20 p-2 py-3 w-full transition duration-200 rounded-r-lg"
            >
              {item.icon}
              <li>{item.label}</li>
            </div>
          ))}
        </ul>
        <div
          className="cursor-pointer rounded-r-2xl hover:text-sky-400  transition duration-200 py-4 hover:bg-slate-600 hover:bg-opacity-10 text-customSteelblue font-extrabold flex items-center justify-center flex-col"
          onClick={toggleSidebar}
        >
          <BsCalendar2DateFill size={40} color="#094B81" />
          <DateRangeComp isOpen={isOpen} setIsOpen={toggleSidebar} />
          <h4 className="text-lg mt-2">{dateRange?.startDate}</h4>
          <span>HASTA</span>
          <h4 className="text-lg mt-2">{dateRange?.endDate}</h4>
        </div>
      </div>
    </aside>
  );
};
