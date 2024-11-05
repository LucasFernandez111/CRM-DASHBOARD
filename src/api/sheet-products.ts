import { instance } from './base.api';
import { ENDPOINTS } from './endpoints';

const getSheetProducts = (sheetId: string) => instance.get(`${ENDPOINTS.SHEET_PRODUCTS}/${sheetId}`);
const getSheetCategories = (sheetId: string) => instance.get(`${ENDPOINTS.SHEET_CATEGORIES}/${sheetId}`);

export const sheetProducts = {
  getSheetCategories,
  getSheetProducts,
};
