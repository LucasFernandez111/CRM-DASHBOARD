import { useState, useEffect } from 'react';
import BodyTable from './components/BodyTable';
import HeadersTable from './components/HeaderTable';
import Loading from '../../common/components/Loading';

const Menu = () => {
  const [headers, setHeaders] = useState<string[]>([]);
  const [orders, setOrders] = useState<string[][]>([]);
  const [onEditRow, setOnEditRow] = useState<any>(0);

  const { data, loading } = useFetch('user/sheet');

  useEffect(() => {
    if (data) {
      const [headerRow, ...orderRows] = data.rows;
      setHeaders(headerRow);
      setOrders(orderRows);
    }
  }, [data]);

  if (loading) return <Loading />;

  if (!data)
    return (
      <h1 className="text-center  text-gray-500 opacity-25 text-5xl font-bold">
        No se encontro ninguna Sheet Registrada
      </h1>
    );

  return (
    <section className="xl:grid-cols-1   h-full w-full max-h-full ">
      <div className="max-h-[50px] xl:max-h-[820px] overflow-y-scroll overflow-x-scroll ">
        <table className="w-full text-2xl text-center rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-2xl text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <HeadersTable headers={headers} />
          </thead>
          <BodyTable orders={orders} onEditRow={onEditRow} setOnEditRow={setOnEditRow} />
        </table>
      </div>
    </section>

    // <div className="p-4">
    //   {data && data.rows.length > 0 ? (
    //     <div className="relative overflow-x-auto shadow-md sm:rounded-2xl w-full">
    //       <table className="w-full text-2xl text-center rtl:text-right text-gray-500 dark:text-gray-400">
    //         <thead className="text-4xl text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
    //           <HeadersTable headers={headers} />
    //         </thead>
    //         <BodyTable
    //           orders={orders}
    //           onEditRow={onEditRow}
    //           setOnEditRow={setOnEditRow}
    //         />
    //       </table>
    //     </div>
    //   ) : (
    //     <h1 className="text-center  text-gray-500 opacity-25 text-5xl font-bold">
    //       No se encontro ninguna Sheet Registrada
    //     </h1>
    //   )}
    // </div>
  );
};

export default Menu;
