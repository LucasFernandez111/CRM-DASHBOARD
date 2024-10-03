import { ReactNode } from "react";
import { UserResponse, StatisticsResponse } from "./response.interface";

export interface ApiContextProps {
  user: UserResponse | null;
  statistics: StatisticsResponse | null;
  orders: any | null;
  error: boolean | Error;
  loading: boolean;
}

export interface ApiProviderProps {
  children: ReactNode;
}
