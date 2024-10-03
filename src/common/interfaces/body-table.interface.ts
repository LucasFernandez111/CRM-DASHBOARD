export interface BodyTableProps {
  orders: string[][];
  onEditRow: number;
  setOnEditRow: (index: number) => void;
}
