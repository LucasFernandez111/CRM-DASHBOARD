export type Product = {
  category: string;
  subcategory: ProductSubcategories[];
  stock: string;
};

export type ProductSubcategories = {
  name: string;
  price: string;
};
