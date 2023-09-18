import { getBOBCurrency } from '@/utils/dataHandler';
import { DEFAULT_VALUE_ITEM, ROLES_ITEMS } from './inputs';
import { add } from 'date-fns';

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
  idCategoria: '0',
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
  tieneVencimiento: 'false',
  idCategoria: '0',
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

export const initialFormSale = {
  fecha: new Date().toLocaleDateString(),
  idSocio: { nombre: 'Ninguno', id: '0' },
  idVendedor: 'd9e42cd8-9399-4e0f-9eed-cb68f2f23549',
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
    criterio: DEFAULT_VALUE_ITEM,
    orderBy: DEFAULT_VALUE_ITEM,
  },
  dateStart: new Date(),
  dateEnd: add(new Date(), { days: 1 }),
};

export const initialFormCategory = {
  nombre: '',
  tipo: '0',
};
