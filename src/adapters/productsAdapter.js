import { parseISO } from 'date-fns';

export const productWithDateParse = (data) => {
  return {
    ...data,
    fechaVencimiento: parseISO(data.fechaVencimiento),
  };
};
