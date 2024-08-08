import axios from "axios";

// const BASE_URL = import.meta.env.PROD
//  ? import.meta.env.VITE_SERVER_URL_PRODUCTION
//  : import.meta.env.VITE_SERVER_URL_LOCAL;

const api = axios.create({
  // baseURL: BASE_URL, //base_url 끄고 localhost로 설정되어 있어야 프록시 가능 ㅇㅇ
  headers: {
    "Content-Type": "application/json", // 기본 Content-Type 설정
  },
  withCredentials: true, //기본 설정 값
});

//////////////////////////////////////////////////////////////////////////////////////

// multipart/form-data 적용할 엔드포인트 리스트
// const multipartEndpoints = ["/api/boards", "/api/clothes", "/api/users"];

// 요청 인터셉터 추가
//api.interceptors.request.use(
//  (config) => {
//    // post, put 요청일 때 && multipartEndpoints 리스트에 포함된 경우 => Content-Type 변경
//    if (
//      (config.method === "post" || config.method === "put") &&
//      multipartEndpoints.some((endpoint) => config.url?.startsWith(endpoint)) &&
//      config.data instanceof FormData
//    ) {
//      config.headers["Content-Type"] = "multipart/form-data";
//    }

//    return config;
//  },
//  (error) => {
//    return Promise.reject(error);
//  }
// );

// 응답 인터셉터 (선택사항)
//api.interceptors.response.use(
//  (response) => {
//    return response;
//  },
//  (error) => {
//    return Promise.reject(error);
//  }
//);

export default api;
