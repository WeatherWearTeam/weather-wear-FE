import api from "@api/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";

//로그인
export interface LoginUserRequest {
  username: string;
  password: string;
}

// 로그인
const login = async (user: LoginUserRequest) => {
  const response = await api.post(`login`, user);
  return response.data;
};

//로그아웃
const logout = async () => {
  try {
    await api.post(`logout`);
  } catch (error) {
    console.error("Logout failed:", error);
    throw error;
  }
};

////////////////////////////////////////////////////////////
interface ErrorResponse {
  message: string;
}

const useAuth = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    mutate: mutateLogin,
    isPending: isPendingLogin,
    isError: isErrorLogin,
    error: errorLogin,
    //성공시 리스폰스 데이터 / 에러시 리스폰스 에러 / 전달된 리퀘스트 인자
  } = useMutation<any, AxiosError<ErrorResponse>, LoginUserRequest>({
    mutationFn: login,
    onSuccess: ({ message }) => {
      if (message) {
        localStorage.setItem("ISLOGGEDIN", "true");
      }
      queryClient.invalidateQueries({ queryKey: ["auth"] });
      navigate("/"); //페이지 이동
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      console.log(error);
      let errorMessage = "오류가 발생했습니다.\n다시 시도해 주세요.";
      if (error.response) {
        errorMessage = `${error.response.data}`;
        console.log(errorMessage);
      }
    },
  });

  const {
    mutate: mutateLogout,
    isPending: isPendingLogout,
    // isError,
  } = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      localStorage.removeItem("ISLOGGEDIN");
      // queryClient.invalidateQueries({ queryKey: ["auth"] }); // 이거지우니까 에러 안뜸 //없는데 호출해서 그런거였음
      navigate("/"); //페이지 이동
    },
    onError: (error: AxiosError) => {
      let errorMessage = "오류가 발생했습니다.\n다시 시도해 주세요.";
      if (error.response) {
        errorMessage = `${error.response.data}`;
        console.log(errorMessage);
      }
    },
  });

  //로그인 확인 불리언 값
  const isLoggedIn = !!localStorage.getItem("ISLOGGEDIN");

  return {
    mutateLogin,
    mutateLogout,
    isPendingLogin,
    isPendingLogout,
    isErrorLogin,
    errorLogin,
    isLoggedIn,
  };
};

export default useAuth;
