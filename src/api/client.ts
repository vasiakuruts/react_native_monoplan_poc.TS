import axios from 'axios';

import { store } from '../store';
import * as GlobalActions from '../store/global/actions';

const API_URL = 'http://localhost:3001';

export const client = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

client.interceptors.response.use((response: any) => {
  return response;
}, (error: any) => {
  if (error.message === 'Network Error') {
    store.dispatch(GlobalActions.setError('Ошибка подключения к серверу'));
  }
  return Promise.reject(error);
});

