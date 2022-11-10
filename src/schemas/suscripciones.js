import { msg, regex } from 'constants/validaciones';
import * as yup from 'yup';

const suscripciones = yup.object().shape({
  idPlan: yup.string().matches(regex.alphaNumeric, msg.alphaNumeric),
  idSocio: yup.object().required(),
  cantidad: yup.string().matches(regex.number, msg.number),
  precio: yup.string().matches(regex.float, msg.float),
  fechaInicio: yup.date().typeError('la fecha es incorrecta'),
  fechaFin: yup.date().typeError('la fecha es incorrecta'),
});

export default suscripciones;
