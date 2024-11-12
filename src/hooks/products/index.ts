import { sheetProducts } from '@/api';
import { AppStore } from '@/redux/store';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNotification } from '../notification';
import { SheetData } from '@/pages';

export const useProducts = () => {
  const userState = useSelector((state: AppStore) => state.user);
  const { alertError, alertInfo } = useNotification();
  const [products, setProducts] = useState<SheetData[]>([]);
  const [refresh, setRefresh] = useState<Boolean>(false);

  const handleRefresh = () => setRefresh(!refresh);

  const getTableProductsSheet = async () => {
    try {
      const response = await sheetProducts.getSheetProducts(userState.sheetId);

      if (response.data.products.length === 0) alertInfo('No hay productos todavia en la sheet');

      const productsStructured = sheetProducts.structureProductsData(response.data.products);

      setProducts(productsStructured);
    } catch (error) {
      alertError('Error al cargar los productos');
      console.error(error);
    }
  };
  useEffect(() => {
    const abortController = new AbortController();
    if (!userState.sheetId) {
      alertError('No hay ninguna sheet registrada');
    } else {
      getTableProductsSheet();
    }
    return () => abortController.abort();
  }, [refresh, userState.sheetId]);
  return { products, handleRefresh, getTableProductsSheet };
};
