import { instance } from '@/api';
import { PublicRoutes } from '@/routes/routes';

enum StatusCodes {
  UNAUTHORIZED = 401,
}

export const AxiosInterceptor = () => {
  instance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('token');

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    },
  );

  instance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      console.log(error);

      if (error.response.status === StatusCodes.UNAUTHORIZED) {
        window.location.href = PublicRoutes.UNAUTHORIZED;
      }
      return Promise.reject(error);
    },
  );
};
