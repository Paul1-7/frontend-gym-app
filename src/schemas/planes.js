import { msg, regex } from 'constants/validaciones';
import * as yup from 'yup';

const planes = yup.object().shape({
  nombre: yup.string().matches(regex.alphaNumeric, msg.alphaNumeric).required(),
  precio: yup.string().matches(regex.float, msg.float).required(),
  duracion: yup.string().matches(regex.number, msg.number).required(),
  esExpandible: yup.string().matches(regex.number, msg.number).required(),
  estado: yup.string().required().matches(regex.number, msg.number).required(),
});

export default planes;
