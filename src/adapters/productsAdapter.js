import { getDateLocale } from '@/utils';
import { parseISO } from 'date-fns';

export const productWithDateParse = (data) => {
  return {
    ...data,
    fechaVencimiento: parseISO(data.fechaVencimiento),
  };
};

export const getProductsAdapter = (items) => {
  return items.map((item) => ({
    ...item,
    categoria: item.categoria.nombre,
  }));
};

export const getProductsToReport = (products) => {
  return products.map((product, index) => {
    const { fechaVencimiento, nombre, precioCompra, precioVenta, stock } = product;

    return {
      index: index + 1,
      nombre,
      precioCompra,
      precioVenta,
      stock,
      fechaVencimiento: fechaVencimiento ? getDateLocale(fechaVencimiento) : 'N/A',
    };
  });
};
