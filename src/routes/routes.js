export const ADMIN_PATH = '/administracion';

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
  categories: {
    default: ADMIN_PATH + '/categorias',
    disciplines: {
      add: ADMIN_PATH + '/categorias/disciplinas/agregar',
      modify: ADMIN_PATH + '/categorias/disciplinas/modificar',
      default: ADMIN_PATH + '/categorias/disciplinas',
    },
    equipments: {
      default: ADMIN_PATH + '/categorias/maquinarias',
      add: ADMIN_PATH + '/categorias/maquinarias/agregar',
      modify: ADMIN_PATH + '/categorias/maquinarias/modificar',
    },
    products: {
      default: ADMIN_PATH + '/categorias/productos',
      add: ADMIN_PATH + '/categorias/productos/agregar',
      modify: ADMIN_PATH + '/categorias/productos/modificar',
    },
  },
  plans: {
    default: ADMIN_PATH + '/planes',
    add: ADMIN_PATH + '/planes/agregar',
    modify: ADMIN_PATH + '/planes/modificar',
  },
  subscriptions: {
    default: ADMIN_PATH + '/suscripciones',
    add: ADMIN_PATH + '/suscripciones/agregar',
    modify: ADMIN_PATH + '/suscripciones/modificar',
  },
  sales: {
    default: ADMIN_PATH + '/ventas',
    add: ADMIN_PATH + '/ventas/agregar',
    detail: ADMIN_PATH + '/ventas/detalle',
  },
  products: {
    default: ADMIN_PATH + '/productos',
    add: ADMIN_PATH + '/productos/agregar',
    modify: ADMIN_PATH + '/productos/modificar',
  },
  planning: {
    default: ADMIN_PATH + '/programacion',
    add: ADMIN_PATH + '/programacion/agregar',
    modify: ADMIN_PATH + '/programacion/modificar',
    detail: ADMIN_PATH + '/programacion/detalle',
  },
  rols: {
    default: ADMIN_PATH + '/roles',
    add: ADMIN_PATH + '/roles/agregar',
    modify: ADMIN_PATH + '/roles/modificar',
    detail: ADMIN_PATH + '/roles/detalle',
  },
  equipment: {
    default: ADMIN_PATH + '/maquinarias',
    add: ADMIN_PATH + '/maquinarias/agregar',
    modify: ADMIN_PATH + '/maquinarias/modificar',
  },
  reports: {
    default: ADMIN_PATH + '/reportes',
    sales: ADMIN_PATH + '/reportes/ventas',
    subscriptions: ADMIN_PATH + '/reportes/suscripciones',
    equipments: ADMIN_PATH + '/reportes/maquinarias',
    products: ADMIN_PATH + '/reportes/productos',
    schedules: ADMIN_PATH + '/reportes/horarios',
  },
  auth: {
    login: 'ingreso',
  },
};
