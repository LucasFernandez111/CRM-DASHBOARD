import { orders } from '@/api';
import { Statistics, StatisticsCurrentSales } from '@/api/interfaces/statistics.interface';
import { useEffect, useState } from 'react';

export const useStatistics = () => {
  const [statisticsGeneral, setStatistics] = useState<Statistics | null>(null);

  const [statisticsCurrentSales, setStatisticsCurrentSales] = useState<StatisticsCurrentSales>({
    day: 0,
    week: 0,
    month: 0,
    year: 0,
  });
  const [statisticsTotalSales, setTotalSales] = useState<number>(0);
  const [error, setError] = useState<Boolean>(false);
  useEffect(() => {
    orders
      .getOrdersStatisticsSales()
      .then((r) => {
        setStatistics(r.data);
        setStatisticsCurrentSales(r.data.sales.current);
        setTotalSales(r.data.sales.total);
      })
      .catch(() => setError(!error));
  }, []);
  return { statisticsGeneral, statisticsCurrentSales, statisticsTotalSales, error };
};
