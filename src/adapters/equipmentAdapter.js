import { parseISO } from 'date-fns';

export const equipmentWithDateParse = (data) => {
  return {
    ...data,
    fechaAdquisicion: parseISO(data.fechaAdquisicion),
  };
};
