import { Button } from '@/components/ui/button';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
export type SheetData = {
  category: string;
  subcategory: string;
  price: string;
  stock: number;
};

export const columns: ColumnDef<SheetData>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'category',
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          CATEGORIA
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: 'subcategory',
    header: 'SUBCATEGORIA',
  },
  {
    accessorKey: 'price',
    header: () => <div className="text-center">PRECIO</div>,
    cell: ({ row }) => {
      return <div className="text-center font-medium">{row.getValue('price')}</div>;
    },
  },
  {
    accessorKey: 'stock',
    header: 'STOCK',
  },
];
