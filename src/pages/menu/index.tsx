import { Card } from '@/components/ui/card';
import { columns, DataTable } from './components/data-table/DataTable';
import { useSheetMenu } from '@/hooks';

export const MenuPage = () => {
  const { menu, handleRefresh } = useSheetMenu();

  return (
    <main className=" col-span-11   h-full max-h-screen overflow-auto bg-customSteelblue p-4">
      <Card>
        <DataTable columns={columns} data={menu} onRefreshFetchTable={handleRefresh} />
      </Card>
    </main>
  );
};
