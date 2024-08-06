import api from "@api/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCookies } from "react-cookie";
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
  // const [cookies, , removeCookie] = useCookies(["Authorization"]);

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
      // 서버에서 HttpOnly 쿠키를 설정해주므로 클라이언트에서 쿠키를 설정할 필요가 없음
      //     setCookie("accessToken", accessToken, {
      //       path: "/",
      //       secure: true,
      //       sameSite: "lax",
      //       maxAge: 3600, //1시간 (s)
      //       //만료 시간을 UTC 기준으로 표시하기 때문에 KST 보다 -9시간이긴 하지만 기능상 문제는 없음
      //     });
      //   }
    },
  });

  const {
    mutate: mutateLogout,
    isPending: isPendingLogout,
    // isError,
  } = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      // removeCookie("Authorization");
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
