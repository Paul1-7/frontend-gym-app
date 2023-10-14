import { ITEM_DEFAULT } from '@/constants';
import { msg, regex } from '@/constants/validaciones';
import * as yup from 'yup';

const salones = yup.object().shape({
  nombre: yup.string().matches(regex.alphaNumeric, msg.alphaNumeric).required(),
  capacidad: yup.number().required().min(5, 'la cantidad mínima es 5').typeError('solo se permiten números'),
  planta: yup.string().test('idHorario-test', 'Debe seleccionar otra opción', (value) => value !== ITEM_DEFAULT),
  estado: yup.string().required().matches(regex.number, msg.number).required(),
});

export default salones;
