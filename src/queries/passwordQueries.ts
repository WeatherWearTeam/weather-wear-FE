import { createFindCode, resetPassword } from "@api/passwordApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";

//비밀번호 리셋 메일 발송
export const useCreateFindCode = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    mutate: mutateCreateFindCode,
    isPending: isPendingCreateFindCode,
    isError: isErrorCreateFindCode,
    isSuccess: isSuccessCreateFindCode,
  } = useMutation({
    mutationFn: createFindCode,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["password"] }); //전체 보드
      navigate(`/my/setting`, { replace: true }); //히스토리 스택 대체
      //   window.history.go(-2); // 비번 수정 & 내 정보 수정 페이지 자체 히스토리에서 빼고 가기
    },
    onError: (error: AxiosError) => {
      let errorMessage = "오류가 발생했습니다.\n다시 시도해 주세요.";
      if (error.response) {
        errorMessage = `${error.response.data}`;
        console.log(errorMessage);
      }
    },
  });

  return {
    mutateCreateFindCode,
    isPendingCreateFindCode,
    isErrorCreateFindCode,
    isSuccessCreateFindCode,
  };
};

//////////////////////////////////////////////////////////
//비밀번호 리셋 요청
export const useResetPassword = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    mutate: mutateResetPassword,
    isPending,
    isError,
    isSuccess,
  } = useMutation({
    mutationFn: resetPassword,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] }); //전체 보드
      navigate(`/login`, { replace: true }); //히스토리 스택 대체
      // window.history.go(-1); // 비번 수정 & 내 정보 수정 페이지 자체 히스토리에서 빼고 가기
    },
    onError: (error: AxiosError) => {
      let errorMessage = "오류가 발생했습니다.\n다시 시도해 주세요.";
      if (error.response) {
        errorMessage = `${error.response.data}`;
        console.log(errorMessage);
      }
    },
  });

  return { mutateResetPassword, isError, isPending, isSuccess };
};
