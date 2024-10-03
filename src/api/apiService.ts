import { AxiosResponse } from 'axios';
import { axiosCustom } from './axios';

export const fetchData = async (endpoint: string): Promise<AxiosResponse> => {
  try {
    const response = await axiosCustom.get(endpoint);
    if (!response) {
      throw new Error('Error fetching data');
    }
    return response;
  } catch (error) {
    console.error(`API [${endpoint}] Error:  `, error);
    throw error;
  }
};
