import { sheetProducts } from '@/api';
import { AppStore } from '@/redux/store';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNotification } from '../notification';

export const useProducts = () => {
  const userState = useSelector((state: AppStore) => state.user);
  const { alertError } = useNotification();
  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    sheetProducts
      .getSheetProducts(userState.sheetId)
      .then((r) => setProducts(r.data?.products))
      .catch((err) => alertError(err.message))
      .finally(() => setLoading(!loading));
  }, []);
  return { products, loading };
};
