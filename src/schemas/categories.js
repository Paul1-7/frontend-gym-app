import { msg, regex } from '@/constants/validaciones';
import * as yup from 'yup';

const categories = yup.object().shape({
  nombre: yup.string().matches(regex.alphaNumeric, msg.alphaNumeric).required(),
});

export default categories;
