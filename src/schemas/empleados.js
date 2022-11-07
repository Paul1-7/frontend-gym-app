import { msg, regex } from 'constants/validaciones';
import * as yup from 'yup';

const horarios = yup.object().shape({
  idDisciplina: yup.string().matches(regex.alphaNumeric, msg.alphaNumeric).required(),
  horarioEntrada: yup.string().matches(regex.alphaNumeric, msg.alphaNumeric).required(),
  horarioSalida: yup.string().matches(regex.alphaNumeric, msg.alphaNumeric).required(),
});

const empleados = yup.object().shape({
  ci: yup.string().matches(regex.alphaNumeric, msg.alphaNumeric).required(),
  nombre: yup.string().matches(regex.alphaNumeric, msg.alphaNumeric).required(),
  apellidoM: yup.string().matches(regex.alphaNumeric, msg.alphaNumeric).required(),
  apellidoP: yup.string().matches(regex.alphaNumeric, msg.alphaNumeric).required(),
  edad: yup.string().matches(regex.number, msg.number).required(),
  celular: yup.string().matches(regex.number, msg.number).required(),
  direccion: yup.string().matches(regex.alphaNumeric, msg.alphaNumeric).required(),
  estado: yup.string().required().matches(regex.number, msg.number).required(),
  usuario: yup.string().matches(regex.alphaNumeric, msg.alphaNumeric).required(),
  password: yup.string().required(),
  repetirPassword: yup.string().oneOf([yup.ref('password'), null], 'Las constraseñas no coinciden'),
  horarios: yup.array().of(horarios).required(),
  roles: yup.array().required(),
});

export default empleados;
