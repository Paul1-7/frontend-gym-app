export const subscriptionsListWithPartner = (data) => {
  return data.map((item) => ({
    ...item,
    plan: item.plan.nombre,
    socio: `${item.socio.nombre} ${item.socio.apellidoP}`,
    ci: item.socio.ci,
  }));
};
