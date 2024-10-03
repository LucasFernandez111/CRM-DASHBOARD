import { useContext } from 'react';
import { ApiContext } from '../../context/ApiContext';

export const useApi = () => useContext(ApiContext);
