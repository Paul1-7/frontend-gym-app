import { getBOBCurrency } from '@/utils/dataHandler';
import { ROLES_ITEMS } from './inputs';

export const initialFormPartner = {
  ci: '',
  nombre: '',
  apellidoP: '',
  apellidoM: '',
  edad: '',
  celular: '',
  direccion: '',
  estado: '1',
  idPlan: '0',
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
  idDisciplina: '0',
  idEntrenador: '0',
  idSalon: '0',
};

export const initialFormHall = {
  nombre: '',
  capacidad: '',
  estado: 1,
};

export const initialFormProduct = {
  nombre: '',
  stock: '',
  precioCompra: '',
  precioVenta: '',
  fechaVencimiento: new Date(),
  estado: 1,
};

export const initialFormPlan = {
  nombre: '',
  precio: '',
  duracion: '',
  esExpandible: 0,
  estado: 1,
};

export const initialFormSubscription = {
  idPlan: '0',
  idSocio: { nombre: 'Ninguno', id: '0' },
  precio: '',
  cantidad: '1',
  fechaInicio: new Date(),
  fechaFin: new Date(),
};
