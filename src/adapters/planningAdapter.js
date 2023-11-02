import { DAYS_ITEMS } from '@/constants';
import { format } from 'date-fns';

export const getPlanningListAdapter = (data) => {
  return data.map((item) => {
    const { disciplina, entrenador, salon } = item.horario;
    return {
      ...item,
      fecha: new Date(item.fecha + 'T23:00:00-04:00'),
      salon: salon.nombre,
      entrenador: `${entrenador.nombre} ${entrenador.apellidoP}`,
      disciplina: disciplina.nombre,
    };
  });
};

export const getPlanningAdapter = (data) => {
  const { entrenador, disciplina, salon, id: idHorario, horarioEntrada, horarioSalida, dia } = data.horario;
  const { nombre, apellidoP } = entrenador;
  const { nombre: disciplineName } = disciplina;
  const fullName = `${nombre} ${apellidoP}`;
  const startTime = format(new Date(horarioEntrada), 'HH:mm');
  const finishTime = format(new Date(horarioSalida), 'HH:mm');
  const dayName = DAYS_ITEMS[dia];

  return {
    ...data,
    fecha: new Date(data.fecha + 'T23:00:00-04:00'),
    idHorario: {
      id: idHorario,
      nombre: `${fullName}  -  ${disciplineName}  -  ${dayName} de ${startTime} a ${finishTime}`,
      horarioEntrada,
      salon,
    },
    idSocio: data.detalle.map(({ socio }) => ({
      id: socio.id,
      nombre: `${socio.nombre} ${socio.apellidoP} - ${socio.ci}`,
    })),
  };
};
