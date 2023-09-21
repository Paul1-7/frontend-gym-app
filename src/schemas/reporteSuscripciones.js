import { ITEM_DEFAULT } from '@/constants';
import { msg, regex } from '@/constants/validaciones';
import * as yup from 'yup';

const reporteSuscripciones = yup.object().shape({
  tipo: yup
    .string()
    .matches(regex.number, msg.number)
    .required()
    .test('tipo', 'Tiene que seleccionar una opción', (value) => value !== ITEM_DEFAULT),
  esRango: yup.string().matches(regex.number, msg.number).required(),
  fechaInicio: yup.date().required().typeError('La fecha es incorrecta'),
  fechaFin: yup
    .date()
    .required()
    .min(yup.ref('fechaInicio'), 'no puede empezar antes la fecha final')
    .when('fechaInicio', (fechaInicio, schema) => {
      if (fechaInicio != null) {
        return schema.min(fechaInicio, 'la fecha final tiene que ser mayor  que la de inicio');
      }
      return schema.min(new Date());
    }),
});

export default reporteSuscripciones;
