import { getSalesListWithPersonName, getSalesToReport } from '@/adapters';
import Axios from '@/apis';

export const URL_SALES = {
  default: '/api/v1/ventas',
  reports: '/api/v1/ventas/reporte',
};

export const salesList = async () => {
  const response = await Axios.get(URL_SALES.default);
  return getSalesListWithPersonName(response.data);
};

export const getSaleById = async (id) => {
  const response = await Axios.get(`${URL_SALES.default}/${id}`);
  return response.data;
};

export const listSalesByDates = (params) =>
  Axios.get(`${URL_SALES.reports}${params}`).then((res) => {
    return getSalesToReport(res.data);
  });

export const addSale = async ({ data }) => Axios.post(URL_SALES.default, data);
