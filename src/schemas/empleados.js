import { msg, regex } from '@/constants/validaciones';
import * as yup from 'yup';

const empleados = yup.object().shape({
  ci: yup
    .string()
    .matches(regex.alphaNumeric, msg.alphaNumeric)
    .max(10, 'no se permite mas de 10 caracteres')
    .required(),
  nombre: yup.string().matches(regex.alphaNumeric, msg.alphaNumeric).required(),
  apellidoM: yup.string().matches(regex.alphaNumeric, msg.alphaNumeric),
  apellidoP: yup.string().matches(regex.alphaNumeric, msg.alphaNumeric),
  edad: yup.string().matches(regex.number, msg.number).required(),
  celular: yup.string().matches(regex.number, msg.number).required().max(8, 'No puede ser mas de 8 digitos'),
  direccion: yup.string().matches(regex.alphaNumeric, msg.alphaNumeric).required(),
  estado: yup.string().required().matches(regex.number, msg.number).required(),
  usuario: yup.string().matches(regex.alphaNumeric, msg.alphaNumeric).required(),
  password: yup.string().required(),
  repetirPassword: yup.string().oneOf([yup.ref('password'), null], 'Las constraseñas no coinciden'),
  roles: yup.array().of(yup.string()).required().min(1, 'tiene que seleccionar un rol'),
});

export default empleados;
