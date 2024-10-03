import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import DateRangeComp from "./DateRangeComp";
import { DateContext } from "../../context/DateContextProvider";

const SideBar = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  const { dateRange } = useContext(DateContext);
  const handleItemClick = (index: number | null) => {
    setActiveIndex(index);
  };

  const handleNavigation = (section: string) => {
    navigate(`/${section.toLowerCase()}`);
  };

  return (
    <aside className="bg-white lg:col-span-1 flex justify-between flex-col lg:py-4 font-extrabold xl:text-4xl lg:text-2xl md:text-xl">
      <ul className="flex flex-1 justify-center items-center flex-col w-full gap-9 text-customSteelblue">
        {["VENTAS", "PEDIDOS", "MENU"].map((section, index) => (
          <li
            key={index}
            onClick={() => {
              handleItemClick(index);
              handleNavigation(section);
            }}
            className={`hover:bg-slate-400 hover:bg-opacity-15 hover:text-sky-400 ${
              activeIndex === index ? "text-white bg-sky-600" : ""
            } hover:transition duration-200 p-4 w-full rounded-r-xl`}
          >
            {section}
          </li>
        ))}
      </ul>

      <div
        onClick={() => {
          handleItemClick(null);
          setIsOpen(!isOpen);
        }}
        className="flex flex-col justify-center items-center cursor-pointer text-center rounded-3xl hover:bg-slate-400 hover:bg-opacity-15 hover:text-sky-400 hover:transition duration-200 p-6 gap-5"
      >
        <span>FILTRAR POR FECHA</span>
        <span className="text-xl text-wrap">{`${dateRange?.startDate} HASTA  ${dateRange?.endDate}`}</span>
        <DateRangeComp isOpen={isOpen} setIsOpen={setIsOpen} />
      </div>
    </aside>
  );
};

export default SideBar;
