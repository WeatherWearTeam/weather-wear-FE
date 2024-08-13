import axios from "axios";

const BASE_URL = import.meta.env.PROD
  ? import.meta.env.VITE_SERVER_URL_PRODUCTION
  : import.meta.env.VITE_SERVER_URL_LOCAL;
  
const KakaoApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export default KakaoApi;
