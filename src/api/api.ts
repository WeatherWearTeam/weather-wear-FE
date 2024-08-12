import axios from "axios";

const BASE_URL = import.meta.env.PROD
  ? import.meta.env.VITE_SERVER_URL_PRODUCTION
  : import.meta.env.VITE_SERVER_URL_LOCAL; //개발환경에서 localhost로 설정되어 있어야 서버로 프록시 가능

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export default api;
