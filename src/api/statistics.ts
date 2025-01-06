import { AxiosResponse } from 'axios';
import { instance } from './base.api';
import { ENDPOINTS } from './endpoints';
import { StatisticsSales, StatisticsSalesMonth } from './interfaces/statistics.interface';
import { StatisticsTopOrder } from './interfaces/top-order.interface';

type ReponseBodyStatisticsSales = {
  sales: StatisticsSales;
};
type ReponseBodyStatisticsTopOrder = {
  topOrder: StatisticsTopOrder;
};

interface ResponseBodyStatisticsMonths extends Array<StatisticsSalesMonth> {}
const getStatisticsTopOrder = (): Promise<AxiosResponse<ReponseBodyStatisticsTopOrder>> =>
  instance.get(ENDPOINTS.STATISTICS_TOP_ORDERS);
const getOrdersStatisticsSales = (): Promise<AxiosResponse<ReponseBodyStatisticsSales>> =>
  instance.get(ENDPOINTS.STATISTICS_SALES);

const getStatisticsMonths = (): Promise<AxiosResponse<ResponseBodyStatisticsMonths>> =>
  instance.get(ENDPOINTS.STATISTICS_SALES + '/months');

export const statistics = {
  getStatisticsTopOrder,
  getOrdersStatisticsSales,
  getStatisticsMonths,
};
