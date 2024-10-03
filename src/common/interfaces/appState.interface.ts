import { StatisticsResponse, UserResponse } from './api/response.interface';
import { User } from './user/user.interface';
import { LocalStorageUser } from './user/user.interface';

export default interface AppState {
  user: User | null;
  statisticsResponse: StatisticsResponse | null;
  localStorageUser: LocalStorageUser | '';
  dateRange: Range[];
}
