import { format } from 'date-fns';

export const schedulesListToDetail = (data) =>
  data.map((item) => {
    const { entrenador, disciplina, salon } = item;
    return {
      ...item,
      entrenador: entrenador.nombre + ' ' + entrenador.apellidoP,
      disciplina: disciplina.nombre,
      salon: salon.nombre,
    };
  });

export const schedulesListItems = (data) =>
  data.map(({ horarioEntrada, horarioSalida, id, ...others }) => {
    return {
      id,
      nombre: `${format(new Date(horarioEntrada), 'HH:mm')} - ${format(new Date(horarioSalida), 'HH:mm')}`,
      horarioEntrada,
      horarioSalida,
      ...others,
    };
  });
