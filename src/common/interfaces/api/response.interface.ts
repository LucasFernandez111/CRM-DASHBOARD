export interface UserResponse {
  id_token: string;
  firstName: string;
  email: string;
  phone: string;
  address: string;
  company: string;
  picture: string;
  createdAt: string;
  sheetId: string;
}

export interface StatisticsResponse {
  descriptionTop: string;
  priceTop: number;
  totalSales: number;
  statisticsByDay: StatisticsByDay;
  totalSalesByMonth: StatisticsByMonth[];
  totalSalesByWeek: number;
}

export interface StatisticsByDay {
  totalOrdersByDay: number;
  totalSalesByDay: number;
}

export interface StatisticsByMonth {
  totalSalesForMonth: number;
  monthDates: number;
}
