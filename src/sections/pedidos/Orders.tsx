import { DateContext } from '../../context/DateContextProvider';
import Loading from '../../common/components/Loading';
import { OrderCard } from './OrderCard';
import { BsFillPlusCircleFill } from 'react-icons/bs';
import Modal from './ModalOrder';
import { useEffect, useContext, useState } from 'react';
import { orders } from '../../api';
import AppState from '../../common/interfaces/appState.interface';
import { Order } from '../../api/interfaces/order.interface';
import { GeneralMessage } from '../../common/components/GeneralMessage';

export const Orders: React.FC<{}> = () => {
  const { dateRange } = useContext(DateContext);
  const [allOrders, setAllOrders] = useState<AppState['order']>(null);
  const [error, setError] = useState<Boolean>(false);
  const [loading, setLoading] = useState<Boolean>(true);

  const showOrders = (allOrders: AppState['order']): Boolean => Boolean(allOrders && allOrders.length > 0);

  useEffect(() => {
    orders
      .getOrdersForRange(dateRange.startDate, dateRange.endDate)
      .then((r) => {
        setAllOrders(r.data?.orders);
      })
      .catch(() => setError(!error))
      .finally(() => setLoading(!loading));
  }, [dateRange]);

  return (
    <main className="xl:col-span-11 h-full max-h-screen overflow-auto bg-customSteelblue ">
      <div className="p-4 flex  gap-20 items-center justify-center  h-full">
        {showOrders(allOrders) ? (
          allOrders!.map((order: Order) => <OrderCard key={order._id} {...order} />)
        ) : (
          <GeneralMessage message="Todavia no hay pedidos" />
        )}
      </div>
    </main>
  );
};
