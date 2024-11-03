import { useEffect, useState } from 'react';
import { CardWithStatistics } from './components/CardWithStatistics';
import { ChartSales } from './components/ChartSales';
import { ChartSalesData } from './types';
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa6';
import { useStatistics } from '@/hooks/statistics';

const SalesPage = () => {
  const [nextStatistics, setNextStatistics] = useState<Boolean>(false);
  const { statisticsTopOrder, statisticsGeneral } = useStatistics();

  const [chartData, setChartData] = useState<ChartSalesData[]>([
    { month: 'ENERO', sales: 0 },
    { month: 'FEBRERO', sales: 0 },
    { month: 'MARZO', sales: 0 },
    { month: 'ABRIL', sales: 0 },
    { month: 'MAYO', sales: 0 },
    { month: 'JUNIO', sales: 0 },
    { month: 'JULIO', sales: 0 },
    { month: 'AGOSTO', sales: 0 },
    { month: 'SEPTIEMBRE', sales: 0 },
    { month: 'OCTUBRE', sales: 0 },
    { month: 'NOVIEMBRE', sales: 0 },
    { month: 'DICIEMBRE', sales: 0 },
  ]);

  useEffect(() => {
    if (statisticsGeneral) {
      const updatedChartData = chartData.map((data, i) => ({
        ...data,
        sales: statisticsGeneral.periodSales.salesMonth[i]?.total || 0,
      }));

      setChartData(updatedChartData);
    }
  }, [statisticsGeneral]);
  return (
    <main className=" col-span-11 grid grid-cols-2 grid-rows-5  h-full max-h-screen overflow-auto bg-customSteelblue">
      {/* CHART*/}
      <section className="row-span-4 p-24 mt-11 ">
        <ChartSales chartData={chartData} />
      </section>

      {/* CARDS */}
      <section className="row-span-4 grid grid-cols-2 justify-center items-center gap-2 p-32">
        {nextStatistics ? (
          <>
            <CardWithStatistics description="VENTAS X DÍA" title={`$${statisticsGeneral.current.day}`} />
            <CardWithStatistics description="VENTAS SEMANALES" title={`$${statisticsGeneral.current.week}`} />
            <CardWithStatistics description="VENTAS X MES" title={`$${statisticsGeneral.current.month}`} />
            <CardWithStatistics description="VENTAS X AÑO" title={`$${statisticsGeneral.current.year}`} />
          </>
        ) : (
          <>
            <CardWithStatistics description="VENTAS TOTAL" title={`$${statisticsGeneral.total}`} />
            <CardWithStatistics description="PEDIDOS DIARIOS PRODUCTO TOP" title={statisticsTopOrder.period.count} />
            <CardWithStatistics
              description="PEDIDO MAS COMPRADO"
              title={statisticsTopOrder.period.category + ' - ' + statisticsTopOrder.period.subcategory}
            />
            <CardWithStatistics
              description="PRECIO PEDIDO MAS VENDIDO "
              title={statisticsTopOrder.period.totalAmount}
            />
          </>
        )}
      </section>

      {/* BUTTONS */}
      <section className="flex justify-around items-center  col-span-2 row-span-1 ">
        <FaArrowLeft
          size={50}
          className="text-white  transform hover:scale-50 duration-300"
          onClick={() => setNextStatistics(!nextStatistics)}
        />
        <FaArrowRight
          size={50}
          className="text-white transform hover:scale-50 duration-300"
          onClick={() => setNextStatistics(!nextStatistics)}
        />
      </section>
    </main>
  );
};

export default SalesPage;
