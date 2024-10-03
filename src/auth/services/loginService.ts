import { AxiosResponse } from 'axios';
import { fetchData as fetchApi } from '../../api/apiService';
import { User } from '../../common/interfaces';

export const getToken = (): string | null => {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('token');
};

export const getUser = async () => {
  try {
    const response: AxiosResponse = await fetchApi('users');

    return response.data;
  } catch (error) {
    throw new Error('Error fetching user');
  }
};

export const getStatistics = async () => {
  try {
    const response: AxiosResponse = await fetchApi('statistics');
    return response.data;
  } catch (error) {
    throw new Error('Error fetching statistics');
  }
};

export const getOrders = async () => {
  try {
    const response: AxiosResponse = await fetchApi('orders');
    return response.data;
  } catch (error) {
    throw new Error('Error fetching orders');
  }
};
