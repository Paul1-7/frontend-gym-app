import Axios from '@/apis';

export const URL_PLAN = {
  default: '/api/v1/planes',
};

export const plansList = async () => {
  const response = await Axios.get(URL_PLAN.default);
  return response.data;
};

export const getPlanById = async (id) => {
  const response = await Axios.get(`${URL_PLAN.default}/${id}`);
  return response.data;
};

export const addPlan = async ({ data }) => Axios.post(URL_PLAN.default, data);

export const modifyPlan = async ({ data, id }) => Axios.put(`${URL_PLAN.default}/${id}`, data);

export const deletePlan = ({ id }) => Axios.delete(`${URL_PLAN.default}/${id}`);
