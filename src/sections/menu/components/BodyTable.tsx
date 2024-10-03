import React, { useState, useEffect } from "react";
import { axiosCustom } from "../../../api/axios";
import { toast } from "sonner";
import { BodyTableProps } from "../../../common/interfaces/body-table.interface";

const BodyTable: React.FC<BodyTableProps> = ({
  orders,
  onEditRow,
  setOnEditRow,
}) => {
  // Estado para almacenar los datos editados temporalmente
  const [editedData, setEditedData] = useState<string[][]>([]);

  useEffect(() => {
    if (orders && orders.length > 0) {
      setEditedData(orders);
    }
  }, [orders]);

  // Función para manejar los cambios en las celdas editadas
  const handleInputChange = (
    value: string,
    rowIndex: number,
    cellIndex: number
  ) => {
    if (!editedData[rowIndex]) return; // Previene el acceso a un índice que no existe
    const newData = [...editedData];
    newData[rowIndex][cellIndex] = value;
    setEditedData(newData);
  };

  // Función para manejar la acción de guardar los datos editados
  const handleSave = async (rowIndex: number) => {
    const range = `A${rowIndex + 2}:D${rowIndex + 2}`;

    const values = editedData[rowIndex];

    const promise = axiosCustom.put("/user/sheet", {
      range,
      values,
    });
    setOnEditRow(0);
    return toast.promise(promise, {
      loading: "Cargando...",
      success: "Datos actualizados exitosamente",
      error: "Error",
    });
  };

  return (
    <tbody>
      {editedData.length > 0 &&
        editedData.map((order, rowIndex) => (
          <tr
            key={rowIndex}
            className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
          >
            {order &&
              order.map((cell, cellIndex) => (
                <th
                  key={cellIndex}
                  scope="row"
                  className=" py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {onEditRow === rowIndex ? (
                    <input
                      type="text"
                      value={cell}
                      onChange={(e) =>
                        handleInputChange(e.target.value, rowIndex, cellIndex)
                      }
                      className="p-2 border-none focus:outline-none bg-transparent text-center"
                    />
                  ) : (
                    cell
                  )}
                </th>
              ))}
            <td className="px-2 py-4">
              <button
                className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                onClick={() =>
                  onEditRow === rowIndex
                    ? handleSave(rowIndex)
                    : setOnEditRow(rowIndex)
                }
              >
                {onEditRow === rowIndex ? "Guardar" : "Editar"}
              </button>
            </td>
          </tr>
        ))}
    </tbody>
  );
};

export default BodyTable;
