import { ROUTES } from '@/routes/routes';
import { Inventory } from '@mui/icons-material';
import { Assignment } from '@mui/icons-material';
import { CardMembership } from '@mui/icons-material';
import { MeetingRoom } from '@mui/icons-material';
import { FitnessCenter } from '@mui/icons-material';
import { Person } from '@mui/icons-material';

export const DASHBOARD = {
  employees: {
    default: {
      title: 'Empleados',
      description: 'Lista de empleados',
      button: {
        icon: Person,
        url: ROUTES.employees.add,
        name: 'Nuevo empleado',
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
  products: {
    default: {
      title: 'Productos',
      description: 'Lista de productos',
      button: {
        icon: Inventory,
        url: ROUTES.products.add,
        name: 'Nuevo producto',
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
      },
    },
    add: {
      title: 'Agregar suscripción',
      description: 'Agrega una suscripcion en el sistema',
    },
  },
  schedules: {
    default: {
      title: 'Horarios',
      description: 'Calendario de horarios para las clases',
    },
  },
};
