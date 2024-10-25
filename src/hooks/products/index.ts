import { sheetProducts } from '@/api';
import { useEffect, useState } from 'react';

export const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    sheetProducts
      .getSheetProducts()
      .then((r) => setProducts(r.data?.products))
      .catch(() => setError(!error))
      .finally(() => setLoading(!loading));
  }, []);
  return { products, error, loading };
};
