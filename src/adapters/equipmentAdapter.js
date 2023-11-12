import { getDateLocale } from '@/utils';
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
  return equipments.map((equipment, index) => {
    const { fechaAdquisicion } = equipment;

    return {
      index: index + 1,
      ...equipment,
      fechaAdquisicion: getDateLocale(fechaAdquisicion),
      categoria: equipment.categorias.map(({ nombre }) => nombre).toString(),
    };
  });
};
