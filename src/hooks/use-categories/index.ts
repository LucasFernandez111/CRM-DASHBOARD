import { sheetProducts } from '@/api';
import { useEffect, useState } from 'react';

export const useCategories = () => {
  const [categories, setCategories] = useState<string[]>([]);
  const [subcategories, setSubcategories] = useState<string[]>([]);
  const [error, setError] = useState<Boolean>(false);
  const [loading, setLoading] = useState<Boolean>(true);

  useEffect(() => {
    sheetProducts
      .getSheetCategories()
      .then((r) => {
        setCategories(r.data?.categories);
        setSubcategories(r.data?.subcategories);
      })
      .catch(() => setError(!error))
      .finally(() => setLoading(!loading));
  }, []);

  return {
    categories,
    subcategories,
    error,
    loading,
  };
};
