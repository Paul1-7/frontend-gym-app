import { msg, regex } from '@/constants/validaciones';
import * as yup from 'yup';

const salones = yup.object().shape({
  nombre: yup.string().matches(regex.alphaNumeric, msg.alphaNumeric).required(),
  capacidad: yup.number().required().min(5, 'la cantidad mínima es 5').typeError('solo se permiten números'),
  estado: yup.string().required().matches(regex.number, msg.number).required(),
});

export default salones;
