import { ITEM_DEFAULT } from '@/constants';
import { msg, regex } from '@/constants/validaciones';
import * as yup from 'yup';

const horarios = yup.object().shape({
  idSalon: yup
    .string()
    .matches(regex.alphaNumeric, msg.alphaNumeric)
    .required()
    .test('idSalon', 'Tiene que seleccionar una opción', (value) => value !== ITEM_DEFAULT),
  idEntrenador: yup
    .string()
    .matches(regex.alphaNumeric, msg.alphaNumeric)
    .required()
    .test('idEntrenador', 'Tiene que seleccionar una opción', (value) => value !== ITEM_DEFAULT),
  idDisciplina: yup
    .string()
    .matches(regex.alphaNumeric, msg.alphaNumeric)
    .required()
    .test('idDisciplina', 'Tiene que seleccionar una opción', (value) => value !== ITEM_DEFAULT),
});

export default horarios;
