export interface StatisticsTopOrder {
  today: TopOrder;
  period: TopOrder;
}

export interface TopOrder {
  totalAmount: number;
  count: number;
  category: string;
  subcategory: string;
}
