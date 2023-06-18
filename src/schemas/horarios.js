import { msg, regex } from '@/constants/validaciones';
import * as yup from 'yup';

const horarios = yup.object().shape({
  idSalon: yup.string().matches(regex.alphaNumeric, msg.alphaNumeric).required(),
  //   horarioEntrada: yup.string().matches(regex.alphaNumeric, msg.alphaNumeric).required(),
  //   horarioSalida: yup.string().matches(regex.alphaNumeric, msg.alphaNumeric).required(),
});

export default horarios;
