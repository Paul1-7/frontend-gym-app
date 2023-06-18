import Axios from '@/apis';

export const URL_PLANS = {
  default: '/api/v1/planes',
};

export const plansList = async () => {
  const response = await Axios.get(URL_PLANS.default);
  if (response.status >= 400) throw response.data;

  return response.data;
};

export const getPlanById = async (id) => {
  const response = await Axios.get(`${URL_PLANS.default}/${id}`);
  if (response.status >= 400) throw response.data;

  return response.data;
};

export const addPlan = async ({ data }) => Axios.post(URL_PLANS.default, data);

export const modifyPlan = async ({ data, id }) => Axios.put(`${URL_PLANS.default}/${id}`, data);

export const deletePlan = async ({ id }) => Axios.delete(`${URL_PLANS.default}/${id}`);
