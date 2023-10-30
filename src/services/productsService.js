import { getProductsToReport, productWithDateParse } from '@/adapters';
import Axios from '@/apis';

export const URL_PRODUCTS = {
  default: '/api/v1/productos',
};

export const productsList = async () => {
  const response = await Axios.get(URL_PRODUCTS.default);
  return response.data;
};

export const productsListReport = async ({ params }) => {
  const response = await Axios.get(URL_PRODUCTS.default, { params });
  return getProductsToReport(response.data);
};

export const getProductById = async (id) => {
  const response = await Axios.get(`${URL_PRODUCTS.default}/${id}`);
  return productWithDateParse(response.data);
};

export const addProduct = async ({ data }) => Axios.post(URL_PRODUCTS.default, data);

export const modifyProduct = async ({ data, id }) => Axios.put(`${URL_PRODUCTS.default}/${id}`, data);

export const deleteProduct = ({ id }) => Axios.delete(`${URL_PRODUCTS.default}/${id}`);
