import { UserUpdateType } from '@/pages/orders/schema/form.update.user.schema';
import { instance } from './base.api';
import { ENDPOINTS } from './endpoints';
import { AxiosResponse } from 'axios';
import { User } from './interfaces';

interface ReponseBody {
  user: User;
}
const getUser = (): Promise<AxiosResponse<ReponseBody>> => instance.get(ENDPOINTS.USERS);

const updateUser = (user: UserUpdateType) => instance.put(ENDPOINTS.USERS, user);

export const users = {
  getUser,
  updateUser,
};
