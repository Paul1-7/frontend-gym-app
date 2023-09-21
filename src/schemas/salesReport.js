import { ITEM_DEFAULT, msg, regex } from '@/constants';
import * as yup from 'yup';

const salesReport = yup.object().shape({
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
  dateStart: yup.date(),
  dateEnd: yup.date(),
});

export default salesReport;