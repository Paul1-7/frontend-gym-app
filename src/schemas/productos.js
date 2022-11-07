import { msg, regex } from 'constants/validaciones';
import * as yup from 'yup';

const productos = yup.object().shape({
  nombre: yup.string().matches(regex.alphaNumeric, msg.alphaNumeric).required(),
  stock: yup.string().matches(regex.number, msg.number).required(),
  precioCompra: yup.string().matches(regex.float, msg.float).required(),
  precioVenta: yup.string().matches(regex.float, msg.float).required(),
  fechaVencimiento: yup.date().typeError('fecha incorrecta').required(),
});

export default productos;
