import { add } from 'date-fns';

const dateEnd = new Date().toISOString();

export const REPORT_FREQUENCY_OPTIONS = [
  {
    id: '1',
    name: 'Diaria',
    dateStart: add(new Date(), { days: -1 }).toISOString(),
    dateEnd,
  },
  {
    id: '2',
    name: 'Semanal',
    dateStart: add(new Date(), { days: -7 }).toISOString(),
    dateEnd,
  },
  {
    id: '3',
    name: 'Mensual',
    dateStart: add(new Date(), { days: -30 }).toISOString(),
    dateEnd,
  },
  {
    id: '4',
    name: 'Anual',
    dateStart: add(new Date(), { days: -365 }).toISOString(),
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

export const EQUIPMENT_REPORT_SORT_OPTIONS = [
  { id: '1', name: 'Nombre' },
  { id: '2', name: 'Marca' },
  { id: '3', name: 'Modelo' },
  { id: '4', name: 'Fecha de adquisición' },
  { id: '5', name: 'Precio' },
  { id: '6', name: 'Estado' },
];
export const PRODUCT_REPORT_SORT_OPTIONS = [
  { id: '1', name: 'Nombre' },
  { id: '2', name: 'Precio venta' },
  { id: '3', name: 'Precio compra' },
  { id: '4', name: 'Fecha de vencimiento' },
  { id: '5', name: 'Stock' },
];

export const COLUMNS_SALES_REPORT = [
  { displayName: 'N°', id: 'index' },
  { displayName: 'Código de venta', id: 'codVenta' },
  { displayName: 'Cliente', id: 'cliente' },
  { displayName: 'Vendedor', id: 'vendedor' },
  { displayName: 'Total (Bs)', id: 'total' },
  { displayName: 'Fecha de venta', id: 'fecha' },
];

export const COLUMNS_EQUIPMENT_REPORT = [
  { displayName: 'N°', id: 'index' },
  { displayName: 'Código de maquinaria', id: 'codMaquinaria' },
  { displayName: 'Nombre', id: 'nombre' },
  { displayName: 'Marca', id: 'marca' },
  { displayName: 'Modelo', id: 'modelo' },
  { displayName: 'Fecha de adquisición', id: 'fechaAdquisicion' },
  { displayName: 'Capacidad (kg)', id: 'capacidad' },
  { displayName: 'Precio', id: 'precio' },
  { displayName: 'Estado', id: 'estado' },
];

export const COLUMNS_SUBSCRIPTIONS_ALL_REPORT = [
  { displayName: 'N°', id: 'index' },
  { displayName: 'Socio', id: 'socio' },
  { displayName: 'Nombre', id: 'nombre' },
  { displayName: 'Marca', id: 'marca' },
  { displayName: 'Modelo', id: 'modelo' },
  { displayName: 'Fecha de adquisición', id: 'fechaAdquisicion' },
  { displayName: 'Capacidad (kg)', id: 'capacidad' },
  { displayName: 'Precio', id: 'precio' },
  { displayName: 'Estado', id: 'estado' },
];

export const COLUMNS_PRODUCT_REPORT = [
  { displayName: 'N°', id: 'index' },
  { displayName: 'Nombre', id: 'nombre' },
  { displayName: 'Precio de compra(Bs)', id: 'precioCompra' },
  { displayName: 'Precio de venta (Bs)', id: 'precioVenta' },
  { displayName: 'Stock', id: 'stock' },
  { displayName: 'Fecha de vencimiento', id: 'fechaVencimiento' },
];

export const EQUIPMENT_REPORT_CRITERIA_OPTIONS = [
  { id: '1', name: 'Todos los registros' },
  { id: '2', name: 'Solo máquinas operativas' },
  { id: '3', name: 'Solo máquinas en reparación' },
  { id: '4', name: 'Solo máquinas fuera de servicio ' },
];

export const PRODUCT_REPORT_CRITERIA_OPTIONS = [
  { id: '1', name: 'Todos los registros' },
  { id: '2', name: 'Solo productos con vencimiento' },
  { id: '3', name: 'Solo productos sin vencimiento' },
];

export const SUBSCRIPTION_REPORT_CRITERIA_OPTIONS = [
  { id: '1', name: 'Todos los registros', colums: COLUMNS_SUBSCRIPTIONS_ALL_REPORT },
  { id: '2', name: 'Socios con mas suscripciones' },
  { id: '3', name: 'Planes mas contratados' },
  { id: '4', name: 'Suscripciones activas' },
];
