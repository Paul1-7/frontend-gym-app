import { ITEM_DEFAULT } from '@/constants';
import { msg, regex } from '@/constants/validaciones';
import * as yup from 'yup';

const categories = yup.object().shape({
  nombre: yup.string().matches(regex.alphaNumeric, msg.alphaNumeric).required(),
  tipo: yup
    .string()
    .matches(regex.alphaNumeric, msg.alphaNumeric)
    .required()
    .test('tipo-test', 'Debe seleccionar otra opción', (value) => {
      return value !== ITEM_DEFAULT;
    }),
  tipoLista: yup
    .array()
    .required()
    .of(yup.object())
    .test('idSocio-test', 'No se permite la opción ninguno', (value) => {
      return value.every((item) => item.id !== ITEM_DEFAULT);
    }),
});

export default categories;
