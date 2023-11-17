import { getRolToModify, getRolsListChipAdapter } from '@/adapters';
import Axios from '@/apis';

export const URL_ROL = {
  default: '/api/v1/roles',
};

export const rolsList = async ({ params = {} }) => {
  const response = await Axios.get(URL_ROL.default, { params });
  return response.data;
};

export const rolsListItemsChip = async ({ params = {} } = {}) => {
  const response = await Axios.get(URL_ROL.default, { params });
  return getRolsListChipAdapter(response.data);
};

export const getRolById = async (id) => {
  const response = await Axios.get(`${URL_ROL.default}/${id}`);
  return getRolToModify(response.data);
};

export const addRol = async ({ data }) => Axios.post(URL_ROL.default, data);

export const modifyRol = async ({ data, id }) => Axios.put(`${URL_ROL.default}/${id}`, data);

export const deleteRol = ({ id }) => Axios.delete(`${URL_ROL.default}/${id}`);
