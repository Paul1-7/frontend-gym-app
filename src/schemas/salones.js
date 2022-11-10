import { msg, regex } from 'constants/validaciones';
import * as yup from 'yup';

const salones = yup.object().shape({
  nombre: yup.string().matches(regex.alphaNumeric, msg.alphaNumeric).required(),
  capacidad: yup.string().matches(regex.number, msg.number).required(),
  estado: yup.string().required().matches(regex.number, msg.number).required(),
});

export default salones;
