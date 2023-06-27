import { msg, regex } from '@/constants/validaciones';
import * as yup from 'yup';

const horarios = yup.object().shape({
  idSalon: yup
    .string()
    .matches(regex.alphaNumeric, msg.alphaNumeric)
    .required()
    .test('idSalon', 'Tiene que seleccionar una opción', (value) => value !== '0'),
  idEntrenador: yup
    .string()
    .matches(regex.alphaNumeric, msg.alphaNumeric)
    .required()
    .test('idEntrenador', 'Tiene que seleccionar una opción', (value) => value !== '0'),
  idDisciplina: yup
    .string()
    .matches(regex.alphaNumeric, msg.alphaNumeric)
    .required()
    .test('idDisciplina', 'Tiene que seleccionar una opción', (value) => value !== '0'),
});

export default horarios;
