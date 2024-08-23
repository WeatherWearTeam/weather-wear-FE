import axios from "axios";

// const BASE_URL = import.meta.env.PROD
//   ? import.meta.env.VITE_SERVER_URL_PRODUCTION
//   : import.meta.env.VITE_SERVER_URL_LOCAL; //개발환경에서 localhost로 설정되어 있어야 서버로 프록시 가능

const BASE_URL = import.meta.env.VITE_SERVER_URL_PRODUCTION;

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// 응답 받기 전
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    //refresh token까지 만료되면 로컬스토리지 지우고 로그아웃, 로그인 페이지로 리다이렉트
    if (
      error.response.status === 401 &&
      error.response.data === "Refresh Token expired or invalid." //로그인 인증 에러랑 분기 처리
    ) {
      //모달로 처리하기
      const isConfirmed = confirm(
        "로그인 기간이 만료되었습니다. 확인 버튼을 누르면 로그인 페이지로 이동합니다."
      );

      if (isConfirmed) {
        localStorage.removeItem("ISLOGGEDIN");
        window.location.replace("/login");
      }
    }
    return Promise.reject(error);
  }
);

export default api;
