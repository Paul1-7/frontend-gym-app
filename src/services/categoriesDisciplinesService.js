import Axios from '@/apis';

export const URL_CATEGORY = {
  default: '/api/v1/categorias/disciplinas',
};

export const categoriesDisciplinesList = async () => {
  const response = await Axios.get(URL_CATEGORY.default);
  return response.data;
};

export const getCategoriesDisciplinesItemsList = async () => {
  const response = await Axios.get(URL_CATEGORY.default);
  return response.data;
};

export const getCategoryDisciplineById = async (id) => {
  const response = await Axios.get(`${URL_CATEGORY.default}/${id}`);
  return response.data;
};

export const addCategoryDiscipline = async ({ data }) => Axios.post(URL_CATEGORY.default, data);

export const modifyCategoryDiscipline = async ({ data, id }) => Axios.put(`${URL_CATEGORY.default}/${id}`, data);

export const deleteCategoryDiscipline = ({ id }) => Axios.delete(`${URL_CATEGORY.default}/${id}`);
