import { DialogComp } from '@/components/DialogComp';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';
import { useState } from 'react';
import { FormUpdateRows } from '../../FormUpdateRows';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  onRefreshFetchTable?: () => void;
}

const DataTable = <TData, TValue>({ columns, data, onRefreshFetchTable }: DataTableProps<TData, TValue>) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      rowSelection,
    },
  });

  const getFirstRowSelected = () => table.getFilteredSelectedRowModel().rows[0];

  const getFirstRowSelectedValue = () => getFirstRowSelected()?.original;

  const getFirstRowSelectedRange = () => `A${getFirstRowSelected()?.index + 2}:D${getFirstRowSelected()?.index + 2}`;

  const showButtonModify = (): Boolean => {
    return table.getFilteredSelectedRowModel().rows.length > 0 && table.getFilteredSelectedRowModel().rows.length <= 1;
  };

  return (
    <div className="rounded-md border ">
      {/* FILTRADO DE DATOS */}
      <div className="flex items-center p-4 gap-2 justify-around">
        <Input
          placeholder="Filtrado por categoria"
          value={(table.getColumn('category')?.getFilterValue() as string) ?? ''}
          onChange={(event) => table.getColumn('category')?.setFilterValue(event.target.value)}
          className="max-w-[200px] border-customSteelblue"
        />

        <Input
          placeholder="Filtrado por subcategoria"
          value={(table.getColumn('subcategory')?.getFilterValue() as string) ?? ''}
          onChange={(event) => table.getColumn('subcategory')?.setFilterValue(event.target.value)}
          className="max-w-[200px] border-customSteelblue"
        />
      </div>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <div className="flex items-center justify-around space-x-2 py-4">
        <Button variant="outline" size="sm" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
          Anterior
        </Button>
        <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
          Siguiente
        </Button>
      </div>
      <div className="flex-1 flex-row flex justify-between  text-md font-semibold text-muted-foreground p-2 ">
        <p>
          {table.getFilteredSelectedRowModel().rows.length} de {table.getFilteredRowModel().rows.length} filas
          seleccionadas
        </p>

        {showButtonModify() && (
          <DialogComp
            buttonTrigger={
              <Button variant="default" size="sm">
                Modificar fila
              </Button>
            }
            description="Modifica la información de las filas seleccionadas ."
            title="¿Deseas modificar las filas seleccionadas?"
          >
            <FormUpdateRows
              valueRowSelected={getFirstRowSelectedValue()}
              rangeRowSelected={getFirstRowSelectedRange()}
              onRefresh={onRefreshFetchTable}
            />
          </DialogComp>
        )}
      </div>
    </div>
  );
};

export default DataTable;
