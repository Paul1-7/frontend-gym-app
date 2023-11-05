// component
import { ROUTES } from '@/routes';
import Iconify from '../../components/Iconify';
import { SUBMENUS } from '@/constants';

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const navConfig = [
  {
    title: 'socios',
    path: ROUTES.partners.default,
    icon: getIcon('eva:people-fill'),
    idMenus: [SUBMENUS.PARTNER_LIST_ID],
  },
  {
    title: 'empleados',
    path: ROUTES.employees.default,
    icon: getIcon('eva:people-fill'),
    idMenus: [SUBMENUS.EMPLOYEE_LIST_ID],
  },
  {
    title: 'categorias',
    path: ROUTES.categories.default,
    icon: getIcon('ic:twotone-category'),
    idMenus: [
      SUBMENUS.DISCIPLINE_CATEGORY_LIST_ID,
      SUBMENUS.PRODUCT_CATEGORY_LIST_ID,
      SUBMENUS.MACHINERY_CATEGORY_LIST_ID,
    ],
    children: [
      {
        title: 'Categorias de productos',
        path: ROUTES.categories.products.default,
        idMenus: [SUBMENUS.PRODUCT_CATEGORY_LIST_ID],
      },
      {
        title: 'Categorias de disciplinas',
        path: ROUTES.categories.disciplines.default,
        idMenus: [SUBMENUS.DISCIPLINE_CATEGORY_LIST_ID],
      },
      {
        title: 'Categorias de maquinarias',
        path: ROUTES.categories.equipments.default,
        idMenus: [SUBMENUS.MACHINERY_CATEGORY_LIST_ID],
      },
    ],
  },
  {
    title: 'disciplinas',
    path: ROUTES.disciplines.default,
    icon: getIcon('eva:clipboard-fill'),
    idMenus: [SUBMENUS.DISCIPLINE_LIST_ID],
  },
  {
    title: 'Programacion de clases',
    path: ROUTES.planning.default,
    icon: getIcon('ion:calendar'),
    idMenus: [SUBMENUS.CLASS_SCHEDULE_LIST_ID],
  },
  {
    title: 'horarios',
    path: ROUTES.schedules.default,
    icon: getIcon('bxs:time'),
    idMenus: [SUBMENUS.CLASS_SCHEDULE_ASSIGN_ID],
  },
  {
    title: 'salones',
    path: ROUTES.halls.default,
    icon: getIcon('bi:box-fill'),
    idMenus: [SUBMENUS.ROOM_LIST_ID],
  },
  {
    title: 'productos',
    path: ROUTES.products.default,
    icon: getIcon('emojione-monotone:shopping-cart'),
    idMenus: [SUBMENUS.PRODUCT_LIST_ID],
  },
  {
    title: 'planes',
    path: ROUTES.plans.default,
    icon: getIcon('fluent:notebook-16-filled'),
    idMenus: [SUBMENUS.PLAN_LIST_ID],
  },
  {
    title: 'suscripciones',
    path: ROUTES.subscriptions.default,
    icon: getIcon('fa6-solid:file-invoice-dollar'),
    idMenus: [SUBMENUS.SUBSCRIPTION_LIST_ID],
  },
  {
    title: 'maquinarias',
    path: ROUTES.equipment.default,
    icon: getIcon('mdi:gym'),
    idMenus: [SUBMENUS.MACHINE_LIST_ID],
  },
  {
    title: 'ventas',
    path: ROUTES.sales.default,
    icon: getIcon('ic:round-point-of-sale'),
    idMenus: [SUBMENUS.ROOM_LIST_ID],
  },
  {
    title: 'reportes',
    path: ROUTES.reports.default,
    icon: getIcon('material-symbols:book'),
    idMenus: [SUBMENUS.SALES_REPORT_ID, SUBMENUS.MACHINE_REPORT_ID, SUBMENUS.SUBSCRIPTION_REPORT_ID],
    children: [
      {
        idMenus: [SUBMENUS.SUBSCRIPTION_REPORT_ID],
        title: 'Reporte de suscripciones',
        path: ROUTES.reports.subscriptions,
      },
      {
        idMenus: [SUBMENUS.SALES_REPORT_ID],
        title: 'Reporte de ventas',
        path: ROUTES.reports.sales,
      },
      {
        idMenus: [SUBMENUS.MACHINE_REPORT_ID],
        title: 'Reporte de maquinarias',
        path: ROUTES.reports.equipments,
      },
      {
        title: 'Reporte de productos',
        path: ROUTES.reports.products,
        idMenus: [SUBMENUS.PRODUCT_REPORT_ID],
      },
    ],
  },
];

export default navConfig;
