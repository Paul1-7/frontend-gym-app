import { ITEM_DEFAULT } from '@/constants';
import { msg, regex } from '@/constants/validaciones';
import * as yup from 'yup';

const disciplinas = yup.object().shape({
  nombre: yup.string().matches(regex.alphaNumeric, msg.alphaNumeric).required(),
  descripcion: yup.string().matches(regex.alphaNumeric, msg.alphaNumeric).required(),
  estado: yup.string().required().matches(regex.number, msg.number).required(),
  idCategoria: yup
    .string()
    .matches(regex.alphaNumeric, msg.alphaNumeric)
    .test('noDefaultValue', 'Tiene que seleccionar una opción', (value) => value !== ITEM_DEFAULT),
});

export default disciplinas;
