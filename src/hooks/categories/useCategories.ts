import { sheetProducts } from '@/api';
import { AppStore } from '@/redux/store';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNotification } from '../notification/useNotification';
import { Product } from '@/api';

export const useSheetProducts = () => {
  const userState = useSelector((state: AppStore) => state.user);
  const { alertError } = useNotification();
  const [products, setProducts] = useState<Product[]>([]);

  const getProducts = async () => {
    try {
      const response = await sheetProducts.getSheetCategories(userState.sheetId);

      if (response.data.length === 0) alertError('No hay categorias todavia en la sheet');

      setProducts(response.data);
    } catch (error) {}
  };

  useEffect(() => {
    const abortController = new AbortController();
    if (!userState.sheetId) {
      alertError('No hay ninguna sheet registrada');
    } else {
      getProducts();
    }
    return () => abortController.abort();
  }, []);

  return {
    products,
  };
};
