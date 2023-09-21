import { schedulesListToDetail } from '@/adapters';
import Axios from '@/apis';

export const URL_SCHEDULE = {
  default: '/api/v1/horarios',
};

export const schedulesList = async () => {
  const response = await Axios.get(URL_SCHEDULE.default);
  return response.data;
};

export const schedulesListItems = async (query = '') => {
  const response = await Axios.get(URL_SCHEDULE.default + query);
  return response.data;
};

export const schedulesListDetail = async () => {
  const response = await Axios.get(URL_SCHEDULE.default);
  return schedulesListToDetail(response.data);
};

export const getScheduleById = async (id) => {
  const response = await Axios.get(`${URL_SCHEDULE.default}/${id}`);
  return response.data;
};

export const addSchedule = async ({ data }) => Axios.post(URL_SCHEDULE.default, data);

export const modifySchedule = async ({ data, id }) => Axios.put(`${URL_SCHEDULE.default}/${id}`, data);

export const deleteSchedule = ({ id }) => Axios.delete(`${URL_SCHEDULE.default}/${id}`);
