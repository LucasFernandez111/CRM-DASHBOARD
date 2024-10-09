import { useState } from 'react';
import { axiosCustom } from '../../api/axios';
import {
  GenerateOrder,
  OrderStatus,
  PaymentMethod, // Asegúrate de tener este enum definido
  PaymentStatus,
} from '../../common/interfaces/generate-order.interface';
import { useFetch } from '../../common/hooks/useFetch';

const initialOrderState: GenerateOrder = {
  customer: {
    name: '',
    phone: '',
    address: {
      street: '',
      city: '',
      postalCode: '',
      country: '',
    },
  },
  items: [
    {
      category: '',
      subcategory: '',
      description: '',
      quantity: 0,
      price: 0,
    },
  ],
  paymentDetails: {
    method: PaymentMethod.EFECTIVO, // Asegúrate de usar el enum correcto
    status: PaymentStatus.PENDIENTE,
  },

  orderStatus: OrderStatus.PENDIENTE,
};

function OrderForm() {
  const [order, setOrder] = useState<GenerateOrder>(initialOrderState);
  const { data: categories, error, loading } = useFetch('/sheets/products/categories');

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      const response = await axiosCustom.post('/orders', order);
      if (response) window.location.reload();
    } catch (error) {
      console.log(error);
    }
  }

  // Actualizar campos del cliente
  const handleCustomerChange = (field: string, value: string) => {
    setOrder({
      ...order,
      customer: { ...order.customer, [field]: value },
    });
  };

  // Actualizar campos de dirección del cliente
  const handleAddressChange = (field: string, value: string) => {
    setOrder({
      ...order,
      customer: {
        ...order.customer,
        address: { ...order.customer.address, [field]: value },
      },
    });
  };

  // Actualizar campos de los artículos
  const handleItemChange = (index: number, field: string, value: any) => {
    const updatedItems = [...order.items];
    updatedItems[index] = { ...updatedItems[index], [field]: value };
    setOrder({
      ...order,
      items: updatedItems,
    });
  };

  // Función para agregar un nuevo artículo
  const addItem = () => {
    setOrder({
      ...order,
      items: [...order.items, { category: '', subcategory: '', description: '', quantity: 0, price: 0 }],
    });
  };

  return (
    <form
      className="max-w-4xl mx-auto p-8 bg-white shadow-md rounded-lg grid grid-cols-1 md:grid-cols-2 gap-6"
      onSubmit={handleSubmit}
    >
      {/* Datos del cliente */}
      <div className="md:col-span-2">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Datos del Cliente</h2>
      </div>
      <div className="flex flex-col">
        <label htmlFor="customerName" className="text-sm font-semibold text-gray-700 mb-2">
          Nombre
        </label>
        <input
          onChange={(e) => handleCustomerChange('name', e.target.value)}
          required
          type="text"
          id="customerName"
          placeholder="Nombre del cliente"
          className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="customerPhone" className="text-sm font-semibold text-gray-700 mb-2">
          Teléfono
        </label>
        <input
          onChange={(e) => handleCustomerChange('phone', e.target.value)}
          required
          type="tel"
          id="customerPhone"
          placeholder="Teléfono del cliente"
          className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="street" className="text-sm font-semibold text-gray-700 mb-2">
          Calle
        </label>
        <input
          onChange={(e) => handleAddressChange('street', e.target.value)}
          required
          type="text"
          id="street"
          placeholder="Calle"
          className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="city" className="text-sm font-semibold text-gray-700 mb-2">
          Ciudad
        </label>
        <input
          onChange={(e) => handleAddressChange('city', e.target.value)}
          required
          type="text"
          id="city"
          placeholder="Ciudad"
          className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="postalCode" className="text-sm font-semibold text-gray-700 mb-2">
          Código Postal
        </label>
        <input
          onChange={(e) => handleAddressChange('postalCode', e.target.value)}
          required
          type="text"
          id="postalCode"
          placeholder="Código Postal"
          className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="country" className="text-sm font-semibold text-gray-700 mb-2">
          País
        </label>
        <input
          onChange={(e) => handleAddressChange('country', e.target.value)}
          required
          type="text"
          id="country"
          placeholder="País"
          className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Artículos */}
      <div className="md:col-span-2 mt-4">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Artículos</h2>
      </div>
      {order.items.map((item, index) => (
        <div key={index} className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label htmlFor={`itemCategory${index}`} className="text-sm font-semibold text-gray-700 mb-2">
              Categoría
            </label>
            <select
              id={`itemCategory${index}`}
              value={item.category}
              onChange={(e) => handleItemChange(index, 'category', e.target.value)}
              className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Selecciona una categoría</option>
              {loading && <option>Cargando categorías...</option>}
              {error && <option>Error al cargar categorías</option>}
              {!loading &&
                categories?.map((category: string) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
            </select>
          </div>
          <div className="flex flex-col">
            <label htmlFor={`itemSubcategory${index}`} className="text-sm font-semibold text-gray-700 mb-2">
              Subcategoría
            </label>
            <input
              onChange={(e) => handleItemChange(index, 'subcategory', e.target.value)}
              required
              type="text"
              id={`itemSubcategory${index}`}
              placeholder="Subcategoría del artículo"
              className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor={`itemDescription${index}`} className="text-sm font-semibold text-gray-700 mb-2">
              Descripción
            </label>
            <input
              onChange={(e) => handleItemChange(index, 'description', e.target.value)}
              required
              type="text"
              id={`itemDescription${index}`}
              placeholder="Descripción del artículo"
              className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor={`itemQuantity${index}`} className="text-sm font-semibold text-gray-700 mb-2">
              Cantidad
            </label>
            <input
              onChange={(e) => handleItemChange(index, 'quantity', Number(e.target.value))}
              required
              type="number"
              id={`itemQuantity${index}`}
              placeholder="Cantidad"
              className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor={`itemPrice${index}`} className="text-sm font-semibold text-gray-700 mb-2">
              Precio
            </label>
            <input
              onChange={(e) => handleItemChange(index, 'price', Number(e.target.value))}
              required
              type="number"
              step="0.01"
              id={`itemPrice${index}`}
              placeholder="Precio"
              className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      ))}
      <div className="md:col-span-2">
        <button
          type="button"
          onClick={addItem}
          className="mt-4 w-full bg-gray-800 text-white py-3 rounded-lg hover:bg-gray-900 transition-colors"
        >
          Agregar otro artículo
        </button>
      </div>

      {/* Detalles de Pago */}
      <div className="md:col-span-2 mt-8">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Detalles de Pago</h2>
      </div>
      <div className="flex flex-col">
        <label htmlFor="paymentMethod" className="text-sm font-semibold text-gray-700 mb-2">
          Método de Pago
        </label>
        <select
          id="paymentMethod"
          value={order.paymentDetails.method}
          onChange={(e) =>
            setOrder({ ...order, paymentDetails: { ...order.paymentDetails, method: e.target.value as PaymentMethod } })
          }
          className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value={PaymentMethod.EFECTIVO}>EFECTIVO</option>
          <option value={PaymentMethod.TRANSFERENCIA}>TRANSFERENCIA</option>
        </select>
      </div>

      {/* Estado del Pedido */}
      <div className="md:col-span-2 mt-8">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Estado del Pedido</h2>
      </div>
      <div className="flex flex-col">
        <label htmlFor="orderStatus" className="text-sm font-semibold text-gray-700 mb-2">
          Estado del Pedido
        </label>
        <select
          id="orderStatus"
          value={order.orderStatus}
          onChange={(e) => setOrder({ ...order, orderStatus: e.target.value as OrderStatus })}
          className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value={OrderStatus.PENDIENTE}>Pendiente</option>
          <option value={OrderStatus.PROCESANDO}>Procesando</option>
          <option value={OrderStatus.ENTREGADO}>Entregado</option>
          <option value={OrderStatus.CANCELADO}>Cancelado</option>
        </select>
      </div>

      {/* Botón de envío */}
      <div className="md:col-span-2">
        <button
          type="submit"
          className="mt-6 w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Generar Pedido
        </button>
      </div>
    </form>
  );
}

export default OrderForm;
