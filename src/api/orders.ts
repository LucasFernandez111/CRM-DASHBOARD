import { AxiosResponse } from 'axios';
import { instance, BASE_URL } from './base.api';
import { ENDPOINTS } from './endpoints';
import { Order, CreateOrder, UpdateOrder } from './interfaces';
import axios from 'axios';

const getOrders = (): Promise<AxiosResponse<Order[]>> => instance.get(ENDPOINTS.ORDERS);

const createOrder = (order: CreateOrder): Promise<Order> => instance.post(ENDPOINTS.ORDERS, order);

const getPDFBill = (id: string) => (window.location.href = `${BASE_URL}/${ENDPOINTS.REPORTS}/bill/${id}`);

const getPDFSales = async () => {
  try {
    // Obtén el token desde el localStorage
    const token = localStorage.getItem('token'); // Asegúrate de que la clave coincide con la del almacenamiento

    if (!token) {
      throw new Error('No se encontró el token en el localStorage');
    }

    // Realiza la solicitud con Axios
    const response = await axios.get(`${BASE_URL}/${ENDPOINTS.REPORTS}/sales`, {
      responseType: 'blob', // Descarga como blob
      headers: {
        Authorization: `Bearer ${token}`, // Agrega el token en el encabezado
      },
    });

    // Convierte la respuesta en un blob y crea un enlace para descargarlo
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sales-report.pdf'; // Nombre del archivo
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    // Libera el objeto URL
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Error al descargar el archivo PDF:', error);
  }
};

const deleteOrder = (id: string) => instance.delete(`${ENDPOINTS.ORDERS}/${id}`);

const updateOrder = (id: string, order: UpdateOrder) => instance.put(`orders/${id}`, order);

const getOrdersForRange = (startDate: string, endDate: string): Promise<any> =>
  instance.get(`${ENDPOINTS.ORDERS_RANGE}?startDate=${startDate}&endDate=${endDate}`);

export const orders = {
  updateOrder,
  getOrders,
  getPDFOrders: getPDFBill,
  deleteOrder,
  getOrdersForRange,
  createOrder,
  getPDFSales,
};
