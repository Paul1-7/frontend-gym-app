import { lazy } from 'react';
import { DataTableProvider } from '@/context/DataTableContext';
import { Route, Routes, Navigate } from 'react-router-dom';
import { ADMIN_PATH, ROUTES } from './routes';
import PrivateRoutes from './PrivateRoutes';

const DashboardApp = lazy(() => import('@/pages/DashboardApp'));
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
// Products
const Products = lazy(() => import('@/pages/products/Products'));
const AddProduct = lazy(() => import('@/pages/products/AddProduct'));
const ModifyProduct = lazy(() => import('@/pages/products/ModifyProduct'));
// Plans
const Plans = lazy(() => import('@/pages/plans/Plans'));
const AddPlan = lazy(() => import('@/pages/plans/AddPlan'));
const ModifyPlan = lazy(() => import('@/pages/plans/ModifyPlan'));
// Planning
const Planning = lazy(() => import('@/pages/planning/Plannings'));
const AddPlanning = lazy(() => import('@/pages/planning/AddPlanning'));
const ModifyPlanning = lazy(() => import('@/pages/planning/ModifyPlanning'));
const DetailPlanning = lazy(() => import('@/pages/planning/PlanningDetail'));
// CategoriesProducts
const CategoriesProducts = lazy(() => import('@/pages/categories/products/CategoriesProducts'));
const AddCategoryProduct = lazy(() => import('@/pages/categories/products/AddCategoryProduct'));
const ModifyCategoryProduct = lazy(() => import('@/pages/categories/products/ModifyCategoryProduct'));
// CategoriesDisciplines
const CategoriesDisciplines = lazy(() => import('@/pages/categories/disciplines/CategoriesDisciplines'));
const AddCategoryDiscipline = lazy(() => import('@/pages/categories/disciplines/AddCategoryDiscipline'));
const ModifyCategoryDiscipline = lazy(() => import('@/pages/categories/disciplines/ModifyCategoryDiscipline'));
// CategoriesEquipments
const CategoriesEquipments = lazy(() => import('@/pages/categories/equipments/CategoriesEquipments'));
const AddCategoryEquipment = lazy(() => import('@/pages/categories/equipments/AddCategoryEquipment'));
const ModifyCategoryEquipment = lazy(() => import('@/pages/categories/equipments/ModifyCategoryEquipment'));

const Schedules = lazy(() => import('@/pages/schedules/Schedules'));

//Subscriptions
const Subscriptions = lazy(() => import('@/pages/suscripciones/Subscriptions'));
const AddSubscription = lazy(() => import('@/pages/suscripciones/AddSubscription'));
const ModifySubscription = lazy(() => import('@/pages/suscripciones/ModifySubscription'));

// Equipments
const Equipments = lazy(() => import('@/pages/equipments/Equipments'));
const AddEquipment = lazy(() => import('@/pages/equipments/AddEquipment'));
const ModifyEquipment = lazy(() => import('@/pages/equipments/ModifyEquipment'));

// Rols
const Rols = lazy(() => import('@/pages/rols/Rols'));
const AddRol = lazy(() => import('@/pages/rols/AddRol'));
const ModifyRol = lazy(() => import('@/pages/rols/ModifyRol'));

// reports
const SalesReport = lazy(() => import('@/pages/reports/SalesReport'));
const EquipmentReport = lazy(() => import('@/pages/reports/EquipmentReport'));
const ProductReport = lazy(() => import('@/pages/reports/ProductReport'));
const SubscriptionsReport = lazy(() => import('@/pages/reports/SubscriptionsReport'));
const SchedulesReport = lazy(() => import('@/pages/reports/SchedulesReport'));
const PlanningReport = lazy(() => import('@/pages/reports/PlanningReport'));

const Sales = lazy(() => import('@/pages/sales/Sales'));
const AddSale = lazy(() => import('@/pages/sales/AddSale'));
const SaleDetail = lazy(() => import('@/pages/sales/SaleDetail'));

