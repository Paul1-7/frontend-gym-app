export const ADMIN_PATH = '/dashboard';

export const ROUTES = {
  default: ADMIN_PATH + '/app',
  partners: {
    default: ADMIN_PATH + '/socios',
    add: ADMIN_PATH + '/socios/agregar',
    modify: ADMIN_PATH + '/socios/modificar',
  },
  disciplines: {
    default: ADMIN_PATH + '/disciplinas',
    add: ADMIN_PATH + '/disciplinas/agregar',
    modify: ADMIN_PATH + '/disciplinas/modificar',
  },
  employees: {
    default: ADMIN_PATH + '/empleados',
    add: ADMIN_PATH + '/empleados/agregar',
    modify: ADMIN_PATH + '/empleados/modificar',
  },
  schedules: {
    default: ADMIN_PATH + '/horarios',
    add: ADMIN_PATH + '/horarios/agregar',
    modify: ADMIN_PATH + '/horarios/modificar',
  },
  halls: {
    default: ADMIN_PATH + '/salas',
    add: ADMIN_PATH + '/salas/agregar',
    modify: ADMIN_PATH + '/salas/modificar',
  },
  plans: {
    default: ADMIN_PATH + '/planes',
    add: ADMIN_PATH + '/planes/agregar',
    modify: ADMIN_PATH + '/planes/modificar',
  },
  subscriptions: {
    default: ADMIN_PATH + '/suscripciones',
    add: ADMIN_PATH + '/suscripciones/agregar',
  },
  sales: {
    default: ADMIN_PATH + '/ventas',
    add: ADMIN_PATH + '/ventas/agregar',
    modify: ADMIN_PATH + '/ventas/modificar',
  },
  products: {
    default: ADMIN_PATH + '/productos',
    add: ADMIN_PATH + '/productos/agregar',
    modify: ADMIN_PATH + '/productos/modificar',
  },
  reports: {
    default: ADMIN_PATH + '/reportes',
    sales: ADMIN_PATH + '/reportes/ventas',
    subscriptions: ADMIN_PATH + '/reportes/suscripciones',
    employees: ADMIN_PATH + '/reportes/empleados',
  },
  auth: {
    login: 'ingreso',
    register: 'registro',
  },
};
