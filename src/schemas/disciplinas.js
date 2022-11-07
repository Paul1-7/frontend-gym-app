import { msg, regex } from 'constants/validaciones';
import * as yup from 'yup';

const disciplinas = yup.object().shape({
  nombre: yup.string().matches(regex.alphaNumeric, msg.alphaNumeric).required(),
  salon: yup.string().matches(regex.alphaNumeric, msg.alphaNumeric).required(),
  descripcion: yup.string().matches(regex.alphaNumeric, msg.alphaNumeric).required(),
  estado: yup.string().required().matches(regex.number, msg.number).required(),
});

export default disciplinas;
