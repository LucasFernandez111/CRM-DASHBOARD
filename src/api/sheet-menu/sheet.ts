import { AxiosResponse } from 'axios';
import { instance } from '../base.api';
import { ENDPOINTS } from '../endpoints';
import { Product } from './types/products.type';
const getSheetMenu = (sheetId: string): Promise<AxiosResponse<any>> =>
  instance.get(`${ENDPOINTS.SHEET}/${sheetId}/menu`);
const getSheetProducts = (sheetId: string): Promise<AxiosResponse<Product[]>> =>
  instance.get(`${ENDPOINTS.SHEET}/${sheetId}/products`);
const updateSheetCategories = (sheetId: string, range: string, updatedRows: Array<string[]>) =>
  instance.put(`${ENDPOINTS.SHEET}/${sheetId}/${range}`, { values: updatedRows });

const addSheetProducts = (sheetId: string, products: string[]) =>
  instance.post(`${ENDPOINTS.SHEET}/${sheetId}`, { values: products });

const deleteProducts = (sheetId: string, range: string) => instance.delete(`${ENDPOINTS.SHEET}/${sheetId}/${range}`);

const structureSheetMenuData = (listProducts: Array<string[]>) => {
  return listProducts.slice(1).map((row) => ({
    category: row[0],
    subcategory: row[1],
    price: row[2],
    stock: row[3],
  }));
};

export const sheetProducts = {
  getSheetProducts,
  getSheetMenu,
  updateSheetCategories,
  structureSheetMenuData,
  addSheetProducts,
  deleteProducts,
};
