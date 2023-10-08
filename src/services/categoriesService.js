import { getCategoriesItemsList as getCategoriesItemsListAdapter, getCategoryToModify } from '@/adapters';
import Axios from '@/apis';

export const URL_CATEGORY = {
  default: '/api/v1/categorias',
};

export const categoriesList = async (query = '') => {
  const response = await Axios.get(URL_CATEGORY.default + query);
  return response.data;
};

export const getCategoriesItemsList = async (query = '') => {
  const response = await Axios.get(URL_CATEGORY.default + query);
  return getCategoriesItemsListAdapter(response.data);
};

export const getCategoryById = async (id) => {
  const response = await Axios.get(`${URL_CATEGORY.default}/${id}`);
  return getCategoryToModify(response.data);
};

export const addCategory = async ({ data }) => Axios.post(URL_CATEGORY.default, data);

export const modifyCategory = async ({ data, id }) => Axios.put(`${URL_CATEGORY.default}/${id}`, data);

export const deleteCategory = ({ id }) => Axios.delete(`${URL_CATEGORY.default}/${id}`);
