import {
  equipmentsListReport,
  getMostRequestedPlans,
  getProductsMostPopular,
  getSubscriptionsActives,
  listSalesByDates,
  partnerMoreBuyers,
  partnersWithLargerstSubscription,
  productsListReport,
  schedulesListReport,
  subscriptionsList,
} from '@/services';
import { add } from 'date-fns';

const dateEnd = new Date().toISOString();

export const REPORT_FREQUENCY_OPTIONS = [
  {
    id: '6',
    name: 'Todas las fechas',
    dateStart: null,
    dateEnd: null,
  },
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
  { displayLabel: 'N°', key: 'index' },
  { displayLabel: 'Código de venta', key: 'codVenta' },
  { displayLabel: 'Cliente', key: 'cliente' },
  { displayLabel: 'Vendedor', key: 'vendedor' },
  { displayLabel: 'Total (Bs)', key: 'total' },
  { displayLabel: 'Fecha de venta', key: 'fecha' },
];

export const COLUMNS_CUSTOMERS_MORE_BUYERS_REPORT = [
  { displayLabel: 'N°', key: 'index' },
  { displayLabel: 'Nombre', key: 'nombre' },
  { displayLabel: 'Apellido 1', key: 'apellidoP' },
  { displayLabel: 'Apellido 2', key: 'apellidoM' },
  { displayLabel: 'Total de compras', key: 'totalCompras' },
];

export const COLUMNS_PRODUCTS_MOST_POPULAR_REPORT = [
  { displayLabel: 'N°', key: 'index' },
  { displayLabel: 'Nombre', key: 'nombre' },
  { displayLabel: 'Categoria', key: 'categoria' },
  { displayLabel: 'Total de ventas', key: 'totalVentas' },
];

export const COLUMNS_EQUIPMENT_REPORT = [
  { displayLabel: 'N°', key: 'index' },
  { displayLabel: 'Código de maquinaria', key: 'codMaquinaria' },
  { displayLabel: 'Nombre', key: 'nombre' },
  { displayLabel: 'Marca', key: 'marca' },
  { displayLabel: 'Modelo', key: 'modelo' },
  { displayLabel: 'Fecha de adquisición', key: 'fechaAdquisicion' },
  { displayLabel: 'Capacidad (kg)', key: 'capacidad' },
  { displayLabel: 'Precio', key: 'precio' },
  { displayLabel: 'Categoria', key: 'categoria' },
  { displayLabel: 'Estado', key: 'estado' },
];

export const COLUMNS_SUBSCRIPTIONS_ALL_REPORT = [
  { displayLabel: 'N°', key: 'index' },
  { displayLabel: 'Socio', key: 'socio' },
  { displayLabel: 'C.I.', key: 'ci' },
  { displayLabel: 'Fecha de inicio', key: 'fechaInicio' },
  { displayLabel: 'Fecha fin', key: 'fechaFin' },
  { displayLabel: 'Plan', key: 'plan' },
  { displayLabel: 'Cantidad', key: 'cantidad' },
  { displayLabel: 'Monto cancelado (Bs)', key: 'montoCancelado' },
];

export const COLUMNS_SUBSCRIPTIONS_MOST_REQUESTED_PLANS = [
  { displayLabel: 'N°', key: 'index' },
  { displayLabel: 'Nombre', key: 'nombre' },
  { displayLabel: 'Cantidad', key: 'cantidad' },
];

export const COLUMNS_SCHEDULES_REPORT = [
  { displayLabel: 'N°', key: 'index' },
  { displayLabel: 'Entrenador', key: 'entrenador' },
  { displayLabel: 'Disciplina', key: 'disciplina' },
  { displayLabel: 'Salón', key: 'salon' },
  { displayLabel: 'Dia', key: 'dia' },
  { displayLabel: 'Hora de entrada', key: 'horaEntrada' },
  { displayLabel: 'Hora de salida', key: 'horaSalida' },
  { displayLabel: 'Estado', key: 'estado' },
];

export const COLUMNS_PARNERS_LARGERST_SUBSCRIPTION = [
  { displayLabel: 'N°', key: 'index' },
  { displayLabel: 'Nombre', key: 'nombre' },
  { displayLabel: 'Apellido 1', key: 'apellidoP' },
  { displayLabel: 'Apellido 2', key: 'apellidoM' },
  { displayLabel: 'C.I.', key: 'ci' },
  { displayLabel: 'N° de suscripciones', key: 'numSuscrip' },
];

