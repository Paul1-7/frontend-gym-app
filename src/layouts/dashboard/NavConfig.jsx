// component
import { ROUTES } from '@/routes';
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const navConfig = [
  {
    title: 'socios',
    path: ROUTES.partners.default,
    icon: getIcon('eva:people-fill'),
  },
  {
    title: 'empleados',
    path: ROUTES.employees.default,
    icon: getIcon('eva:people-fill'),
  },
  {
    title: 'categorias',
    path: ROUTES.categories.default,
    icon: getIcon('ic:twotone-category'),
  },
  {
    title: 'disciplinas',
    path: ROUTES.disciplines.default,
    icon: getIcon('eva:clipboard-fill'),
  },
  {
    title: 'horarios',
    path: ROUTES.schedules.default,
    icon: getIcon('bxs:time'),
  },
  {
    title: 'salones',
    path: ROUTES.halls.default,
    icon: getIcon('bi:box-fill'),
  },
  {
    title: 'productos',
    path: ROUTES.products.default,
    icon: getIcon('emojione-monotone:shopping-cart'),
  },
  {
    title: 'planes',
    path: ROUTES.plans.default,
    icon: getIcon('fluent:notebook-16-filled'),
  },
  {
    title: 'suscripciones',
    path: ROUTES.subscriptions.default,
    icon: getIcon('fa6-solid:file-invoice-dollar'),
  },
  {
    title: 'maquinarias',
    path: ROUTES.equipment.default,
    icon: getIcon('mdi:gym'),
  },
  {
    title: 'ventas',
    path: ROUTES.sales.default,
    icon: getIcon('ic:round-point-of-sale'),
  },
  {
    title: 'reportes',
    path: ROUTES.reports.default,
    icon: getIcon('material-symbols:book'),
    children: [
      { title: 'Reporte de ventas', path: ROUTES.reports.sales },
      { title: 'Reporte de suscripciones', path: ROUTES.reports.subscriptions },
    ],
  },
];

export default navConfig;
