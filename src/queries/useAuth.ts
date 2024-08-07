import api from "@api/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

//로그인
export interface LoginUserRequest {
  username: string;
  password: string;
}

// 로그인
const login = async (user: LoginUserRequest) => {
  const response = await api.post(`/api/login`, user);
  return response.data;
};

//로그아웃
const logout = async () => {
  try {
    await api.post(`/api/logout`);
  } catch (error) {
    console.error("Logout failed:", error);
    throw error;
  }
};

////////////////////////////////////////////////////////////

const useAuth = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    mutate: mutateLogin,
    isPending: isPendingLogin,
    // isError,
  } = useMutation({
    mutationFn: login,
    onSuccess: ({ message }) => {
      console.log(message);
      if (message) {
        localStorage.setItem("ISLOGGEDIN", "true");
      }
      queryClient.invalidateQueries({ queryKey: ["auth"] });
      navigate("/"); //페이지 이동
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
  });

  //로그인 확인 불리언 값
  const isLoggedIn = !!localStorage.getItem("ISLOGGEDIN");

  return {
    mutateLogin,
    mutateLogout,
    isPendingLogin,
    isPendingLogout,
    isLoggedIn,
  };
};

export default useAuth;