const Login = lazy(() => import('@/pages/Login'));
const Register = lazy(() => import('@/pages/Register'));
const LogoOnlyLayout = lazy(() => import('@/layouts/LogoOnlyLayout'));
const Page404 = lazy(() => import('@/pages/Page404'));
const DashboardLayout = lazy(() => import('@/layouts/dashboard'));

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to={ROUTES.start} />} />
      <Route element={<PrivateRoutes />}>
        <Route element={<DashboardLayout />} path={ADMIN_PATH}>
          <Route path={ROUTES.start} element={<DashboardApp />} />
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
          {/* CategoriesProducts */}
          <Route
            path={ROUTES.categories.products.default}
            element={
              <DataTableProvider>
                <CategoriesProducts />
              </DataTableProvider>
            }
          />
          <Route path={ROUTES.categories.products.add} element={<AddCategoryProduct />} />
          <Route path={`${ROUTES.categories.products.modify}/:id`} element={<ModifyCategoryProduct />} />
          {/* CategoriesDisciplines */}
          <Route
            path={ROUTES.categories.disciplines.default}
            element={
              <DataTableProvider>
                <CategoriesDisciplines />
              </DataTableProvider>
            }
          />
          <Route path={ROUTES.categories.disciplines.add} element={<AddCategoryDiscipline />} />
          <Route path={`${ROUTES.categories.disciplines.modify}/:id`} element={<ModifyCategoryDiscipline />} />
          {/* CategoriesEquipments */}
          <Route
            path={ROUTES.categories.equipments.default}
            element={
              <DataTableProvider>
                <CategoriesEquipments />
              </DataTableProvider>
            }
          />
          <Route path={ROUTES.categories.equipments.add} element={<AddCategoryEquipment />} />
          <Route path={`${ROUTES.categories.equipments.modify}/:id`} element={<ModifyCategoryEquipment />} />
          {/* Planning */}
          <Route
            path={ROUTES.planning.default}
            element={
              <DataTableProvider>
                <Planning />
              </DataTableProvider>
            }
          />
          <Route path={ROUTES.planning.add} element={<AddPlanning />} />
          <Route path={`${ROUTES.planning.modify}/:id`} element={<ModifyPlanning />} />
          <Route path={`${ROUTES.planning.detail}/:id`} element={<DetailPlanning />} />
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
          {/* Productos */}
          <Route
            path={ROUTES.products.default}
            element={
              <DataTableProvider>
                <Products />
              </DataTableProvider>
            }
          />
          <Route path={ROUTES.products.add} element={<AddProduct />} />
          <Route path={`${ROUTES.products.modify}/:id`} element={<ModifyProduct />} />
          {/* Plans */}
          <Route
            path={ROUTES.plans.default}
            element={
              <DataTableProvider>
                <Plans />
              </DataTableProvider>
            }
          />
          <Route path={ROUTES.plans.add} element={<AddPlan />} />
          <Route path={`${ROUTES.plans.modify}/:id`} element={<ModifyPlan />} />
          {/* Equipments */}
          <Route
            path={ROUTES.equipment.default}
            element={
              <DataTableProvider>
                <Equipments />
              </DataTableProvider>
            }
          />
          <Route path={ROUTES.equipment.add} element={<AddEquipment />} />
          <Route path={`${ROUTES.equipment.modify}/:id`} element={<ModifyEquipment />} />

          {/* Suscripciones */}
          <Route
            path={ROUTES.subscriptions.default}
            element={
              <DataTableProvider>
                <Subscriptions />
              </DataTableProvider>
            }
          />
          <Route path={ROUTES.subscriptions.add} element={<AddSubscription />} />
          <Route path={`${ROUTES.subscriptions.modify}/:id`} element={<ModifySubscription />} />

          {/* Schedules */}
          <Route path={ROUTES.schedules.default} element={<Schedules />} />

          {/* Sales */}
          <Route path={ROUTES.sales.default} element={<Sales />} />
          <Route
            path={ROUTES.sales.add}
            element={
              <DataTableProvider>
                <AddSale />
              </DataTableProvider>
            }
          />
          <Route path={`${ROUTES.sales.detail}/:id`} element={<SaleDetail />} />

          {/* Reportes */}
          <Route path={ROUTES.reports.sales} element={<SalesReport />} />
          <Route path={ROUTES.reports.equipments} element={<EquipmentReport />} />
          <Route path={ROUTES.reports.products} element={<ProductReport />} />
          <Route path={ROUTES.reports.subscriptions} element={<SubscriptionsReport />} />
          <Route path={ROUTES.reports.schedules} element={<SchedulesReport />} />
          <Route path={ROUTES.reports.planning} element={<PlanningReport />} />
          {/* Rols */}
          <Route
            path={ROUTES.rols.default}
            element={
              <DataTableProvider>
                <Rols />
              </DataTableProvider>
            }
          />
          <Route path={ROUTES.rols.add} element={<AddRol />} />
          <Route path={`${ROUTES.rols.modify}/:id`} element={<ModifyRol />} />
        </Route>
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
