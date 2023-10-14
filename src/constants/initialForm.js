import { getBOBCurrency } from '@/utils/dataHandler';
import { ROLES_ITEMS } from './inputs';
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
  roles: [ROLES_ITEMS[2].idRol],
};

export const initialFormDiscipline = {
  nombre: '',
  descripcion: '',
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
  fechaVencimiento: new Date(),
  estado: 1,
  tieneVencimiento: 'false',
};

export const initialFormPlan = {
  nombre: '',
  precio: '',
  duracion: '',
  esExpandible: 0,
  estado: 1,
};

export const initialFormSubscription = {
  idPlan: ITEM_DEFAULT,
  idSocio: { nombre: 'Ninguno', id: ITEM_DEFAULT },
  precio: '',
  cantidad: '1',
  fechaInicio: new Date(),
  fechaFin: new Date(),
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
};

export const initialFormSaleReport = {
  options: {
    criterio: ITEM_DEFAULT,
    orderBy: ITEM_DEFAULT,
  },
  dateStart: new Date(),
  dateEnd: add(new Date(), { days: 1 }),
};

export const initialFormCategory = {
  nombre: '',
  tipo: ITEM_DEFAULT,
  tipoLista: [{ nombre: 'Ninguno', id: ITEM_DEFAULT }],
};

export const initialFormPlanning = {
  capacidad: '',
  idEntrenador: { nombre: 'Ninguno', id: ITEM_DEFAULT },
  cupoDisponible: '',
  idHorario: ITEM_DEFAULT,
  idDisciplina: ITEM_DEFAULT,
  hora: '',
  fecha: new Date(),
  dia: ITEM_DEFAULT,
  idSocio: [{ nombre: 'Ninguno', id: ITEM_DEFAULT }],
};

export const initialFormLogin = {
  usuario: '',
  password: '',
};
