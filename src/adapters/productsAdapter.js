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
    const { fechaVencimiento } = product;

    return {
      index: index + 1,
      ...product,
      fechaVencimiento: fechaVencimiento ? getDateLocale(fechaVencimiento) : 'N/A',
      categoria: product.categoria.nombre,
    };
  });
};

export const getProductsMostPopularAdapter = (products) => {
  return products.map((product, index) => {
    return {
      index: index + 1,
      ...product,
      categoria: product.categoria.nombre,
    };
  });
};
