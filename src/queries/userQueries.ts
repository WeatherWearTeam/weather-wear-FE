import {
  deleteUser,
  getBoardsByUserId,
  getMe,
  getUserById,
  signUpUser,
  SignUpUserRequest,
  updatePassword,
  updateUser,
} from "@api/userApi";
import useAlertStore from "@store/store";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";

///////////////////////////////////////////////////////////////
//회원가입
interface ErrorResponse {
  message: string;
}

export const useCreateUser = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { setAlert } = useAlertStore();

  const {
    mutate: mutateCreateUser,
    isPending,
    isError,
    isSuccess,
    error: errorSignup,
  } = useMutation<any, AxiosError<ErrorResponse>, SignUpUserRequest>({
    mutationFn: signUpUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      navigate("/login");
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      let errorMessage = "오류가 발생했습니다.\n회원가입을 다시 시도해 주세요.";
      if (error.response) {
        errorMessage = `${error.response.data}`;
      }
      setAlert("signupError", errorMessage);
    },
  });

  return { mutateCreateUser, isError, isPending, isSuccess, errorSignup };
};

///////////////////////////////////////////////////////////////
//회원탈퇴
export const useDeleteUser = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    mutate: mutateDeleteUser,
    isPending,
    isError,
    isSuccess,
  } = useMutation({
    mutationFn: deleteUser,
    onSuccess: ({ message }) => {
      if (message === "User deleted successfully") {
        queryClient.invalidateQueries({ queryKey: ["users"] }); // 전체 사용자 쿼리 무효화
        queryClient.invalidateQueries({ queryKey: ["auth"] }); // 로그인한 사용자 정보 쿼리 무효화
        localStorage.removeItem("isLoggedIn");
        navigate("/", { replace: true }); //히스토리 스택 대체
      }
    },
    // onError: (error: AxiosError) => {
    //   // let errorMessage =
    //   //   "오류가 발생했습니다.\n회원 탈퇴를 다시 시도해 주세요.";
    //   // if (error.response) {
    //   //   errorMessage = `${error.response.data}`;
    //   // }
    // },
  });

  return { mutateDeleteUser, isError, isPending, isSuccess };
};

///////////////////////////////////////////////////////////////
//회원 수정
export const useUpdateUser = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    mutate: mutateUpdateUser,
    isPending,
    isError,
    isSuccess,
  } = useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] }); //전체 보드
      queryClient.invalidateQueries({ queryKey: ["auth"] }); // 로그인한 사용자 정보 쿼리 무효화
      navigate(`/my/setting`, { replace: true }); //히스토리 스택 대체
    },
    onError: (error: AxiosError) => {
      let errorMessage = "오류가 발생했습니다.\n다시 시도해 주세요.";
      if (error.response) {
        errorMessage = `${error.response.data}`;
        console.log(errorMessage);
      }
    },
  });

  return { mutateUpdateUser, isError, isPending, isSuccess };
};

///////////////////////////////////////////////////////////////
//회원 수정: 비밀번호만 수정
export const useUpdatePassword = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    mutate: mutateUpdatePassword,
    isPending,
    isError,
    isSuccess,
  } = useMutation({
    mutationFn: updatePassword,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] }); //전체 보드
      queryClient.invalidateQueries({ queryKey: ["auth"] }); // 로그인한 사용자 정보 쿼리 무효화
      navigate(`/my/setting`, { replace: true }); //히스토리 스택 대체
    },
    onError: (error: AxiosError) => {
      let errorMessage =
        "오류가 발생했습니다.\n비밀번호를 수정을 다시 시도해 주세요.";
      if (error.response) {
        errorMessage = `${error.response.data}`;
        console.log(errorMessage);
      }
    },
  });

  return { mutateUpdatePassword, isError, isPending, isSuccess };
};

///////////////////////////////////////////////////////////////

export type Gender = "MALE" | "FEMALE";

export interface UserProfile {
  id: number;
  email: string;
  nickname: string;
  image: string | null;
  gender: Gender;
  birthday: string;
}

export interface UseMeResponse {
  me: UserProfile | undefined;
  isPending: boolean;
  isError: boolean;
  isSuccess: boolean;
}

//로그인한 사용자 정보
export const useMe = (isLoggedIn: boolean): UseMeResponse => {
  const {
    data: me,
    isPending,
    isError,
    isSuccess,
  } = useQuery({
    queryKey: ["auth"], //로그인, 로그아웃이랑 같은 키
    queryFn: getMe,
    enabled: isLoggedIn, // 로그인 상태일 때만 쿼리를 활성화
    staleTime: 1000 * 60 * 60, // 1시간 동안 데이터를 신선하게 유지
    gcTime: 1000 * 60 * 60 * 24, // 24시간 동안 캐시에 데이터 유지
  });

  return { me, isPending, isError, isSuccess };
};

///////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////
//특정 유저 프로필
interface UseUserResponse {
  user: UserProfile | undefined;
  isPending: boolean;
  isError: boolean;
  isSuccess: boolean;
}

export const useUser = (userId: number): UseUserResponse => {
  const {
    data: user,
    isPending,
    isError,
    isSuccess,
  } = useQuery({
    queryKey: ["user", userId],
    queryFn: () => getUserById(userId),
    enabled: !!userId, // id가 있을 때만 쿼리를 실행
    //얘네도 캐시 설정하면 좋을 듯 ㅇㅇㅇㅇ
    // staleTime: 1000 * 60 * 60, // 1시간 동안 데이터를 신선하게 유지
    // gcTime: 1000 * 60 * 60 * 24, // 24시간 동안 캐시에 데이터 유지
  });

  return { user, isPending, isError, isSuccess };
};

///////////////////////////////////////////////////////////////
//유저의 프로필에서 보여줄 유저별 게시글
export const useBoardsByUserId = (userId: number): UseUserResponse => {
  const {
    data: user,
    isPending,
    isError,
    isSuccess,
  } = useQuery({
    queryKey: ["boardsByUser", userId], //쿼리 뭐로 해야해??
    queryFn: () => getBoardsByUserId(userId),
    enabled: !!userId, // id가 있을 때만 쿼리를 실행
    //얘네도 캐시 설정하면 좋을 듯 ㅇㅇㅇㅇ
    // staleTime: 1000 * 60 * 60, // 1시간 동안 데이터를 신선하게 유지
    // gcTime: 1000 * 60 * 60 * 24, // 24시간 동안 캐시에 데이터 유지
  });

  return { user, isPending, isError, isSuccess };
};
///////////////////////////////////////////////////////////////
