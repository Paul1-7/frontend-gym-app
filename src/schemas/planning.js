import { ITEM_DEFAULT } from '@/constants';
import compare from 'just-compare';
import * as yup from 'yup';

const planning = yup.object().shape({
  id: yup.string().optional().nullable(),
  capacidad: yup.number().required(),
  cupoDisponible: yup
    .number()
    .required()
    .test('cupoDisponibleTest', 'El cupo no puede exceder la capacidad', (value) => Number(value) >= 0),
  idHorario: yup.object().test('idHorario-test', 'No se permite la opción ninguno', (value) => {
    return value?.id !== ITEM_DEFAULT;
  }),
  dia: yup.string().test('idDisciplina-test', 'Debe seleccionar otra opción', (value) => value !== ITEM_DEFAULT),
  fecha: yup.date(),
  hora: yup.string(),
  idSocio: yup
    .array()
    .of(yup.object())
    .when('idHorario', {
      is: (idHorario) =>
        !compare(idHorario, {
          nombre: 'Ninguno',
          id: ITEM_DEFAULT,
          horarioEntrada: new Date(),
          salon: { id: '', nombre: '', capacidad: '' },
        }),
      then: () => {
        return yup
          .array()
          .of(yup.object())
          .test('entrenador-test', 'No puede agregar al entrenador como participante', function (value) {
            const { idHorario } = this.parent;
            return value.every((item) => {
              const name = item.nombre.split('-', 1).toString().trim();
              return !idHorario?.nombre.includes(name);
            });
          })
          .test('idSocio-test', 'No se permite la opción ninguno', (value) => {
            return value.every((item) => item?.id !== ITEM_DEFAULT);
          })
          .min(1, 'TIene que seleccionar al menos un participante');
      },
    })
    .typeError('Tiene que seleccionar una opción'),
});

export default planning;
