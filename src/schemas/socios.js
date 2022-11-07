import { msg, regex } from 'constants/validaciones';
import * as yup from 'yup';

const inscripcion = yup.object().shape({
  idDisciplina: yup.string().matches(regex.alphaNumeric, msg.alphaNumeric).required(),
  fechaInicio: yup.date().required(),
  planPago: yup.string().matches(regex.alphaNumeric, msg.alphaNumeric).required(),
  montoInscri: yup.string().matches(regex.number, msg.number).required(),
});

const socios = yup.object().shape({
  ci: yup.string().matches(regex.number, msg.number).required(),
  nombre: yup.string().matches(regex.alphaNumeric, msg.alphaNumeric).required(),
  apellidoM: yup.string().matches(regex.alphaNumeric, msg.alphaNumeric).required(),
  apellidoP: yup.string().matches(regex.alphaNumeric, msg.alphaNumeric).required(),
  edad: yup.string().matches(regex.number, msg.number).required(),
  celular: yup.string().matches(regex.number, msg.number).required(),
  direccion: yup.string().matches(regex.alphaNumeric, msg.alphaNumeric).required(),
  estado: yup.string().required().matches(regex.number, msg.number).required(),
  inscripcion: yup.array().of(inscripcion).required(),
});

export default socios;
