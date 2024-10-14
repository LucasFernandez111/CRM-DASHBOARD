import { instance } from './base.api';
import { ENDPOINTS } from './endpoints';

const getUser = () => instance.get(ENDPOINTS.USERS);

export const users = {
  getUser,
};
