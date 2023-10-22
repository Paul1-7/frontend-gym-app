import { ITEM_DEFAULT } from '@/constants';
import { msg, regex } from '@/constants/validaciones';
import { daysElapsedFromNow } from '@/utils';
import { add } from 'date-fns';
import * as yup from 'yup';

const suscripciones = yup.object().shape({
  idPlan: yup
    .string()
    .matches(regex.alphaNumeric, msg.alphaNumeric)
    .test('idPlan-test', 'Debe seleccionar otra opción', (value) => value.id !== ITEM_DEFAULT),
  idSocio: yup.object().required(),
  cantidad: yup.number().min(1, 'la cantidad debe ser mayor a 0').typeError('debe ser un numero').required(),
  daysRemaining: yup.number().typeError('debe ser un numero'),
  precio: yup.string().matches(regex.float, msg.float),
  fechaInicio: yup
    .date()
    .typeError('la fecha es incorrecta')
    .when(['daysRemaining'], (daysRemaining, schema, fechaInicio) => {
      const minDate = add(new Date(), { day: daysRemaining });
      const differenceInDays = daysElapsedFromNow(fechaInicio.value, minDate);
      if (differenceInDays > 0) {
        return schema.min(minDate, `La fecha de inicio debe ser al menos ${differenceInDays} días después de hoy`);
      }
      return schema;
    }),
  fechaFin: yup.date().typeError('la fecha es incorrecta'),
});

export default suscripciones;
