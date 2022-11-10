// component
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const navConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: getIcon('eva:pie-chart-2-fill'),
  },
  {
    title: 'socios',
    path: '/dashboard/socios',
    icon: getIcon('eva:people-fill'),
  },
  {
    title: 'empleados',
    path: '/dashboard/empleados',
    icon: getIcon('eva:people-fill'),
  },
  {
    title: 'disciplinas',
    path: '/dashboard/disciplinas',
    icon: getIcon('eva:clipboard-fill'),
  },
  {
    title: 'horarios',
    path: '/dashboard/horarios',
    icon: getIcon('bxs:time'),
  },
  {
    title: 'salones',
    path: '/dashboard/salones',
    icon: getIcon('bi:box-fill'),
  },
  {
    title: 'productos',
    path: '/dashboard/productos',
    icon: getIcon('emojione-monotone:shopping-cart'),
  },
  {
    title: 'planes',
    path: '/dashboard/planes',
    icon: getIcon('fluent:notebook-16-filled'),
  },
  {
    title: 'suscripciones',
    path: '/dashboard/suscripciones',
    icon: getIcon('fa6-solid:file-invoice-dollar'),
  },
  {
    title: 'blog',
    path: '/dashboard/blog',
    icon: getIcon('eva:file-text-fill'),
  },
  {
    title: 'login',
    path: '/login',
    icon: getIcon('eva:lock-fill'),
  },
  {
    title: 'register',
    path: '/register',
    icon: getIcon('eva:person-add-fill'),
  },
  {
    title: 'Not found',
    path: '/404',
    icon: getIcon('eva:alert-triangle-fill'),
  },
];

export default navConfig;
