import { instance } from './base.api';
import { ENDPOINTS } from './endpoints';

const getSheetProducts = () => instance.get(ENDPOINTS.SHEET_PRODUCTS);
const getSheetCategories = () => instance.get(ENDPOINTS.SHEET_CATEGORIES);

export const sheetProducts = {
  getSheetCategories,
  getSheetProducts,
};
