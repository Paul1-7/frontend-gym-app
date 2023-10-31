import { getBOBCurrency, getDateLocale } from '@/utils';

export const getSalesListWithPersonName = (data) => {
  return data.map((item) => {
    const { nombre, apellidoP, ci } = item.socio ?? {};
    const socio = !nombre ? 'N/A' : `${nombre} ${apellidoP}`;

    return {
      ...item,
      socio,
      ci: ci ? ci : 'N/A',
      vendedor: ` ${item.vendedor.nombre} ${item.vendedor.apellidoP}`,
    };
  });
};

export const getSalesToReport = (sales) => {
  return sales.map((sale, index) => {
    const { codVenta, socio, vendedor, total, fecha } = sale ?? {};
    const cliente = !socio ? 'N/A' : `${socio.nombre} ${socio.apellidoP}`;

    return {
      index: index + 1,
      codVenta,
      cliente,
      vendedor: `${vendedor.nombre} ${vendedor.apellidoP}`,
      total: getBOBCurrency(total),
      fecha: getDateLocale(fecha),
    };
  });
};
