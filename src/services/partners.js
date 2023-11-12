import { addIndexListAdapter, getPartnerListWithFullName } from '@/adapters';
import Axios from '@/apis';

export const URL_PARTNERS = {
  default: '/api/v1/socios',
  withLargestSubscription: '/api/v1/socios/mayor-suscripciones',
  moreBuyers: '/api/v1/socios/mas-compradores',
};

export const partnersList = async () => {
  const response = await Axios.get(URL_PARTNERS.default);
  if (response.status >= 400) throw response.data;
  return response.data;
};

export const partnerMoreBuyers = async ({ params } = {}) => {
  const response = await Axios.get(URL_PARTNERS.moreBuyers, { params });
  if (response.status >= 400) throw response.data;
  return addIndexListAdapter(response.data);
};

export const partnersWithLargerstSubscription = async ({ params } = {}) => {
  const response = await Axios.get(URL_PARTNERS.withLargestSubscription, { params });
  if (response.status >= 400) throw response.data;
  return addIndexListAdapter(response.data);
};

export const partnersListFullName = async (query = '') => {
  const response = await Axios.get(URL_PARTNERS.default + query);
  return getPartnerListWithFullName(response.data);
};

export const getPartnerById = async (id) => {
  const response = await Axios.get(`${URL_PARTNERS.default}/${id}`);
  if (response.status >= 400) throw response.data;

  return response.data;
};

export const addPartner = async ({ data }) => Axios.post(URL_PARTNERS.default, data);

export const modifyPartner = async ({ data, id }) => Axios.put(`${URL_PARTNERS.default}/${id}`, data);

export const deletePartner = ({ id }) => Axios.delete(`${URL_PARTNERS.default}/${id}`);
