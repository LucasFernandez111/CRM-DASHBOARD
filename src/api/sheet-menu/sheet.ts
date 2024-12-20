import { AxiosResponse } from 'axios';
import { instance } from '../base.api';
import { ENDPOINTS } from '../endpoints';
import { Menu } from './types/menu.type';
import { Product } from './types/products.type';
const getSheetMenu = (sheetId: string): Promise<AxiosResponse<Menu>> =>
  instance.get(`${ENDPOINTS.SHEET}/${sheetId}/menu`);
const getSheetProducts = (sheetId: string): Promise<AxiosResponse<Product[]>> =>
  instance.get(`${ENDPOINTS.SHEET}/${sheetId}/products`);
const updateSheetCategories = (sheetId: string, range: string, updatedRows: Array<string[]>) =>
  instance.put(`${ENDPOINTS.SHEET}/${sheetId}/${range}`, { values: updatedRows });

const structureSheetMenuData = (listProducts: Array<string[]>) => {
  return listProducts.slice(1).map((row) => ({
    category: row[0],
    subcategory: row[1],
    price: row[2],
    stock: row[3],
  }));
};

export const sheetProducts = {
  getSheetCategories: getSheetProducts,
  getSheetMenu,
  updateSheetCategories,
  structureSheetMenuData,
};
