import { instance } from './base.api';
import { ENDPOINTS } from './endpoints';

const getSheetProducts = (sheetId: string) => instance.get(`${ENDPOINTS.SHEET_PRODUCTS}/${sheetId}`);
const getSheetCategories = (sheetId: string) => instance.get(`${ENDPOINTS.SHEET_CATEGORIES}/${sheetId}`);
const updateSheetCategories = (sheetId: string, range: string, updatedRows: Array<string[]>) =>
  instance.put(`${ENDPOINTS.SHEET_PRODUCTS}/${sheetId}/${range}`, { values: updatedRows });

const structureProductsData = (listProducts: Array<string[]>) => {
  return listProducts.slice(1).map((row) => ({
    category: row[0],
    subcategory: row[1],
    price: row[2],
    stock: row[3],
  }));
};

export const sheetProducts = {
  getSheetCategories,
  getSheetProducts,
  updateSheetCategories,
  structureProductsData,
};
