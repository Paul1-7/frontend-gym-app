import { msg, regex } from '@/constants/validaciones';
import { add } from 'date-fns';
import * as yup from 'yup';

const planes = yup.object().shape({
  nombre: yup.string().matches(regex.alphaNumeric, msg.alphaNumeric).required(),
  precio: yup.number().required().typeError('el precio tiene que ser un número').min(1, 'el minimo es 1'),
  duracion: yup.number().typeError('la duración tiene que ser un número').min(1, 'el día mínimo es 1').required(),
  esRecurrente: yup.string().matches(regex.number, msg.number).required(),
  fechaVencimiento: yup
    .date()
    .min(
      add(new Date(), { days: 2 }),
      'la fecha de vencimiento como mínimo tiene que ser 2 dias posteriories a la fecha actual'
    )
    .typeError('La fecha es incorrecta')
    .required(),
  estado: yup.string().required().matches(regex.number, msg.number).required(),
});

export default planes;
