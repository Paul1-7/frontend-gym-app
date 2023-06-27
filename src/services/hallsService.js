import { getActivesRegisters, getHallListWithCapacityAndName } from '@/adapters';
import Axios from '@/apis';

export const URL_HALL = {
  default: '/api/v1/salones',
};

export const hallsList = async () => {
  const response = await Axios.get(URL_HALL.default);
  return response.data;
};

export const activeHallsList = async () => {
  const response = await Axios.get(URL_HALL.default);
  const activeHalls = getActivesRegisters(response.data);
  return getHallListWithCapacityAndName(activeHalls);
};

export const getHallById = async (id) => {
  const response = await Axios.get(`${URL_HALL.default}/${id}`);
  return response.data;
};

export const addHall = async ({ data }) => Axios.post(URL_HALL.default, data);

export const modifyHall = async ({ data, id }) => Axios.put(`${URL_HALL.default}/${id}`, data);

export const deleteHall = ({ id }) => Axios.delete(`${URL_HALL.default}/${id}`);
