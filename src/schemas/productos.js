import { ITEM_DEFAULT } from '@/constants';
import { msg, regex } from '@/constants/validaciones';
import * as yup from 'yup';

const productos = yup.object().shape({
  nombre: yup.string().matches(regex.alphaNumeric, msg.alphaNumeric).required(),
  idCategoria: yup
    .string()
    .matches(regex.alphaNumeric, msg.alphaNumeric)
    .required()
    .test('categoria-test', 'Debe seleccionar otra opción', (value) => {
      return value !== ITEM_DEFAULT;
    }),
  stock: yup.number().required().typeError('tiene que ser un número').min(1, 'el minimo es 1'),
  precioCompra: yup.number().typeError('El precio de compra debe ser un número').required(),
  precioVenta: yup
    .number()
    .typeError('El precio de venta debe ser un número')
    .required()
    .when('precioCompra', (precioCompra, schema) => {
      if (precioCompra) {
        return schema.moreThan(precioCompra, 'El precio de venta debe ser mayor al precio de compra');
      }
      return schema;
    }),
  fechaVencimiento: yup
    .date()
    .typeError('la fecha introducida es incorrecta')
    .min(new Date(), 'La fecha de vencimiento debe ser mayor que la fecha actual')
    .required(),
});

export default productos;
