import LatestOrderCard from '../../components/ventas/LatestOrderCard';
import { IoMdArrowRoundForward, IoMdArrowRoundBack } from 'react-icons/io';
import { useState } from 'react';
import ChartCard from '../../components/ventas/ChartCard';
import { useApi } from '../../common/hooks/useApi';
import { StatisticsByMonth } from '../../common/interfaces/api/response.interface';
import StatsCard from '../../components/ventas/StatsCar';

const Ventas = () => {
  const [pressNextButton, setPressNextButton] = useState(false);
  const { statistics } = useApi();

  const mountList = statistics?.totalSalesByMonth?.map((month: StatisticsByMonth) => month?.totalSalesForMonth);
  console.log(statistics);

  const handleButtonClick = () => setPressNextButton(!pressNextButton);

  const renderStatsCards = (stats: any) => {
    const cards = pressNextButton
      ? [
          { value: stats?.descriptionTop, label: 'PEDIDO MAS COMPRADO' },
          {
            value: `$${stats?.priceTop || 0}`,
            label: 'PRECIO DEL PEDIDO MAS VENDIDO',
          },
          { value: '15', label: 'PEDIDOS POR DIA MAS VENDIDO' },
          {
            value: `$${stats?.totalSalesByWeek || 0}`,
            label: 'VENTAS SEMANALES',
          },
        ]
      : [
          { value: `$${stats?.totalSales || 0}`, label: 'VENTAS TOTALES' },
          {
            value: `$${stats?.statisticsByDay.totalSalesByDay || 0}`,
            label: 'VENTAS X DIA',
          },
          {
            value: `${stats?.statisticsByDay.totalOrdersByDay || 0}`,
            label: 'PEDIDOS POR DIA',
          },
          {
            value: `$${stats?.totalSalesByWeek || 0}`,
            label: 'VENTAS SEMANALES',
          },
        ];

    return (
      <div className="grid xl:grid-cols-2 lg:grid-cols-2 gap-4">
        {cards.map((card, index) => (
          <StatsCard key={index} value={card.value} label={card.label} />
        ))}
      </div>
    );
  };

  return (
    <section className="grid xl:grid-cols-2 p-5 w-full h-full">
      <section className="p-4 flex justify-center items-center relative">
        {pressNextButton ? <ChartCard mountList={mountList} /> : <LatestOrderCard />}
        <button
          className="border absolute bottom-11 border-sky-400 px-12 py-11 rounded-full transition duration-300 hover:scale-105"
          onClick={() => setPressNextButton(false)}
        >
          <IoMdArrowRoundBack color="white" size={40} cursor="pointer" />
        </button>
      </section>
      <section className="flex justify-center items-center relative">
        {renderStatsCards(statistics)}
        <button
          className="border absolute bottom-11 border-sky-400 px-12 py-11 rounded-full transition duration-300 hover:scale-105"
          onClick={handleButtonClick}
        >
          <IoMdArrowRoundForward color="white" size={40} cursor="pointer" />
        </button>
      </section>
    </section>
  );
};

export default Ventas;
