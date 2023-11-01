import Axios from '@/apis';

export const URL_CATEGORY = {
  default: '/api/v1/categorias/maquinarias',
};

export const categoriesEquipmentsList = async () => {
  const response = await Axios.get(URL_CATEGORY.default);
  return response.data;
};

export const getCategoriesEquipmentsItemsList = async () => {
  const response = await Axios.get(URL_CATEGORY.default);
  return response.data;
};

export const getCategoryEquipmentById = async (id) => {
  const response = await Axios.get(`${URL_CATEGORY.default}/${id}`);
  return response.data;
};

export const addCategoryEquipment = async ({ data }) => Axios.post(URL_CATEGORY.default, data);

export const modifyCategoryEquipment = async ({ data, id }) => Axios.put(`${URL_CATEGORY.default}/${id}`, data);

export const deleteCategoryEquipment = ({ id }) => Axios.delete(`${URL_CATEGORY.default}/${id}`);
