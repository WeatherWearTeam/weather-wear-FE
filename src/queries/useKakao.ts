import api from "@api/api";
import {
  useMutation,
  useQueries,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";

export const getKakaoLoginAuth = async () => {
  console.log("🍪 카카오 로그인");
  const response = await api.get(`/kauth`, {
    params: {
      client_id: import.meta.env.VITE_KAKAO_LOGIN_REST_API_KEY,
      redirect_uri: import.meta.env.VITE_KAKAO_LOGIN_REDIRECT_URI,
      response_type: "code",
    },
    withCredentials: false,
  });

  console.log(response);
  return response.data;
};

const useKakao = (isKakaoLoginClicked: boolean) => {
  const navigate = useNavigate();

  const {
    data: kakaoLoginAuthData,
    isPending: isPendingKakaoLogin,
    isError: isErrorKakaoLogin,
    isSuccess: isSuccessKakaoLogin,
  } = useQuery({
    queryKey: ["auth"],
    queryFn: getKakaoLoginAuth,
    enabled: isKakaoLoginClicked,
  });

  // const {
  //   mutate: mutateKakaoLogin,
  //   isPending: isPendingKakaoLogin,
  //   // isError,
  // } = useMutation({
  //   mutationFn: loginKakao,
  //   onSuccess: ({ message }) => {
  //     if (message) {
  //       console.log(message);
  //       // localStorage.setItem("ISLOGGEDIN", "true");
  //     }
  //     queryClient.invalidateQueries({ queryKey: ["auth"] });
  //     // navigate("/"); //페이지 이동
  //   },
  //   onError: (error: AxiosError) => {
  //     let errorMessage = "오류가 발생했습니다.\n다시 시도해 주세요.";
  //     if (error.response) {
  //       errorMessage = `${error.response.data}`;
  //       console.log(errorMessage);
  //     }
  //   },
  // });

  // const {
  //   mutate: mutateKakaoLogout,
  //   isPending: isPendingKakaoLogout,
  //   // isError,
  // } = useMutation({
  //   mutationFn: logout,
  //   onSuccess: () => {
  //     localStorage.removeItem("ISLOGGEDIN");
  //     // queryClient.invalidateQueries({ queryKey: ["auth"] }); // 이거지우니까 에러 안뜸 //없는데 호출해서 그런거였음
  //     navigate("/"); //페이지 이동
  //   },
  // });

  // //로그인 확인 불리언 값
  // const isLoggedIn = !!localStorage.getItem("ISLOGGEDIN");

  return {
    kakaoLoginAuthData,
    isPendingKakaoLogin,
    isErrorKakaoLogin,
    isSuccessKakaoLogin,
    // mutateKakaoLogout,
    // isPendingKakaoLogout,
    // isLoggedIn,
  };
};

export default useKakao;
