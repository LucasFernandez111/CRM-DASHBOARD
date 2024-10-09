import { IoMdArrowRoundForward, IoMdArrowRoundBack } from 'react-icons/io';
import { useEffect, useState, useCallback, useMemo, useContext } from 'react';
import { useStatistics } from '../../common/hooks/useStatistic';
import LatestOrderCard from '../../components/ventas/LatestOrderCard';
import ChartCard from '../../components/ventas/ChartCard';
import StatsCard from '../../components/ventas/StatsCar';
import { useOrders } from '../../common/hooks';
import { useFetch } from '../../common/hooks/useFetch';
import { DateContext } from '../../context/DateContextProvider';

const Ventas = () => {
  const [pressNextButton, setPressNextButton] = useState(false);
  const [totalSalesByMonth, setTotalsalesByMonth] = useState<number[]>([]);
  const { dateRange } = useContext(DateContext);

  const { statistics, sales, periodSales } = useStatistics();
  const { data, error } = useFetch(`/orders/range?startDate=${dateRange.startDate}&endDate=${dateRange.endDate}`);

  const handleButtonClick = useCallback(() => setPressNextButton((prev) => !prev), []);

  const memoizedTotalSalesByMonth = useMemo(
    () => Array.from({ length: 12 }, (_, i) => periodSales?.[i]?.total || 0),
    [periodSales],
  );

  useEffect(() => {
    setTotalsalesByMonth(memoizedTotalSalesByMonth);
  }, [memoizedTotalSalesByMonth]);

  const statsCards = pressNextButton ? (
    <>
      <StatsCard value={sales?.current?.year || 0} label="VENTAS ANUALES" />
      <StatsCard value={sales?.current?.week || 0} label="VENTAS SEMANALES" />
      <StatsCard value={sales?.current?.month || 0} label="VENTAS MENSUALES" />
      <StatsCard value={sales?.current?.day || 0} label="VENTAS X DÍA" />
    </>
  ) : (
    <>
      <StatsCard value={statistics?.total || 0} label="TOTAL VENTAS" />
      <StatsCard value={sales?.current?.year || 0} label="PRECIO DEL PEDIDO MÁS VENDIDO" />
      <StatsCard value={sales?.current?.week || 0} label="PEDIDOS POR DÍA MÁS VENDIDO" />
      <StatsCard value={data?.orders?.length || 0} label="PEDIDOS POR DÍA" />
    </>
  );

  return (
    <section className="grid xl:grid-cols-2 p-5 w-full h-full">
      <section className="p-4 flex justify-center items-center relative">
        {pressNextButton ? <ChartCard mountList={totalSalesByMonth} /> : <LatestOrderCard />}
        <button
          className="border absolute bottom-11 border-sky-400 px-12 py-11 rounded-full transition duration-300 hover:scale-105"
          onClick={() => setPressNextButton(false)}
        >
          <IoMdArrowRoundBack color="white" size={40} />
        </button>
      </section>
      <section className="flex justify-center items-center relative">
        <article className="grid xl:grid-cols-2 lg:grid-cols-2 gap-4">{statsCards}</article>
        <button
          className="border absolute bottom-11 border-sky-400 px-12 py-11 rounded-full transition duration-300 hover:scale-105"
          onClick={handleButtonClick}
        >
          <IoMdArrowRoundForward color="white" size={40} />
        </button>
      </section>
    </section>
  );
};

export default Ventas;
