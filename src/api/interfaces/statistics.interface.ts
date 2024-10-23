export interface Statistics {
  sales: StatisticsSales;
}

export interface StatisticsSales {
  total: number;
  current: StatisticsCurrentSales;
  periodSales: StatisticsPeriodSales;
}

export interface StatisticsCurrentSales {
  day: number;
  week: number;
  month: number;
  year: number;
}

export interface StatisticsPeriodSales {
  salesMonth: StatisticsSalesMonth[];
  salesWeek: string;
  salesDay: string;
  salesYear: string;
}

export interface StatisticsSalesMonth {
  month: number;
  dateMonth: Date;
  total: number;
}
