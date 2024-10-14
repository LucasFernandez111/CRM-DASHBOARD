import { StatisticsResponse, UserResponse } from './api/response.interface';
import { User } from './user/user.interface';
import { LocalStorageUser } from './user/user.interface';
import { Order } from '../../api/interfaces/order.interface';

export default interface AppState {
  user: User | null;
  statisticsResponse: StatisticsResponse | null;
  localStorageUser: LocalStorageUser | '';
  dateRange: Range[];
  order: Order[] | null;
}
