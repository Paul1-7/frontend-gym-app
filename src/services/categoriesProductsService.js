import Axios from '@/apis';

export const URL_CATEGORY = {
  default: '/api/v1/categorias/productos',
};

export const categoriesProductsList = async () => {
  const response = await Axios.get(URL_CATEGORY.default);
  return response.data;
};

export const getCategoriesProductsItemsList = async () => {
  const response = await Axios.get(URL_CATEGORY.default);
  return response.data;
};

export const getCategoryProductById = async (id) => {
  const response = await Axios.get(`${URL_CATEGORY.default}/${id}`);
  return response.data;
};

export const addCategoryProduct = async ({ data }) => Axios.post(URL_CATEGORY.default, data);

export const modifyCategoryProduct = async ({ data, id }) => Axios.put(`${URL_CATEGORY.default}/${id}`, data);

export const deleteCategoryProduct = ({ id }) => Axios.delete(`${URL_CATEGORY.default}/${id}`);
