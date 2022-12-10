import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import Socios from 'pages/socios/Socios';
import FormularioSocios from 'pages/socios/AddFormSocios';
import Disciplinas from 'pages/disciplina/Disciplinas';
import FormularioDisciplina from 'pages/disciplina/FormularioDisciplinas';
import FormularioEmpleado from 'pages/empleados/FormularioEmpleado';
import Empleados from 'pages/empleados/Empleados';
import Horarios from 'pages/horarios/Horarios';
import FormularioHorario from 'pages/horarios/FormularioHorario';
import Salones from 'pages/salones/Salones';
import AddFormSalones from 'pages/salones/AddFormSalones';
import AddFormProductos from 'pages/productos/AddFormProductos';
import Productos from 'pages/productos/Productos';
import Planes from 'pages/planes/Planes';
import AddFormPlanes from 'pages/planes/AddFormPlanes';
import Suscripciones from 'pages/suscripciones/Suscripciones';
import AddFormSuscripciones from 'pages/suscripciones/AddFormSuscripciones';
import AddFormVentas from 'pages/ventas/AddFormVentas';
import Ventas from 'pages/ventas/Ventas';
import DetalleVentas from 'pages/ventas/DetalleVentas';
import ModificarFormSocios from 'pages/socios/ModificarFormSocios';
import { DataTableProvider } from 'context/DataTableContext';
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//
import Blog from './pages/Blog';
import Login from './pages/Login';
import NotFound from './pages/Page404';
import Register from './pages/Register';
import DashboardApp from './pages/DashboardApp';

// P----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { path: 'app', element: <DashboardApp /> },
        // socios
        {
          path: 'socios',
          element: (
            <DataTableProvider>
              <Socios />
            </DataTableProvider>
          ),
        },
        { path: 'socios/nuevo', element: <FormularioSocios /> },
        { path: 'socios/modificar/:id', element: <ModificarFormSocios /> },
        // disciplinas
        { path: 'disciplinas', element: <Disciplinas /> },
        { path: 'disciplinas/nuevo', element: <FormularioDisciplina /> },
        // empleados
        { path: 'empleados', element: <Empleados /> },
        { path: 'empleados/nuevo', element: <FormularioEmpleado /> },
        // horarios
        { path: 'horarios', element: <Horarios /> },
        { path: 'horarios/actualizar', element: <FormularioHorario /> },
        // productos
        { path: 'productos', element: <Productos /> },
        { path: 'productos/nuevo', element: <AddFormProductos /> },
        // salones
        { path: 'salones', element: <Salones /> },
        { path: 'salones/nuevo', element: <AddFormSalones /> },
        // planes
        { path: 'planes', element: <Planes /> },
        { path: 'planes/nuevo', element: <AddFormPlanes /> },
        { path: 'blog', element: <Blog /> },
        // suscripciones
        { path: 'suscripciones', element: <Suscripciones /> },
        { path: 'suscripciones/nuevo', element: <AddFormSuscripciones /> },
        // ventas
        { path: 'ventas', element: <Ventas /> },
        { path: 'ventas/nuevo', element: <AddFormVentas /> },
        { path: 'ventas/detalle/:id', element: <DetalleVentas /> },
      ],
    },
    {
      path: 'login',
      element: <Login />,
    },
    {
      path: 'register',
      element: <Register />,
    },
    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        { path: '/', element: <Navigate to="/dashboard/app" /> },
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);
}
