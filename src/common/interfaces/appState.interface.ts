import { User } from '@/api';
import { CreateOrder, Order } from '../../api/interfaces/order.interface';

export default interface AppState {
  user: User | null;

  dateRange: Range[];
  order: Order[];
  createOrder: CreateOrder;
}
