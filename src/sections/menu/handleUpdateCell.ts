import axios from "axios";

export const handleUpdateRow = async (range: string, value: string) => {
  try {
    const response = await axios.post("sheets/update/cell", {
      range,
      value,
    });
    return response;
  } catch (error) {
    throw new Error("Error al actualizar la celda");
  }
};
