import { AxiosResponse } from 'axios';
import { instance } from './base.api';
import { ENDPOINTS } from './endpoints';
import { StatisticsSales } from './interfaces/statistics.interface';
import { StatisticsTopOrder } from './interfaces/top-order.interface';

type ReponseBodyStatisticsSales = {
  sales: StatisticsSales;
};
type ReponseBodyStatisticsTopOrder = {
  topOrder: StatisticsTopOrder;
};
const getStatisticsTopOrder = (): Promise<AxiosResponse<ReponseBodyStatisticsTopOrder>> =>
  instance.get(ENDPOINTS.STATISTICS_TOP_ORDERS);
const getOrdersStatisticsSales = (): Promise<AxiosResponse<ReponseBodyStatisticsSales>> =>
  instance.get(ENDPOINTS.STATISTICS_SALES);

export const statistics = {
  getStatisticsTopOrder,
  getOrdersStatisticsSales,
};
