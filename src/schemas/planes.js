import { msg, regex } from '@/constants/validaciones';
import * as yup from 'yup';

const planes = yup.object().shape({
  nombre: yup.string().matches(regex.alphaNumeric, msg.alphaNumeric).required(),
  precio: yup.number().required().typeError('el precio tiene que ser un número').min(1, 'el minimo es 1'),
  duracion: yup.number().typeError('la duración tiene que ser un número').min(1, 'el día mínimo es 1').required(),
  esExpandible: yup.string().matches(regex.number, msg.number).required(),
  estado: yup.string().required().matches(regex.number, msg.number).required(),
});

export default planes;
