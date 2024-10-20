import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DateRangeComp from './DateRangeComp';
import { DateContext } from '@/context/DateContextProvider';
export const SideBar: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  const { dateRange } = useContext(DateContext);

  const handleItemClick = (index: number | null) => {
    setActiveIndex(index);
  };

  const handleNavigation = (section: string) => {
    navigate(section);
  };

  return (
    <aside className="xl:col-span-1 lg:bg-black sm:bg-slate-500 xl:bg-white">
      <div className="flex h-full flex-col justify-around">
        <ul className="text-2xl font-extrabold flex gap-11 p-2 flex-col text-customSteelblue ">
          <li
            className="cursor-pointer  hover:text-sky-400 transition duration-200"
            onClick={() => handleNavigation('ventas')}
          >
            VENTAS
          </li>
          <li
            className="cursor-pointer hover:text-sky-400 transition duration-200"
            onClick={() => handleNavigation('orders')}
          >
            PEDIDOS
          </li>
          <li
            className="cursor-pointer hover:text-sky-400 transition duration-200"
            onClick={() => handleNavigation('menu')}
          >
            MENU
          </li>
        </ul>
        <div
          className="cursor-pointer"
          onClick={() => {
            handleItemClick(null);
            setIsOpen(!isOpen);
          }}
        >
          <h2 className="text-xl text-customSteelblue font-extrabold mb-2">FECHA</h2>
          <DateRangeComp isOpen={isOpen} setIsOpen={setIsOpen} />
          <h4 className="text-sm mt-2">{`${dateRange?.startDate || ''} - ${dateRange?.endDate || ''}`}</h4>
        </div>
      </div>
    </aside>
  );
};
