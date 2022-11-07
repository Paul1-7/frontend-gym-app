import axios from 'axios';
import configData from 'config';

const { BASE_URL } = configData;

const Axios = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

export default Axios;
