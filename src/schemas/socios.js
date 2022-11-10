import { msg, regex } from 'constants/validaciones';
import * as yup from 'yup';

const socios = yup.object().shape({
  ci: yup.string().matches(regex.number, msg.number).required(),
  nombre: yup.string().matches(regex.alphaNumeric, msg.alphaNumeric).required(),
  apellidoM: yup.string().matches(regex.alphaNumeric, msg.alphaNumeric).required(),
  apellidoP: yup.string().matches(regex.alphaNumeric, msg.alphaNumeric).required(),
  edad: yup.string().matches(regex.number, msg.number).required(),
  celular: yup.string().matches(regex.number, msg.number).required(),
  direccion: yup.string().matches(regex.alphaNumeric, msg.alphaNumeric).required(),
  estado: yup.string().required().matches(regex.number, msg.number).required(),
  idPlan: yup.string().matches(regex.alphaNumeric, msg.alphaNumeric),
  cantidad: yup.string().matches(regex.number, msg.number),
  precio: yup.string().matches(regex.float, msg.float),
  fechaInicio: yup.date().typeError('la fecha es incorrecta'),
  fechaFin: yup.date().typeError('la fecha es incorrecta'),
});

export default socios;
