import axios, { AxiosInstance } from 'axios';

export const axiosCustom: AxiosInstance = axios.create({
  baseURL: 'http://localhost:3000',
  withCredentials: true,
});
