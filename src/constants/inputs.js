const ITEMS_RADIO_GROUP = [
  {
    id: '1',
    title: 'Habilitado',
  },
  {
    id: '0',
    title: 'Deshabilitado',
  },
];

export const ITEMS_RESPONSE_OPTIONS = [
  {
    id: 'false',
    title: 'Si',
  },
  {
    id: 'true',
    title: 'No',
  },
];

const EXPANSIBLE_ITEMS_RADIO_GROUP = [
  {
    id: '1',
    title: 'Si',
  },
  {
    id: '0',
    title: 'No',
  },
];

const ROLES_ITEMS = [
  {
    idRol: '35b63ba1-8019-4836-83a4-c51a42b2f3ec',
    nombre: 'Administrador',
  },
  {
    idRol: '576fae95-3e51-45b8-9b46-9a93c35e8c20',
    nombre: 'Recepcionista',
  },
  {
    idRol: '12322c7b-dc62-400f-83e2-3b308d7bace8',
    nombre: 'Entrenador',
  },
  {
    idRol: 'd036ff13-a438-4469-8a65-f8f62f559319',
    nombre: 'Limpieza',
  },
  {
    idRol: '28e921f8-043e-4911-a111-9ad9f31317f6',
    nombre: 'Socio',
  },
];

export const TYPES_CATEGORIES_ITEMS = [
  { id: 'Disciplina', name: 'Disciplina' },
  { id: 'Producto', name: 'Producto' },
];

const ITEMS_SUSCRIPCIONES_REPORTE = [
  { id: '1', nombre: 'Lista de suscripciones' },
  { id: '2', nombre: 'Socios con mas renovacion de suscripciones' },
  { id: '3', nombre: 'Informe de resultados' },
];

export const ITEMS_EQUIPMENT_STATES = [
  { id: 'operativa', nombre: 'Operativa' },
  { id: 'reparacion', nombre: 'En reparación' },
  { id: 'fueraServicio', nombre: 'Fuera de servicio' },
];

const ITEMS_RADIO_REPORTES_SUSC = [
  {
    id: '0',
    title: 'Rango de fechas personalizados',
  },
  {
    id: '1',
    title: 'Todos los datos historicos',
  },
];

const DEFAULT_VALUE_ITEM = '0';

const TEXT_MODAL = {
  delete: '¿Estas seguro de querer eliminar el registro seleccionado ? Esta accion no se puede deshacer',
};

export {
  ITEMS_RADIO_GROUP,
  ROLES_ITEMS,
  EXPANSIBLE_ITEMS_RADIO_GROUP,
  ITEMS_SUSCRIPCIONES_REPORTE,
  ITEMS_RADIO_REPORTES_SUSC,
  TEXT_MODAL,
  DEFAULT_VALUE_ITEM,
};
