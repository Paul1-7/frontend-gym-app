import { lazy } from 'react';
import { DataTableProvider } from '@/context/DataTableContext';
import { Route, Routes, Navigate } from 'react-router-dom';
import { ADMIN_PATH, ROUTES } from './routes';

const Partners = lazy(() => import('@/pages/partners/Partners'));
const AddPartner = lazy(() => import('@/pages/partners/AddPartner'));
const ModifyPartner = lazy(() => import('@/pages/partners/ModifyPartner'));
//Employees
const Employees = lazy(() => import('@/pages/employees/Employees'));
const AddEmployee = lazy(() => import('@/pages/employees/AddEmployee'));
const ModifyEmployee = lazy(() => import('@/pages/employees/ModifyEmployee'));
// Disciplines
const Disciplines = lazy(() => import('@/pages/disciplines/Disciplines'));
const AddDiscipline = lazy(() => import('@/pages/disciplines/AddDiscipline'));
const ModifyDiscipline = lazy(() => import('@/pages/disciplines/ModifyDiscipline'));
// Halls
const Halls = lazy(() => import('@/pages/halls/Halls'));
const AddHall = lazy(() => import('@/pages/halls/AddHall'));
const ModifyHall = lazy(() => import('@/pages/halls/ModifyHall'));

const Horarios = lazy(() => import('@/pages/horarios/Horarios'));
const FormularioHorario = lazy(() => import('@/pages/horarios/FormularioHorario'));
const Productos = lazy(() => import('@/pages/productos/Productos'));
const AddFormProductos = lazy(() => import('@/pages/productos/AddFormProductos'));

const Planes = lazy(() => import('@/pages/planes/Planes'));
const AddFormPlanes = lazy(() => import('@/pages/planes/AddFormPlanes'));
const Suscripciones = lazy(() => import('@/pages/suscripciones/Suscripciones'));
const AddFormSuscripciones = lazy(() => import('@/pages/suscripciones/AddFormSuscripciones'));
const Ventas = lazy(() => import('@/pages/ventas/Ventas'));
const AddFormVentas = lazy(() => import('@/pages/ventas/AddFormVentas'));
const DetalleVentas = lazy(() => import('@/pages/ventas/DetalleVentas'));
const ReporteSuscripciones = lazy(() => import('@/pages/reportes/ReportesSuscripciones'));
const Login = lazy(() => import('@/pages/Login'));
const Register = lazy(() => import('@/pages/Register'));
const LogoOnlyLayout = lazy(() => import('@/layouts/LogoOnlyLayout'));
const Page404 = lazy(() => import('@/pages/Page404'));
const DashboardApp = lazy(() => import('@/pages/DashboardApp'));
const DashboardLayout = lazy(() => import('@/layouts/dashboard'));

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to={ROUTES.default} />} />
      <Route element={<DashboardLayout />} path={ADMIN_PATH}>
        <Route path={ROUTES.default} element={<DashboardApp />} />
        {/* Socios */}
        <Route
          path={ROUTES.partners.default}
          element={
            <DataTableProvider>
              <Partners />
            </DataTableProvider>
          }
        />
        <Route path={ROUTES.partners.add} element={<AddPartner />} />
        <Route path={`${ROUTES.partners.modify}/:id`} element={<ModifyPartner />} />
        {/* Empleados */}
        <Route
          path={ROUTES.employees.default}
          element={
            <DataTableProvider>
              <Employees />
            </DataTableProvider>
          }
        />
        <Route path={ROUTES.employees.add} element={<AddEmployee />} />
        <Route path={`${ROUTES.employees.modify}/:id`} element={<ModifyEmployee />} />
        {/* Disciplinas */}
        <Route
          path={ROUTES.disciplines.default}
          element={
            <DataTableProvider>
              <Disciplines />
            </DataTableProvider>
          }
        />
        <Route path={ROUTES.disciplines.add} element={<AddDiscipline />} />
        <Route path={`${ROUTES.disciplines.modify}/:id`} element={<ModifyDiscipline />} />
        {/* Salas */}
        <Route
          path={ROUTES.halls.default}
          element={
            <DataTableProvider>
              <Halls />
            </DataTableProvider>
          }
        />
        <Route path={ROUTES.halls.add} element={<AddHall />} />
        <Route path={`${ROUTES.halls.modify}/:id`} element={<ModifyHall />} />
        {/* Horarios */}
        <Route path={ROUTES.schedules.default} element={<Horarios />} />
        <Route path={ROUTES.schedules.add} element={<FormularioHorario />} />
        {/* <Route path={`${ROUTES.schedules.modify}/:id`} element={<ModificarFormHorario />} /> */}

        {/* Suscripciones */}
        <Route path={ROUTES.subscriptions.default} element={<Suscripciones />} />
        {/* <Route path={ROUTES.subscriptions.add} element={<FormularioSuscripcion />} /> */}
        {/* <Route path={`${ROUTES.subscriptions.modify}/:id`} element={<ModificarFormSuscripcion />} /> */}

        {/* Ventas */}
        <Route path={ROUTES.sales.default} element={<Ventas />} />
        {/* <Route path={ROUTES.sales.add} element={<FormularioVenta />} /> */}
        {/* <Route path={`${ROUTES.sales.modify}/:id`} element={<ModificarFormVenta />} /> */}

        {/* Productos */}
        <Route path={ROUTES.products.default} element={<Productos />} />
        {/* <Route path={ROUTES.products.add} element={<FormularioProducto />} /> */}
        {/* <Route path={`${ROUTES.products.modify}/:id`} element={<ModificarFormProducto />} /> */}

        {/* Reportes */}
        {/* <Route path={ROUTES.reports.default} element={<Reportes />} />
      <Route path={ROUTES.reports.sales} element={<ReportesVentas />} /> */}
        {/* <Route path={ROUTES.reports.subscriptions} element={<ReportesSuscripciones />} /> */}
        {/* <Route path={ROUTES.reports.employees} element={<ReportesEmpleados />} /> */}
      </Route>
      {/* Login */}
      <Route path={ROUTES.auth.login} element={<Login />} />

      {/* Register */}
      <Route path={ROUTES.auth.register} element={<Register />} />

      {/* LogoOnlyLayout */}
      <Route path="/" element={<LogoOnlyLayout />} />
      <Route path="/" element={<Navigate to={ROUTES.default} />} />
      <Route path="/404" element={<Page404 />} />
      <Route path="*" element={<Navigate to="/404" />} />
    </Routes>
  );
}
