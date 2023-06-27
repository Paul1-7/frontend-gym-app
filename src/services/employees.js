import { employeeListWithNameRols, employeeWithIDRols, getEmployeesListWithFullName } from '@/adapters';
import Axios from '@/apis';

export const URL_EMPLOYEE = {
  default: '/api/v1/empleados',
  trainers: '/api/v1/empleados/entrenadores',
};

export const employeesList = async () => {
  const response = await Axios.get(URL_EMPLOYEE.default);
  return employeeListWithNameRols(response.data);
};

export const trainersList = async () => {
  const response = await Axios.get(URL_EMPLOYEE.trainers);
  return getEmployeesListWithFullName(response.data);
};

export const getEmployeeById = async (id) => {
  const response = await Axios.get(`${URL_EMPLOYEE.default}/${id}`);
  return employeeWithIDRols(response.data);
};

export const addEmployee = async ({ data }) => Axios.post(URL_EMPLOYEE.default, data);

export const modifyEmployee = async ({ data, id }) => Axios.put(`${URL_EMPLOYEE.default}/${id}`, data);

export const deleteEmployee = ({ id }) => Axios.delete(`${URL_EMPLOYEE.default}/${id}`);
