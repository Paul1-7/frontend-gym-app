import { ITEM_DEFAULT } from '@/constants';
import { msg, regex } from '@/constants/validaciones';
import * as yup from 'yup';

const disciplinas = yup.object().shape({
  nombre: yup.string().matches(regex.alphaNumeric, msg.alphaNumeric).required(),
  idCategoria: yup
    .string()
    .matches(regex.alphaNumeric, msg.alphaNumeric)
    .required()
    .test('categoria-test', 'Debe seleccionar otra opción', (value) => {
      return value !== ITEM_DEFAULT;
    }),
  descripcion: yup.string().matches(regex.alphaNumeric, msg.alphaNumeric).required(),
  estado: yup.string().required().matches(regex.number, msg.number).required(),
});

export default disciplinas;
