export const structureProductsData = (listProducts: Array<string[]>) => {
  return listProducts.slice(1).map((row) => ({
    category: row[0] || '-',
    subcategory: row[1] || '-',
    price: row[2] || '0',
    stock: Number(row[3]) || 0,
  }));
};
