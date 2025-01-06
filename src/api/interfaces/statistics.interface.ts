export interface StatisticsSales {
  total: number;
  current: StatisticsSalesCurrent;
}

export interface StatisticsSalesCurrent {
  day: number;
  week: number;
  month: number;
  year: number;
}

export interface StatisticsSalesPeriod {
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
