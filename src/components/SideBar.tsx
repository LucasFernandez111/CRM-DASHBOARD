import { DateContext } from '@/context/DateContextProvider';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DateRangeComp from './DateRangeComp';
export const SideBar: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { dateRange } = useContext(DateContext);

  console.log(dateRange);

  const navigate = useNavigate();

  const handleItemClick = (index: number | null) => setActiveIndex(index);

  const handleNavigation = (section: string) => navigate(section);

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
            onClick={() => handleNavigation('pedidos')}
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
          className="cursor-pointer  text-customSteelblue font-extrabold flex items-center justify-center flex-col "
          onClick={() => {
            handleItemClick(null);
            setIsOpen(!isOpen);
          }}
        >
          <h2 className="text-2xl mb-2">FECHA</h2>
          <DateRangeComp isOpen={isOpen} setIsOpen={setIsOpen} />
          <h4 className="text-lg mt-2">{dateRange?.startDate}</h4>
          <span>HASTA</span>
          <h4 className="text-lg mt-2">{dateRange?.endDate}</h4>
        </div>
      </div>
    </aside>
  );
};
