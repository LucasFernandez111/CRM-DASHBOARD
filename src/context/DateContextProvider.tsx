import React, { createContext, useState } from 'react';

import { DateContextProviderProps, DateContextType, DateRangeFilter } from './interfaces/date-context';
import { format } from 'date-fns';

export const DateContext = createContext<DateContextType>({} as DateContextType);

export const DateContextProvider: React.FC<DateContextProviderProps> = ({ children }) => {
  const today: string = format(new Date(), 'yyyy-MM-dd'); // Valor predeterminado
  const [dateRange, setDateRange] = useState<DateRangeFilter>({ startDate: today, endDate: today });

  const setDateRangeFilter = (startDate: string, endDate: string) => setDateRange({ startDate, endDate });

  return <DateContext.Provider value={{ dateRange, setDateRangeFilter }}>{children}</DateContext.Provider>;
};
