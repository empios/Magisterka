import axios, { AxiosInstance } from 'axios';

const apiClient: AxiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_HOST}`,
  withCredentials: true,
  headers: {
    'Access-Control-Allow-Credential': true,
  },
});

export default apiClient;
