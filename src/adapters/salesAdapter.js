export const getSalesListWithPersonName = (data) => {
  return data.map((item) => ({
    ...item,
    socio: ` ${item.socio.nombre} ${item.socio.apellidoP}`,
    ci: item.socio.ci,
    vendedor: ` ${item.vendedor.nombre} ${item.vendedor.apellidoP}`,
  }));
};
