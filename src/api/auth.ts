import { instance } from './base.api';
import { ENDPOINTS } from './endpoints';

const logOut = () => instance.get(ENDPOINTS.LOGOUT);

export const auth = {
  logOut,
};
