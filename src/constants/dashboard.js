import { ROUTES } from '@/routes/routes';
import { Inventory } from '@mui/icons-material';
import { Assignment } from '@mui/icons-material';
import { Category } from '@mui/icons-material';
import { CalendarMonth } from '@mui/icons-material';
import { PointOfSale } from '@mui/icons-material';
import { CardMembership } from '@mui/icons-material';
import { MeetingRoom } from '@mui/icons-material';
import { FitnessCenter } from '@mui/icons-material';
import { Person } from '@mui/icons-material';
import { SUBMENUS } from './subMenus';

export const DASHBOARD = {
  employees: {
    default: {
      title: 'Empleados',
      description: 'Lista de empleados',
      button: {
        icon: Person,
        url: ROUTES.employees.add,
        name: 'Nuevo empleado',
        idMenus: [SUBMENUS.EMPLOYEE_ADD_ID],
      },
    },
    add: {
      title: 'Agregar empleado',
      description: 'Agrega un empleado para el acceso al sistema',
    },
    modify: {
      title: 'Modificar empleado',
      description: 'Modifica un empleado existente para el acceso al sistema',
    },
  },
  partners: {
    default: {
      title: 'Socios',
      description: 'Lista de socios',
      button: {
        icon: Person,
        url: ROUTES.partners.add,
        name: 'Nuevo socio',
        idMenus: [SUBMENUS.PARTNER_ADD_ID],
      },
    },
    add: {
      title: 'Agregar socio',
      description: 'Agrega un socio para el acceso al sistema',
    },
    modify: {
      title: 'Modificar socio',
      description: 'Modifica un cliente existente para el acceso al sistema',
    },
  },
  disciplines: {
    default: {
      title: 'Disciplinas',
      description: 'Lista de disciplinas',
      button: {
        icon: FitnessCenter,
        url: ROUTES.disciplines.add,
        name: 'Nueva disciplina',
        idMenus: [SUBMENUS.DISCIPLINE_ADD_ID],
      },
    },
    add: {
      title: 'Agregar disciplina',
      description: 'Agrega una disciplina en el sistema',
    },
    modify: {
      title: 'Modificar disciplina',
      description: 'Modifica una disciplina existente',
    },
  },
  halls: {
    default: {
      title: 'Salones',
      description: 'Lista de salones de entrenamiento',
      button: {
        icon: MeetingRoom,
        url: ROUTES.halls.add,
        name: 'Nuevo salón',
        idMenus: [SUBMENUS.ROOM_ADD_ID],
      },
    },
    add: {
      title: 'Agregar salón',
      description: 'Agrega un salón en el sistema',
    },
    modify: {
      title: 'Modificar salón',
      description: 'Modifica un salón existente',
    },
  },
  categories: {
    disciplines: {
      default: {
        title: 'Categorias de disciplinas',
        description: 'Lista de categorias para disciplinas',
        button: {
          icon: Category,
          url: ROUTES.categories.disciplines.add,
          name: 'Nueva categoria',
          idMenus: [SUBMENUS.DISCIPLINE_CATEGORY_ADD_ID],
        },
      },
      add: {
        title: 'Agregar categoría para disciplina',
        description: 'Agrega una categoría para las disciplinas en el sistema',
      },
      modify: {
        title: 'Modificar categoría de disciplinas',
        description: 'Modifica una categoría de disciplinas existente',
      },
    },
    equipment: {
      default: {
        title: 'Categorias de maquinarias',
        description: 'Lista de categorias para maquinarias',
        button: {
          icon: Category,
          url: ROUTES.categories.equipments.add,
          name: 'Nueva categoria',
          idMenus: [SUBMENUS.MACHINERY_CATEGORY_ADD_ID],
        },
      },
      add: {
        title: 'Agregar categoría para maquinarias',
        description: 'Agrega una categoría para las maquinariassen el sistema',
      },
      modify: {
        title: 'Modificar categoría de maquinarias',
        description: 'Modifica una categoría de maquinarias existente',
      },
    },
    products: {
      default: {
        title: 'Categorias de productos',
        description: 'Lista de categorias para productos',
        button: {
          icon: Category,
          url: ROUTES.categories.products.add,
          name: 'Nueva categoria',
          idMenus: [SUBMENUS.PRODUCT_CATEGORY_ADD_ID],
        },
      },
      add: {
        title: 'Agregar categoría para productos',
        description: 'Agrega una categoría para los productos en el sistema',
      },
      modify: {
        title: 'Modificar categoría de productos',
        description: 'Modifica una categoría de productos existente',
      },
    },
  },
  planning: {
    default: {
      title: 'Programaciones',
      description: 'Lista de programación para clases de alguna disciplina',
      button: {
        icon: CalendarMonth,
        url: ROUTES.planning.add,
        name: 'Nueva programacion',
        idMenus: [SUBMENUS.CLASS_SCHEDULE_ADD_ID],
      },
    },
    add: {
      title: 'Agregar programacion',
      description: 'Agrega una programacion en el sistema',
    },
    modify: {
      title: 'Modificar programacion',
      description: 'Modifica una programacion existente de una clase',
    },
    detail: {
      title: 'Detalle de la clase',
      description: 'Muestra la información de la clase programada',
    },
  },
  products: {
    default: {
      title: 'Productos',
      description: 'Lista de productos',
      button: {
        icon: Inventory,
        url: ROUTES.products.add,
        name: 'Nuevo producto',
        idMenus: [SUBMENUS.PRODUCT_ADD_ID],
      },
    },
    add: {
      title: 'Agregar producto',
      description: 'Agrega un producto en el sistema',
    },
    modify: {
      title: 'Modificar producto',
      description: 'Modifica un producto existente',
    },
  },
  plans: {
    default: {
      title: 'Planes',
      description: 'Lista de planes para la suscripción',
      button: {
        icon: CardMembership,
        url: ROUTES.plans.add,
        name: 'Nuevo plan',
        idMenus: [SUBMENUS.PLAN_ADD_ID],
      },
    },
    add: {
      title: 'Agregar plan',
      description: 'Agrega un plan en el sistema',
    },
    modify: {
      title: 'Modificar plan',
      description: 'Modifica un plan existente',
    },
  },
  subscriptions: {
    default: {
      title: 'Suscripciones',
      description: 'Lista de suscripciones realizadas',
      button: {
        icon: Assignment,
        url: ROUTES.subscriptions.add,
        name: 'Nueva suscripción',
        idMenus: [SUBMENUS.SUBSCRIPTION_ADD_ID],
      },
    },
    add: {
      title: 'Agregar suscripción',
      description: 'Agrega una suscripcion en el sistema',
    },
    modify: {
      title: 'Modificar suscripción',
      description: 'Modifica la fecha de inicio del sistema',
    },
  },
  schedules: {
    default: {
      title: 'Horarios',
      description: 'Calendario de horarios para las clases',
    },
  },
  sales: {
    default: {
      title: 'Ventas',
      description: 'Lista de ventas realizadas',
      button: {
        icon: PointOfSale,
        url: ROUTES.sales.add,
        name: 'Nueva venta',
        idMenus: [SUBMENUS.SALE_ADD_ID],
      },
    },
    add: {
      title: 'Agregar venta',
      description: 'Agrega una venta en el sistema',
    },
    detail: {
      title: 'Detalle de la venta',
      description: 'Muestra la información de la venta realizada',
    },
  },
  equipments: {
    default: {
      title: 'Maquinarias',
      description: 'Lista de maquinarias o equipos de entranamiento',
      button: {
        icon: FitnessCenter,
        url: ROUTES.equipment.add,
        name: 'Nueva maquinaria',
        idMenus: [SUBMENUS.MACHINE_ADD_ID],
      },
    },
    add: {
      title: 'Agregar maquinaria',
      description: 'Agrega una maquinaria en el sistema',
    },
    modify: {
      title: 'Modificar datos de la maquinaria',
      description: 'Modifica los datos de una maquinaria existente',
    },
  },
  reports: {
    sales: {
      title: 'Reportes de ventas',
      description: 'Genera reportes de las ventas en formato PDF o CSV',
    },
    products: {
      title: 'Reportes de productos',
      description: 'Genera reportes de los productos en formato PDF o CSV',
    },
    equipments: {
      title: 'Reportes de maquinarias',
      description: 'Genera reportes de las maquinarias que hay en el gimnacio en formato PDF o CSV',
    },
  },
};
