import axios from 'axios';
import { onRequest, onRequestError, onResponse, onResponseError } from '@/interceptors';
import { config } from '@/config';

const Axios = axios.create({
  baseURL: config.BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

Axios.interceptors.response.use(onResponse, onResponseError);
Axios.interceptors.request.use(onRequest, onRequestError);

export default Axios;
