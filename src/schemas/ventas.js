import { msg, regex } from '@/constants/validaciones';
import * as yup from 'yup';

const products = yup.object().shape({
  id: yup.string().matches(regex.alphaNumeric, msg.alphaNumeric).required(),
  cantidad: yup.string().matches(regex.number, msg.number).required(),
});

const sells = yup.object().shape({
  fecha: yup.string().required(),
  idSocio: yup.object().required(),
  idVendedor: yup.string().matches(regex.alphaNumeric, msg.alphaNumeric),
  productos: yup.array().of(products).required().min(1),
});

export default sells;
