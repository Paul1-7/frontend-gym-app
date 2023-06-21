export const getPartnerListWithFullName = (data) => {
  return data.map((item) => ({
    id: item.id,
    nombre: `${item.nombre} ${item.apellidoP} - ${item.ci}`,
  }));
};
