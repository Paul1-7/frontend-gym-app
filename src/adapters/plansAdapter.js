import { toISOStringWithoutTZ } from '@/utils';

export const getPlanToModify = (data) => {
  const { fechaVencimiento } = data;
  const parsedDate = !fechaVencimiento ? new Date().toISOString() : fechaVencimiento;

  return {
    ...data,
    fechaVencimiento: new Date(toISOStringWithoutTZ(parsedDate)),
  };
};

export const getPlansAdapter = (items) => {
  return items.map((item) => ({
    ...item,
    fechaVencimiento: toISOStringWithoutTZ(item.fechaVencimiento),
  }));
};
