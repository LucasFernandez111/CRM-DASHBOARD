import { instance } from '@/api';

enum StatusCodes {
  UNAUTHORIZED = 401,
}

export const AxiosInterceptor = () => {
  instance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response.status === StatusCodes.UNAUTHORIZED) {
        window.location.href = '/login';
      }
      return Promise.reject(error);
    },
  );
};
