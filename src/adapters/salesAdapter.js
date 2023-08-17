import { getBOBCurrency, getDateLocale } from '@/utils';

export const getSalesListWithPersonName = (data) => {
  return data.map((item) => ({
    ...item,
    socio: ` ${item.socio.nombre} ${item.socio.apellidoP}`,
    ci: item.socio.ci,
    vendedor: ` ${item.vendedor.nombre} ${item.vendedor.apellidoP}`,
  }));
};

export const getSalesToReport = (sales) => {
  return sales.map((sale, index) => {
    const { codVenta, socio, vendedor, total, fecha } = sale;

    return {
      index: index + 1,
      codVenta,
      cliente: `${socio.nombre} ${socio.apellidoP}`,
      vendedor: `${vendedor.nombre} ${vendedor.apellidoP}`,
      total: getBOBCurrency(total),
      fecha: getDateLocale(fecha),
    };
  });
};