export const COLUMNS_PRODUCT_REPORT = [
  { displayLabel: 'N°', key: 'index' },
  { displayLabel: 'Nombre', key: 'nombre' },
  { displayLabel: 'Precio de compra(Bs)', key: 'precioCompra' },
  { displayLabel: 'Precio de venta (Bs)', key: 'precioVenta' },
  { displayLabel: 'Stock', key: 'stock' },
  { displayLabel: 'Fecha de vencimiento', key: 'fechaVencimiento' },
  { displayLabel: 'Categoria', key: 'categoria' },
];

export const EQUIPMENT_REPORT_CRITERIA_OPTIONS = [
  { id: '1', name: 'Todos los registros', columns: COLUMNS_EQUIPMENT_REPORT, service: equipmentsListReport },
  { id: '2', name: 'Solo máquinas operativas', columns: COLUMNS_EQUIPMENT_REPORT, service: equipmentsListReport },
  { id: '3', name: 'Solo máquinas en reparación', columns: COLUMNS_EQUIPMENT_REPORT, service: equipmentsListReport },
  {
    id: '4',
    name: 'Solo máquinas fuera de servicio ',
    columns: COLUMNS_EQUIPMENT_REPORT,
    service: equipmentsListReport,
  },
  {
    id: '5',
    name: 'Mediante una categoria',
    columns: COLUMNS_EQUIPMENT_REPORT,
    service: equipmentsListReport,
    dependsOn: 'idCategoria',
  },
];

export const PRODUCT_REPORT_CRITERIA_OPTIONS = [
  { id: '1', name: 'Todos los registros', columns: COLUMNS_PRODUCT_REPORT, service: productsListReport },
  { id: '2', name: 'Solo productos con vencimiento', columns: COLUMNS_PRODUCT_REPORT, service: productsListReport },
  { id: '3', name: 'Solo productos sin vencimiento', columns: COLUMNS_PRODUCT_REPORT, service: productsListReport },
  {
    id: '4',
    name: 'Mediante una categoria',
    columns: COLUMNS_PRODUCT_REPORT,
    service: productsListReport,
    dependsOn: 'idCategoria',
  },
];

export const SALES_REPORT_CRITERIA_OPTIONS = [
  { id: '1', name: 'Todos los registros', columns: COLUMNS_SALES_REPORT, service: listSalesByDates },
  {
    id: '2',
    name: 'Productos mas vendidos',
    columns: COLUMNS_PRODUCTS_MOST_POPULAR_REPORT,
    service: getProductsMostPopular,
  },
  {
    id: '3',
    name: 'Clientes mas frecuentes',
    columns: COLUMNS_CUSTOMERS_MORE_BUYERS_REPORT,
    service: partnerMoreBuyers,
  },
];

export const SCHEDULES_REPORT_CRITERIA_OPTIONS = [
  { id: '1', name: 'Todos los registros de horarios', columns: COLUMNS_SCHEDULES_REPORT, service: schedulesListReport },
  {
    id: '2',
    name: 'Horarios mediante una disciplina',
    columns: COLUMNS_SCHEDULES_REPORT,
    service: schedulesListReport,
    dependsOn: 'idDisciplina',
  },
  {
    id: '3',
    name: 'Horarios mediante un dia',
    columns: COLUMNS_SCHEDULES_REPORT,
    service: schedulesListReport,
    dependsOn: 'dia',
  },
];

export const PLANNING_REPORT_CRITERIA_OPTIONS = [
  {
    id: '1',
    name: 'Entrenadores con mas programación de clases',
    columns: COLUMNS_CUSTOMERS_MORE_BUYERS_REPORT,
    service: partnerMoreBuyers,
  },
  {
    id: '2',
    name: 'Socios con mas programación de clases',
    columns: COLUMNS_CUSTOMERS_MORE_BUYERS_REPORT,
    service: partnerMoreBuyers,
  },
  {
    id: '3',
    name: 'Disciplinas con mas programación de clases',
    columns: COLUMNS_CUSTOMERS_MORE_BUYERS_REPORT,
    service: partnerMoreBuyers,
  },
];

export const SUBSCRIPTION_REPORT_CRITERIA_OPTIONS = [
  {
    id: '1',
    name: 'Todos los registros',
    columns: COLUMNS_SUBSCRIPTIONS_ALL_REPORT,
    service: subscriptionsList,
  },
  {
    id: '2',
    name: 'Socios con mas suscripciones',
    columns: COLUMNS_PARNERS_LARGERST_SUBSCRIPTION,
    service: partnersWithLargerstSubscription,
  },
  {
    id: '3',
    name: 'Planes más contratados',
    columns: COLUMNS_SUBSCRIPTIONS_MOST_REQUESTED_PLANS,
    service: getMostRequestedPlans,
  },
  {
    id: '4',
    name: 'Suscripciones activas',
    columns: COLUMNS_SUBSCRIPTIONS_ALL_REPORT,
    service: getSubscriptionsActives,
  },
];
