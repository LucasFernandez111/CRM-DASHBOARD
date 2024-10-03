import { HiOutlineClipboardDocumentList } from 'react-icons/hi2';
import OrderLastest from './OrderLastest';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { useApi } from '../../common/hooks/useApi';

const LatestOrderCard = () => {
  const { orders } = useApi();
  const lastestOrders: [] = orders?.slice(-3);

  const navigate: NavigateFunction = useNavigate();
  return (
    <div className="flex  flex-col h-[400px] shadow p-6 rounded-4xl bg-white w-[600px]">
      <div className="flex ">
        <HiOutlineClipboardDocumentList size={70} color="#094B81" />
        <h1 className="font-bold text-3xl text-customSteelblue">
          ULTIMO <br />
          PEDIDO
        </h1>
      </div>

      <div className="flex flex-grow items-center justify-around">
        {lastestOrders?.map((order: any) => (
          <OrderLastest key={order._id} {...order} />
        ))}
      </div>
      <div className="mt-3 flex items-center justify-center">
        <button
          className="rounded-3xl bg-customSteelblue px-6 py-2 text-2xl font-extrabold text-white hover:shadow-md  "
          onClick={() => navigate('/pedidos')}
        >
          VER MAS
        </button>
      </div>
    </div>
  );
};

export default LatestOrderCard;
