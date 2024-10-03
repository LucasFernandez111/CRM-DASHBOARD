const OrderLastest = ({ order, price }: any) => {
  return (
    <div className="flex h-40 w-36 flex-col rounded-3xl bg-sky-600 p-4">
      <h1 className="text-xl font-bold flex flex-col justify-center items-center    text-white ">
        PEDIDO <span>{order} #</span>
      </h1>
      <p className="text-3xl font-extrabold  flex-grow flex items-center justify-center text-white">
        ${price}
      </p>
    </div>
  );
};

export default OrderLastest;
