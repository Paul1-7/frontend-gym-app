import { msg, regex } from '@/constants/validaciones';
import * as yup from 'yup';

const categories = yup.object().shape({
  nombre: yup.string().matches(regex.alphaNumeric, msg.alphaNumeric).required(),
  tipo: yup
    .string()
    .matches(regex.alphaNumeric, msg.alphaNumeric)
    .required()
    .test('tipo-test', 'Debe seleccionar otra opción', (value) => {
      return value !== '0';
    }),
});

export default categories;
