import { ITEM_DEFAULT } from '@/constants';
import compare from 'just-compare';
import * as yup from 'yup';

const planning = yup.object().shape({
  idEntrenador: yup.object().test('idPlan-test', 'Debe seleccionar otra opción', (value) => value.id !== ITEM_DEFAULT),
  capacidad: yup.number().required(),
  cupoDisponible: yup
    .number()
    .required()
    .test('cupoDisponibleTest', 'El cupo no puede exceder la capacidad', (value) => Number(value) >= 0),
  idHorario: yup.string().test('idHorario-test', 'Debe seleccionar otra opción', (value) => value !== ITEM_DEFAULT),
  idDisciplina: yup
    .string()
    .test('idDisciplina-test', 'Debe seleccionar otra opción', (value) => value !== ITEM_DEFAULT),
  dia: yup.string().test('idDisciplina-test', 'Debe seleccionar otra opción', (value) => value !== ITEM_DEFAULT),
  fecha: yup.date(),
  hora: yup.string(),
  idSocio: yup
    .array()
    .of(yup.object())

    .when('idEntrenador', {
      is: (idEntrenador) => !compare(idEntrenador, { nombre: 'Ninguno', id: ITEM_DEFAULT }),
      then: () => {
        return yup
          .array()
          .of(yup.object())
          .test('entrenador-test', 'No puede agregar al entrenador como participante', function (value) {
            const idEntrenador = this.parent.idEntrenador;
            return value.every((item) => item.id !== idEntrenador.id);
          })
          .test('idSocio-test', 'No se permite la opción ninguno', (value) => {
            return value.every((item) => item.id !== ITEM_DEFAULT);
          });
      },
    }),
});

export default planning;
