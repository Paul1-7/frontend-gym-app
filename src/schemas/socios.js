import { ITEM_DEFAULT } from '@/constants';
import { msg, regex } from '@/constants/validaciones';
import * as yup from 'yup';

const socios = yup.object().shape({
  ci: yup
    .string()
    .matches(regex.alphaNumeric, msg.alphaNumeric)
    .max(10, 'no se permite mas de 10 caracteres')
    .required(),
  nombre: yup.string().matches(regex.alphaNumeric, msg.alphaNumeric).required(),
  apellidoM: yup.string().matches(regex.alphaNumeric, msg.alphaNumeric),
  apellidoP: yup.string().matches(regex.alphaNumeric, msg.alphaNumeric).required(),
  edad: yup.string().matches(regex.number, msg.number).required(),
  celular: yup.string().matches(regex.number, msg.number).required(),
  direccion: yup.string().matches(regex.alphaNumeric, msg.alphaNumeric).required(),
  estado: yup.string().required().matches(regex.number, msg.number).required(),
  idPlan: yup
    .string()
    .matches(regex.alphaNumeric, msg.alphaNumeric)
    .test('idPlan-test', 'Debe seleccionar otra opción', (value) => value?.id !== ITEM_DEFAULT),
  cantidad: yup
    .number()
    .when('idPlan', {
      is: (val) => val !== ITEM_DEFAULT && val !== undefined,
      then: () => yup.number().required('La cantidad es requerida').typeError('debe ser un numero'),
      otherwise: () => yup.number().typeError('debe ser un numero'),
    })
    .typeError('debe ser un numero'),
  precio: yup.string().matches(regex.float, msg.float),
  fechaInicio: yup.date().typeError('la fecha es incorrecta'),
  fechaFin: yup.date().typeError('la fecha es incorrecta'),
});

export default socios;
