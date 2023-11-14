import { getBOBCurrency } from '@/utils/dataHandler';
import { add } from 'date-fns';

export const ITEM_DEFAULT = 'default';

export const initialFormPartner = {
  ci: '',
  nombre: '',
  apellidoP: '',
  apellidoM: '',
  edad: '',
  celular: '',
  direccion: '',
  estado: '1',
  idPlan: ITEM_DEFAULT,
  cantidad: '1',
  precio: getBOBCurrency(0),
  fechaInicio: new Date(),
  fechaFin: new Date(),
};

export const initialFormEmployee = {
  ci: '',
  nombre: '',
  apellidoP: '',
  apellidoM: '',
  edad: '',
  celular: '',
  direccion: '',
  estado: '1',
  usuario: '',
  password: '',
  repetirPassword: '',
  roles: [],
};

export const initialFormDiscipline = {
  nombre: '',
  descripcion: '',
  idCategoria: ITEM_DEFAULT,
  estado: 1,
};

export const initialFormSchedule = {
  idDisciplina: ITEM_DEFAULT,
  idEntrenador: ITEM_DEFAULT,
  idSalon: ITEM_DEFAULT,
};

export const initialFormHall = {
  nombre: '',
  capacidad: '',
  planta: ITEM_DEFAULT,
  estado: 1,
};

export const initialFormProduct = {
  nombre: '',
  stock: '',
  precioCompra: '',
  precioVenta: '',
  fechaVencimiento: add(new Date(), { days: 5 }),
  estado: 1,
  tieneVencimiento: 'false',
  idCategoria: ITEM_DEFAULT,
};

export const initialFormPlan = {
  nombre: '',
  precio: '',
  duracion: '30',
  esRecurrente: 0,
  fechaVencimiento: add(new Date(), {
    days: 5,
  }),
  estado: 1,
};

export const initialFormSubscription = {
  idPlan: ITEM_DEFAULT,
  idSocio: { nombre: 'Ninguno', id: ITEM_DEFAULT },
  precio: '',
  cantidad: '1',
  fechaInicio: new Date(),
  fechaFin: new Date(),
  daysRemaining: 0,
};

export const initialFormSale = {
  fecha: new Date().toLocaleDateString(),
  idSocio: { nombre: 'Ninguno', id: ITEM_DEFAULT },
  idVendedor: '',
  productos: [],
};

export const initialFormEquipment = {
  nombre: '',
  marca: '',
  modelo: '',
  fechaAdquisicion: new Date(),
  capacidad: '',
  precio: '',
  estado: 'operativa',
  idCategoria: [],
};

export const initialFormSaleReport = {
  options: {
    idDateRange: ITEM_DEFAULT,
    criterio: ITEM_DEFAULT,
  },
  customDateRange: {
    dateStart: new Date(),
    dateEnd: add(new Date(), { days: 1 }),
  },
};

export const initialFormScheduleReport = {
  options: {
    criterio: ITEM_DEFAULT,
  },
  idDisciplina: ITEM_DEFAULT,
  dia: ITEM_DEFAULT,
};

export const initialFormSubscriptionReport = {
  options: {
    criterio: ITEM_DEFAULT,
    idDateRange: ITEM_DEFAULT,
  },
  customDateRange: {
    dateStart: new Date(),
    dateEnd: add(new Date(), { days: 1 }),
  },
};

export const initialFormPlanningReport = {
  options: {
    criterio: ITEM_DEFAULT,
    idDateRange: ITEM_DEFAULT,
  },
  customDateRange: {
    dateStart: new Date(),
    dateEnd: add(new Date(), { days: 1 }),
  },
};

export const initialFormEquipmentReport = {
  options: {
    criterio: ITEM_DEFAULT,
    orderBy: ITEM_DEFAULT,
  },
  idCategoria: ITEM_DEFAULT,
};
export const initialFormProductReport = {
  options: {
    criterio: ITEM_DEFAULT,
    orderBy: ITEM_DEFAULT,
  },
  idCategoria: ITEM_DEFAULT,
};

export const initialFormCategory = {
  nombre: '',
};

export const initialFormPlanning = {
  id: null,
  capacidad: '0',
  cupoDisponible: '0',
  idHorario: {
    nombre: 'Ninguno',
    id: ITEM_DEFAULT,
    horarioEntrada: new Date(),
    salon: { id: '', nombre: '', capacidad: '' },
  },
  hora: '',
  fecha: new Date(),
  dia: 1,
  idSocio: [{ nombre: 'Ninguno', id: ITEM_DEFAULT }],
};

export const initialFormLogin = {
  usuario: '',
  password: '',
};

export const initialFormRoles = {
  nombre: '',
  idMenus: [],
  menus: [],
};
