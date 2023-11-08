import { getMenusListAdapter } from '@/adapters';
import Axios from '@/apis';

export const URL_MENUS = {
  default: '/api/v1/menus',
};

export const menuItemsList = async ({ params = {} } = {}) => {
  const response = await Axios.get(URL_MENUS.default, { params });
  return getMenusListAdapter(response.data);
};
