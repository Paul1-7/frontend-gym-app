import { DAYS_ITEMS } from '@/constants';
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
  data.map(({ horarioEntrada, horarioSalida, dia, salon, entrenador, disciplina, id }) => {
    const { nombre, apellidoP } = entrenador ?? {};

    const fullname =
      nombre && apellidoP ? `${nombre} ${apellidoP}` : 'La persona ya no desempeña el papel o rol de entrenador.';

    const { nombre: disciplineName } = disciplina;
    const fullName = fullname;
    const startTime = format(new Date(horarioEntrada), 'HH:mm');
    const finishTime = format(new Date(horarioSalida), 'HH:mm');
    const dayName = DAYS_ITEMS[dia];

    return {
      id,
      nombre: `${fullName}  -  ${disciplineName}  -  ${dayName} de ${startTime} a ${finishTime}`,
      horarioEntrada,
      salon,
    };
  });

export const schedulesListToReportAdapter = (data) =>
  data.map((item, idx) => {
    const { entrenador, disciplina, salon, dia, estado } = item;
    return {
      ...item,
      index: idx + 1,
      dia: DAYS_ITEMS[dia],
      entrenador: entrenador?.nombre + ' ' + entrenador?.apellidoP,
      disciplina: disciplina.nombre,
      salon: salon.nombre,
      estado: estado === 1 ? 'activo' : 'no activo',
    };
  });
