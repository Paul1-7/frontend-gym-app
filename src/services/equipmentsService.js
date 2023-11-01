import { equipmentWithDateParse, getEquipmentsAdapter, getEquipmentsToReport } from '@/adapters';
import Axios from '@/apis';

export const URL_EQUIPMENT = {
  default: '/api/v1/maquinarias',
};

export const equipmentsList = async ({ params } = {}) => {
  const response = await Axios.get(URL_EQUIPMENT.default, { params });
  return getEquipmentsAdapter(response.data);
};
export const equipmentsListReport = async ({ params } = {}) => {
  const response = await Axios.get(URL_EQUIPMENT.default, { params });
  return getEquipmentsToReport(response.data);
};

export const getEquipmentById = async (id) => {
  const response = await Axios.get(`${URL_EQUIPMENT.default}/${id}`);
  return equipmentWithDateParse(response.data);
};

export const addEquipment = async ({ data }) => Axios.post(URL_EQUIPMENT.default, data);

export const modifyEquipment = async ({ data, id }) => Axios.put(`${URL_EQUIPMENT.default}/${id}`, data);

export const deleteEquipment = ({ id }) => Axios.delete(`${URL_EQUIPMENT.default}/${id}`);
