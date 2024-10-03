// import Modal from './ModalOrder';
// import { OrderCardProps } from '../../common/interfaces/order-card.interface';
// import { OrderCard } from './OrderCar';
// import { BsFillPlusCircleFill } from 'react-icons/bs';
// import { useContext } from 'react';
// import { DateContext } from '../../context/DateContextProvider';
// import { useFetch } from '../../common/hooks/useFetch';
// import Loading from '../../common/components/Loading';

const Pedidos = () => {
  // const { dateRange } = useContext(DateContext);
  // const { data, error, loading } = useFetch(
  //   `/orders/range?startDate=${dateRange.startDate}&endDate=${dateRange.endDate}`,
  // );
  // if (loading) {
  //   return <Loading />;
  // }
  // if (error) {
  //   return <div>Error: {error}</div>;
  // }
  // return (
  //   <section
  //     className={`w-full h-full flex gap-6 py-4 px-8 overflow-x-auto justify-${
  //       data?.length !== 0 ? 'start' : 'center'
  //     } items-center`}
  //   >
  //     {data?.map((order: OrderCardProps) => (
  //       <OrderCard key={order.order} {...order} />
  //     ))}
  //     <Modal>
  //       <BsFillPlusCircleFill color="white" size={100} cursor="pointer" />
  //     </Modal>
  //   </section>
  // );
};

export default Pedidos;
