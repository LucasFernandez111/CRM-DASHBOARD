import { IoPrintSharp } from 'react-icons/io5';
import { LuCalendarClock } from 'react-icons/lu';
import { Customer, Item } from '../../api/interfaces/order.interface';
import { MdDeleteForever } from 'react-icons/md';
import { orders } from '../../api';
interface Props {
  _id: string;
  customer: Customer;
  items: Item[];
  orderNumber: number;
  totalAmount: number;
}

export const OrderCard: React.FC<Props> = ({ _id, customer, totalAmount: totalAmount = 0, items, orderNumber = 0 }) => {
  const handleClickPDF = async (_id: string) => {
    try {
      await orders.getPDFOrders(_id);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClickDelete = async (_id: string) => {
    try {
      await orders.deleteOrder(_id);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <article className="flex-none max-h-full w-80 transform flex flex-col rounded-3xl bg-white p-4 font-mono text-xl shadow-2xl transition duration-300 hover:scale-105">
      <section className="flex flex-col w-full h-full items-center justify-between divide-y-2 divide-gray-800 divide-dashed">
        <header className=" h-24 w-full flex justify-center items-center">
          <div className="bg-sky-600 p-5 rounded-full">
            <h1 className="text-center font-black text-3xl text-white">{orderNumber}#</h1>
          </div>

          <MdDeleteForever
            size={50}
            cursor="pointer"
            className="absolute top-2 right-2"
            onClick={() => handleClickDelete(_id)}
          />
        </header>
        <div className="w-full flex gap-2 justify-center items-center py-2">
          <LuCalendarClock size={30} />
          <p>29/12/24</p>
        </div>
        {items.length != 0
          ? items!.map((item: Item) => (
              <>
                <div className="flex w-full justify-between py-2">
                  <p>CANT.</p>
                  <p>DESC.</p>
                  <p>PRECIO</p>
                </div>
                <div className="flex w-full justify-between py-2">
                  <p>{item.quantity}x</p>
                  <p>{item.description || ''}</p>
                  <p>${item.price}</p>
                </div>
              </>
            ))
          : ''}
        <div className="flex w-full justify-between py-2">
          <p>TOTAL</p>
          <p>${totalAmount}</p>
        </div>
        <footer className="flex w-full flex-col py-2">
          <address className="flex flex-col space-y-1 not-italic">
            <p>DIRECCION: {customer.address.street}</p>
            <p>NUMERO: {customer.phone}</p>
            <p>NOMBRE: {customer.name}</p>
          </address>
        </footer>
        <div className="flex items-center justify-center mt-4 bg-gray-800 rounded-full w-16 h-16 divide-none hover:bg-gray-700">
          <IoPrintSharp color="white" size={40} cursor="pointer" onClick={() => handleClickPDF(_id)} />
        </div>
      </section>
    </article>
  );
};
