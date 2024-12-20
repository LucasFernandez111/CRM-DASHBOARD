import { sheetProducts } from '@/api';
import { AppStore } from '@/redux/store';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNotification } from '../notification/useNotification';
import { SheetData } from '@/pages';

export const useSheetMenu = () => {
  const userState = useSelector((state: AppStore) => state.user);
  const { alertError, alertInfo } = useNotification();
  const [menu, setMenu] = useState<SheetData[]>([]);
  const [refresh, setRefresh] = useState<Boolean>(false);

  const handleRefresh = () => setRefresh(!refresh);

  const getTableMenuSheet = async () => {
    try {
      const response = await sheetProducts.getSheetMenu(userState.sheetId);

      if (response.data.length === 0) alertInfo('No hay productos todavia en la sheet');

      const menuStructured = sheetProducts.structureSheetMenuData(response.data);

      setMenu(menuStructured);
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
      getTableMenuSheet();
    }
    return () => abortController.abort();
  }, [refresh, userState.sheetId]);
  return { menu, handleRefresh, getTableMenuSheet };
};
