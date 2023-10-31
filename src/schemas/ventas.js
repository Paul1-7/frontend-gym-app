import { msg, regex } from '@/constants/validaciones';
import * as yup from 'yup';

const products = yup.object().shape({
  id: yup.string().matches(regex.alphaNumeric, msg.alphaNumeric).required(),
  cantidad: yup.number().required().typeError('solo se permiten números'),
});

const sells = yup.object().shape({
  fecha: yup.string().required(),
  idSocio: yup.object(),
  idVendedor: yup.string(),
  productos: yup.array().of(products).required().min(1),
});

export default sells;
