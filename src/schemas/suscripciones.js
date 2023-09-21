import { ITEM_DEFAULT } from '@/constants';
import { msg, regex } from '@/constants/validaciones';
import * as yup from 'yup';

const suscripciones = yup.object().shape({
  idPlan: yup
    .string()
    .matches(regex.alphaNumeric, msg.alphaNumeric)
    .test('idPlan-test', 'Debe seleccionar otra opción', (value) => value.id !== ITEM_DEFAULT),
  idSocio: yup.object().required(),
  cantidad: yup.number().min(1, 'la cantidad debe ser mayor a 0').typeError('debe ser un numero').required(),
  precio: yup.string().matches(regex.float, msg.float),
  fechaInicio: yup.date().typeError('la fecha es incorrecta'),
  fechaFin: yup.date().typeError('la fecha es incorrecta'),
});

export default suscripciones;
