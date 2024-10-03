import { IoPrintSharp } from "react-icons/io5";
import { LuCalendarClock } from "react-icons/lu";
import { OrderCardProps } from "../../common/interfaces/order-card.interface";

export const OrderCard = ({
  name,
  price,
  description,
  quantity,
  order,
  phone,
  address,
}: OrderCardProps) => {
  return (
    <article className="flex-none h-[600px] w-80 transform flex flex-col rounded-3xl bg-white p-4 font-mono text-xl shadow-2xl transition duration-300 hover:scale-105">
      <section className="flex flex-col w-full h-full items-center justify-between divide-y-2 divide-gray-800 divide-dashed">
        <header className="flex h-20 w-20 rounded-full bg-sky-600 items-center justify-center shadow-md mb-2">
          <h1 className="text-center font-black text-3xl text-white">
            {order}#
          </h1>
        </header>
        <div className="w-full flex gap-2 justify-center items-center py-2">
          <LuCalendarClock size={30} />
          <p>29/12/24</p>
        </div>
        <div className="flex w-full justify-between py-2">
          <p>CANT.</p>
          <p>DESC.</p>
          <p>PRECIO</p>
        </div>
        <div className="flex w-full justify-between py-2">
          <p>{quantity}</p>
          <p>{description}</p>
          <p>${price}</p>
        </div>
        <div className="flex w-full justify-between py-2">
          <p>TOTAL EN PESOS</p>
          <p>${price}</p>
        </div>
        <footer className="flex w-full flex-col py-2">
          <address className="flex flex-col space-y-1 not-italic">
            <p>DIRECCION: {address}</p>
            <p>NUMERO: {phone}</p>
            <p>NOMBRE: {name}</p>
          </address>
        </footer>
        <div className="flex items-center justify-center mt-4 bg-gray-800 rounded-full w-16 h-16 divide-none hover:bg-gray-700">
          <IoPrintSharp color="white" size={40} cursor="pointer" />
        </div>
      </section>
    </article>
  );
};
