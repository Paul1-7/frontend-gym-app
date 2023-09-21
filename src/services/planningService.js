import Axios from '@/apis';

export const URL_PLANNING = {
  default: '/api/v1/programaciones',
};

export const planningList = async (query = '') => {
  const response = await Axios.get(URL_PLANNING.default + query);
  return response.data;
};

export const getPlanningById = async (id) => {
  const response = await Axios.get(`${URL_PLANNING.default}/${id}`);
  return response.data;
};

export const addPlanning = async ({ data }) => Axios.post(URL_PLANNING.default, data);

export const modifyPlanning = async ({ data, id }) => Axios.put(`${URL_PLANNING.default}/${id}`, data);

