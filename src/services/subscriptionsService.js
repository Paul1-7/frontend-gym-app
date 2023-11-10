import { addIndexListAdapter, getSubscriptionToModify, subscriptionsListWithPartner } from '@/adapters';
import Axios from '@/apis';

export const URL_SUBSCRIPTIONS = {
  default: '/api/v1/suscripciones',
  lastSubscription: '/api/v1/suscripciones/ultima-suscripcion',
  mostRequestedPlans: '/api/v1/suscripciones/planes-mas-solicitados',
  actives: '/api/v1/suscripciones/activas',
};

export const subscriptionsList = async () => {
  const response = await Axios.get(URL_SUBSCRIPTIONS.default);
  return subscriptionsListWithPartner(response.data);
};

export const getLastSubscriptionsByIdSocio = async (idSocio) => {
  const response = await Axios.get(`${URL_SUBSCRIPTIONS.lastSubscription}/${idSocio}`);
  return response.data;
};

export const getSubscriptionById = async (id) => {
  const response = await Axios.get(`${URL_SUBSCRIPTIONS.default}/${id}`);
  return getSubscriptionToModify(response.data);
};

export const getMostRequestedPlans = async ({ params } = {}) => {
  const response = await Axios.get(`${URL_SUBSCRIPTIONS.mostRequestedPlans}`, { params });
  return addIndexListAdapter(response.data);
};

export const getSubscriptionsActives = async () => {
  const response = await Axios.get(`${URL_SUBSCRIPTIONS.actives}`);
  return subscriptionsListWithPartner(response.data);
};

export const addSubscriptions = async ({ data }) => Axios.post(URL_SUBSCRIPTIONS.default, data);

export const modifySubscription = async ({ data, id }) => Axios.put(`${URL_SUBSCRIPTIONS.default}/${id}`, data);

export const deleteSubscriptions = ({ id }) => Axios.delete(`${URL_SUBSCRIPTIONS.default}/${id}`);
