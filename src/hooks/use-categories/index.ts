import { sheetProducts } from '@/api';
import { AppStore } from '@/redux/store';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNotification } from '../notification';

export const useCategories = () => {
  const userState = useSelector((state: AppStore) => state.user);
  const { alertError } = useNotification();
  const [categories, setCategories] = useState<string[]>([]);
  const [subcategories, setSubcategories] = useState<string[]>([]);
  const [loading, setLoading] = useState<Boolean>(true);

  useEffect(() => {
    sheetProducts
      .getSheetCategories(userState.sheetId)
      .then((r) => {
        setCategories(r.data?.categories);
        setSubcategories(r.data?.subcategories);
      })
      .catch(() => alertError('Error al cargar las categorias'))
      .finally(() => setLoading(!loading));
  }, []);

  return {
    categories,
    subcategories,

    loading,
  };
};
