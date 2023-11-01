// component
import { ROUTES } from '@/routes';
import Iconify from '../../components/Iconify';
import { ROLES } from '@/constants';

// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;
const { RECEPCIONISTA, ADMINISTRADOR, ENTRENADOR } = ROLES;

const navConfig = [
  {
    title: 'socios',
    path: ROUTES.partners.default,
    icon: getIcon('eva:people-fill'),
    allowedRols: [ADMINISTRADOR, RECEPCIONISTA, ENTRENADOR],
  },
  {
    title: 'empleados',
    path: ROUTES.employees.default,
    icon: getIcon('eva:people-fill'),
    allowedRols: [ADMINISTRADOR],
  },
  {
    title: 'categorias',
    path: ROUTES.categories.default,
    icon: getIcon('ic:twotone-category'),
    allowedRols: [ADMINISTRADOR, RECEPCIONISTA],
    children: [
      {
        title: 'Categorias de productos',
        path: ROUTES.categories.products.default,
        allowedRols: [ADMINISTRADOR, RECEPCIONISTA],
      },
      {
        title: 'Categorias de disciplinas',
        path: ROUTES.categories.disciplines.default,
        allowedRols: [ADMINISTRADOR, RECEPCIONISTA],
      },
      {
        title: 'Categorias de maquinarias',
        path: ROUTES.categories.equipments.default,
        allowedRols: [ADMINISTRADOR, RECEPCIONISTA],
      },
    ],
  },
  {
    title: 'disciplinas',
    path: ROUTES.disciplines.default,
    icon: getIcon('eva:clipboard-fill'),
    allowedRols: [ADMINISTRADOR, RECEPCIONISTA],
  },
  {
    title: 'Programacion de clases',
    path: ROUTES.planning.default,
    icon: getIcon('ion:calendar'),
    allowedRols: [ADMINISTRADOR, RECEPCIONISTA, ENTRENADOR],
  },
  {
    title: 'horarios',
    path: ROUTES.schedules.default,
    icon: getIcon('bxs:time'),
    allowedRols: [ADMINISTRADOR, RECEPCIONISTA, ENTRENADOR],
  },
  {
    title: 'salones',
    path: ROUTES.halls.default,
    icon: getIcon('bi:box-fill'),
    allowedRols: [ADMINISTRADOR, RECEPCIONISTA],
  },
  {
    title: 'productos',
    path: ROUTES.products.default,
    icon: getIcon('emojione-monotone:shopping-cart'),
    allowedRols: [ADMINISTRADOR, RECEPCIONISTA],
  },
  {
    title: 'planes',
    path: ROUTES.plans.default,
    icon: getIcon('fluent:notebook-16-filled'),
    allowedRols: [ADMINISTRADOR, RECEPCIONISTA],
  },
  {
    title: 'suscripciones',
    path: ROUTES.subscriptions.default,
    icon: getIcon('fa6-solid:file-invoice-dollar'),
    allowedRols: [ADMINISTRADOR, RECEPCIONISTA, ENTRENADOR],
  },
  {
    title: 'maquinarias',
    path: ROUTES.equipment.default,
    icon: getIcon('mdi:gym'),
    allowedRols: [ADMINISTRADOR, RECEPCIONISTA],
  },
  {
    title: 'ventas',
    path: ROUTES.sales.default,
    icon: getIcon('ic:round-point-of-sale'),
    allowedRols: [ADMINISTRADOR, RECEPCIONISTA],
  },
  {
    title: 'reportes',
    path: ROUTES.reports.default,
    icon: getIcon('material-symbols:book'),
    allowedRols: [ADMINISTRADOR, RECEPCIONISTA],
    children: [
      { title: 'Reporte de ventas', path: ROUTES.reports.sales, allowedRols: [ADMINISTRADOR, RECEPCIONISTA] },
      {
        title: 'Reporte de suscripciones',
        path: ROUTES.reports.subscriptions,
        allowedRols: [ADMINISTRADOR, RECEPCIONISTA],
      },
      {
        title: 'Reporte de maquinarias',
        path: ROUTES.reports.equipments,
        allowedRols: [ADMINISTRADOR, RECEPCIONISTA],
      },
      {
        title: 'Reporte de productos',
        path: ROUTES.reports.products,
        allowedRols: [ADMINISTRADOR, RECEPCIONISTA],
      },
    ],
  },
];

export default navConfig;
