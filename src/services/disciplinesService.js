import { getActivesRegisters } from '@/adapters';
import Axios from '@/apis';

export const URL_DISCIPLINE = {
  default: '/api/v1/disciplinas',
};

export const disciplinesList = async () => {
  const response = await Axios.get(URL_DISCIPLINE.default);
  return response.data;
};

export const activeDisciplinesList = async () => {
  const response = await Axios.get(URL_DISCIPLINE.default);
  return getActivesRegisters(response.data);
};

export const getDisciplineById = async (id) => {
  const response = await Axios.get(`${URL_DISCIPLINE.default}/${id}`);
  return response.data;
};

export const addDiscipline = async ({ data }) => Axios.post(URL_DISCIPLINE.default, data);

export const modifyDiscipline = async ({ data, id }) => Axios.put(`${URL_DISCIPLINE.default}/${id}`, data);

export const deleteDiscipline = ({ id }) => Axios.delete(`${URL_DISCIPLINE.default}/${id}`);
