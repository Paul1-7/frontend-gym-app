import { getBOBCurrency, getDateLocale } from '@/utils';
import { parseISO } from 'date-fns';

export const equipmentWithDateParse = (data) => {
  return {
    ...data,
    idCategoria: data.categorias.map(({ id }) => id),
    fechaAdquisicion: parseISO(data.fechaAdquisicion),
  };
};

export const getEquipmentsAdapter = (items) => {
  return items.map((item) => ({
    ...item,
    categorias: item.categorias.map(({ nombre }) => nombre),
  }));
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
