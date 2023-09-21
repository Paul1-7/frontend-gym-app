import { ITEM_DEFAULT } from '@/constants';
import * as yup from 'yup';

const planning = yup.object().shape({
  idEntrenador: yup.object().test('idPlan-test', 'Debe seleccionar otra opción', (value) => value.id !== ITEM_DEFAULT),
  capacidad: yup.number().required(),
  cupoDisponible: yup.number().required(),
  idHorario: yup.string().test('idHorario-test', 'Debe seleccionar otra opción', (value) => value !== ITEM_DEFAULT),
  idDisciplina: yup
    .string()
    .test('idDisciplina-test', 'Debe seleccionar otra opción', (value) => value !== ITEM_DEFAULT),
  dia: yup.string().test('idDisciplina-test', 'Debe seleccionar otra opción', (value) => value !== ITEM_DEFAULT),
  idSocio: yup
    .array()
    .of(yup.object())
    .test('idSocio-test', 'Debe seleccionar otra opción', (value) => {
      return value.every((item) => item.id !== ITEM_DEFAULT);
    }),
});

export default planning;
