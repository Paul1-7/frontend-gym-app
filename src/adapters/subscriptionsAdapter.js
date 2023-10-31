import { parseISO } from 'date-fns';

export const subscriptionsListWithPartner = (data) => {
  return data.map((item) => ({
    ...item,
    plan: item.plan.nombre,
    socio: `${item.socio.nombre} ${item.socio.apellidoP}`,
    ci: item.socio.ci,
  }));
};

export const getSubscriptionToModify = (data) => {
  const { id, nombre, apellidoP, ci } = data.socio;
  return {
    ...data,
    fechaInicio: parseISO(data.fechaInicio),
    fechaFin: parseISO(data.fechaFin),
    idSocio: { id, nombre: `${nombre} ${apellidoP} - ${ci}` },
  };
};
