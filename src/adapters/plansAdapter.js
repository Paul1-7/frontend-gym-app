import { toISOStringWithoutTZ } from '@/utils';

export const getPlanToModify = (data) => {
  return {
    ...data,
    fechaVencimiento: new Date(toISOStringWithoutTZ(data.fechaVencimiento)),
  };
};

export const getPlansAdapter = (items) => {
  return items.map((item) => ({
    ...item,
    fechaVencimiento: toISOStringWithoutTZ(item.fechaVencimiento),
  }));
};
