import { StatisticsSales, StatisticsSalesMonth } from '@/api/interfaces/statistics.interface';
import { StatisticsTopOrder } from '@/api/interfaces/top-order.interface';
import { statistics } from '@/api/statistics';
import { useEffect, useState } from 'react';
import { useNotification } from '../notification/useNotification';

export const useStatistics = () => {
  const { alertWarning } = useNotification();
  const [statisticsGeneral, setStatisticsGeneral] = useState<StatisticsSales>({
    total: 0,
    current: {
      day: 0,
      week: 0,
      month: 0,
      year: 0,
    },
  });

  const [statisticsMonths, setStatisticsMonths] = useState<StatisticsSalesMonth[]>([
    {
      month: 0,
      dateMonth: new Date(),
      total: 0,
    },
  ]);

  const [statisticsTopOrder, setStatisticsTopOrder] = useState<StatisticsTopOrder>({
    today: {
      totalAmount: 0,
      count: 0,
      category: '',
      subcategory: '',
    },
    period: {
      totalAmount: 0,
      count: 0,
      category: '',
      subcategory: '',
    },
  });

  useEffect(() => {
    statistics
      .getOrdersStatisticsSales()
      .then(({ data }) => {
        setStatisticsGeneral(data.sales);
      })
      .catch(() => {
        alertWarning('Todavia no hay ordenes cargadas');
      });

    statistics
      .getStatisticsTopOrder()
      .then((res) => {
        setStatisticsTopOrder(res.data.topOrder);
      })
      .catch(() => alertWarning('Todavia no hay ordenes cargadas'));
    statistics
      .getStatisticsMonths()
      .then((res) => {
        setStatisticsMonths(res.data);
      })
      .catch(() => alertWarning('Error al cargar las estadisticas de los meses'));
  }, []);
  return {
    statisticsTopOrder,
    statisticsGeneral,
    statisticsMonths,
  };
};
