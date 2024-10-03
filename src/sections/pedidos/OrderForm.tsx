import { useState } from "react";
import { axiosCustom } from "../../api/axios";

import { GenerateOrder } from "../../common/interfaces/generate-order.interface";

function OrderForm() {
  const [order, setOrder] = useState<GenerateOrder>({
    name: "",
    address: "",
    phone: "",
    quantity: 0,
    description: "",
    price: 0,
  });
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      const response = await axiosCustom.post("/orders", order);
      if (response) window.location.reload();
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <form
      className=" font-medium grid grid-cols-2 gap-3 gap-y-12"
      onSubmit={handleSubmit}
    >
      <div>
        <label htmlFor="name" className="block  text-gray-700">
          Name
        </label>
        <input
          onChange={(e) => setOrder({ ...order, name: e.target.value })}
          required
          type="text"
          id="name"
          className=" p-2 block w-full rounded-md border-gray-300 shadow-md focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          placeholder="Nombre del cliente"
        />
      </div>
      <div>
        <label htmlFor="price" className="block  text-gray-700">
          Precio
        </label>
        <input
          onChange={(e) => {
            setOrder({ ...order, price: Number(e.target.value) });
          }}
          required
          type="number"
          min="1"
          id="price"
          className=" p-2 block w-full rounded-md border-gray-300 shadow-md focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          placeholder="Precio del producto"
        />
      </div>
      <div>
        <label htmlFor="description" className="block  text-gray-700">
          Description
        </label>
        <input
          onChange={(e) => {
            setOrder({ ...order, description: e.target.value });
          }}
          required
          type="text"
          id="address"
          className="  p-2 block w-full rounded-md border-gray-300 shadow-md focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          placeholder="Descripcion"
        />
      </div>
      <div>
        <label htmlFor="quantity" className="block  text-gray-700">
          Cantidad
        </label>
        <input
          onChange={(e) =>
            setOrder({ ...order, quantity: Number(e.target.value) })
          }
          required
          type="number"
          id="quantity"
          className=" p-2 block w-full rounded-md border-gray-300 shadow-md focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          placeholder="Cantidad"
        />
      </div>
      <div>
        <label htmlFor="phone" className="block  text-gray-700">
          Telefono
        </label>
        <input
          onChange={(e) => setOrder({ ...order, phone: e.target.value })}
          required
          type="tel"
          id="phone"
          className=" p-2 block w-full rounded-md border-gray-300 shadow-md focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          placeholder="11 ... "
        />
      </div>
      <div>
        <label htmlFor="address" className="block  text-gray-700">
          Ubicacion
        </label>
        <input
          onChange={(e) => setOrder({ ...order, address: e.target.value })}
          required
          type="text"
          id="address"
          className="  p-2 block w-full rounded-md border-gray-300 shadow-md focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          placeholder="Enter address"
        />
      </div>
      <button className="bg-customSteelblue hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg col-span-2">
        Generar Pedido
      </button>
    </form>
  );
}

export default OrderForm;
