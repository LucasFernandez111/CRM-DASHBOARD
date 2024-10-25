import { Card } from '@/components/ui/card';
import { columns, DataTable } from './components/data-table/DataTable';
import { useNotification, useProducts } from '@/hooks';
import { useEffect, useState } from 'react';
import { SheetData } from './components/data-table/DataTable/columns';
import { structureProductsData } from './utils';

export const MenuPage = () => {
  const { products, error } = useProducts();
  const { alertError, alertInfo } = useNotification();
  const [productsData, setProductsData] = useState<SheetData[]>([
    {
      category: '-',
      subcategory: '-',
      price: '0',
      stock: 0,
    },
  ]);

  useEffect(() => {
    if (!products && error) alertError('Error al cargar los productos');
    if (products.length < 0) alertInfo('No hay productos');

    setProductsData(structureProductsData(products));
  }, [products, error]);

  return (
    <main className=" col-span-11   h-full max-h-screen overflow-auto bg-customSteelblue p-4">
      <Card>
        <DataTable columns={columns} data={productsData} />
      </Card>
    </main>
  );
};
