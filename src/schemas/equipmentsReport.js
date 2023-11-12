import { ITEM_DEFAULT, msg, regex } from '@/constants';
import * as yup from 'yup';

const equipmentsReport = yup.object().shape({
  options: yup.object().shape({
    criterio: yup
      .string()
      .matches(regex.alphaNumeric, msg.alphaNumeric)
      .test('noDefaultValue', 'Tiene que seleccionar una opción', (value) => value !== ITEM_DEFAULT),
    orderBy: yup
      .string()
      .matches(regex.alphaNumeric, msg.alphaNumeric)
      .test('noDefaultValue', 'Tiene que seleccionar una opción', (value) => value !== ITEM_DEFAULT),
  }),
  idCategoria: yup
    .string()
    .matches(regex.alphaNumeric, msg.alphaNumeric)
    .test('noDefaultValue', 'Tiene que seleccionar una opción', (value) => value !== ITEM_DEFAULT),
});

export default equipmentsReport;
