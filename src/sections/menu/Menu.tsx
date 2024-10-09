import { useState } from 'react';
import BodyTable from './components/BodyTable';
import HeadersTable from './components/HeaderTable';
import Loading from '../../common/components/Loading';
import { useFetch } from '../../common/hooks/useFetch';

const Menu = () => {
  const [onEditRow, setOnEditRow] = useState<number | null>(null);
  const { data, loading } = useFetch('/sheets/products');
  console.log(data);

  const [headers, orders] = data ? [data[0], data.slice(1)] : [[], []]; // Simplificación de la lógica de extracción

  return (
    <section className="h-full w-full max-h-full px-2">
      {loading ? (
        <Loading />
      ) : !data ? (
        <h1 className="text-center text-gray-500 opacity-25 text-5xl font-bold">
          No se encontró ninguna Sheet Registrada
        </h1>
      ) : (
        <div className="max-h-[50px] xl:max-h-[820px] overflow-y-scroll overflow-x-scroll">
          <table className="w-full text-2xl text-center rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-2xl text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <HeadersTable headers={headers} />
            </thead>
            <BodyTable orders={orders} onEditRow={onEditRow} setOnEditRow={setOnEditRow} />
          </table>
        </div>
      )}
    </section>
  );
};

export default Menu;
