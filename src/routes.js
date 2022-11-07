import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import Socios from 'pages/socios/Socios';
import FormularioSocios from 'pages/socios/FormularioSocios';
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
        { path: 'socios', element: <Socios /> },
        { path: 'socios/nuevo', element: <FormularioSocios /> },
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
        { path: 'salones', element: <Salones /> },
        { path: 'salones/nuevo', element: <AddFormSalones /> },
        { path: 'blog', element: <Blog /> },
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
