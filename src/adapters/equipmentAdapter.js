import { getBOBCurrency, getDateLocale } from '@/utils';
import { parseISO } from 'date-fns';

export const equipmentWithDateParse = (data) => {
  return {
    ...data,
    fechaAdquisicion: parseISO(data.fechaAdquisicion),
  };
};

export const getEquipmentsToReport = (equipments) => {
  return equipments.map((sale, index) => {
    const { codMaquinaria, nombre, marca, modelo, fechaAdquisicion, capacidad, precio, estado } = sale;

    return {
      index: index + 1,
      codMaquinaria,
      nombre,
      marca,
      modelo,
      fechaAdquisicion: getDateLocale(fechaAdquisicion),
      capacidad,
      precio: getBOBCurrency(precio),
      estado,
    };
  });
};
