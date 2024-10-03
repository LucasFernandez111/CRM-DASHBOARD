export type DateContextType = {
  dateRange: DateRangeFilter;
  setDateRangeFilter: (startDate: string, endDate: string) => void;
};
export interface DateContextProviderProps {
  children: React.ReactNode;
}

export interface DateRangeFilter {
  startDate: string;
  endDate: string;
}
