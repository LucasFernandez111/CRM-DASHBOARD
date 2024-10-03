import { createContext } from 'react';
import { ApiContextProps, ApiProviderProps } from '../common/interfaces/api/api.interface';

const initialContext: ApiContextProps = {
  user: null,
  statistics: null,
  orders: null,
  error: false,
  loading: true,
};
export const ApiContext = createContext<ApiContextProps>(initialContext);

export const ApiProvider = ({ children }: ApiProviderProps) => {
  const value: any = {};
  return <ApiContext.Provider value={value}>{children}</ApiContext.Provider>;
};
