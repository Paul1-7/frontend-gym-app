import { SnackbarUtilities } from '@/utils';

export const onResponse = (response) => {
  if (response.data?.message) {
    SnackbarUtilities.success(response.data?.message);
  }

  return response;
};

export const onResponseError = (error) => {
  const response = error.response?.data;
  if (typeof response === 'string') {
    SnackbarUtilities.error(response);
    throw response;
  }
  if (typeof response === 'object') {
    const errorMesage = response?.message;
    SnackbarUtilities.error(errorMesage);
    throw errorMesage;
  }

  SnackbarUtilities.error('Ha ocurrido un error');
  throw error;
};

export const onRequest = (config) => {
  return config;
};

export const onRequestError = (config) => {
  return config;
};
