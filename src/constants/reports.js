import { add } from 'date-fns';

const dateEnd = new Date();

export const REPORT_FREQUENCY_OPTIONS = [
  {
    id: '1',
    name: 'Diaria',
    dateStart: add(new Date(), { days: -1 }),
    dateEnd,
  },
  {
    id: '2',
    name: 'Semanal',
    dateStart: add(new Date(), { days: -7 }),
    dateEnd,
  },
  {
    id: '3',
    name: 'Mensual',
    dateStart: add(new Date(), { days: -30 }),
    dateEnd,
  },
  {
    id: '4',
    name: 'Anual',
    dateStart: add(new Date(), { days: -365 }),
    dateEnd,
  },
  {
    id: '5',
    name: 'Rango de fechas',
    dateStart: null,
    dateEnd: null,
  },
];

export const SALES_REPORT_SORT_OPTIONS = [
  { id: '1', name: 'Fecha de venta' },
  { id: '2', name: 'Total' },
  { id: '3', name: 'nombre de cliente' },
  { id: '4', name: 'nombre del empleado' },
];

export const COLUMNS_SALES_REPORT = [
  { displayName: 'N°', id: 'index' },
  { displayName: 'Código de venta', id: 'codVenta' },
  { displayName: 'Cliente', id: 'cliente' },
  { displayName: 'Vendedor', id: 'vendedor' },
  { displayName: 'Total (Bs)', id: 'total' },
  { displayName: 'Fecha de venta', id: 'fecha' },
];
