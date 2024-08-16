import { createFindCode, resetPassword } from "@api/passwordApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";

//비밀번호 리셋 메일 발송
export const useCreateFindCode = () => {
  // const navigate = useNavigate();
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
      // navigate(`/my/setting`, { replace: true }); //히스토리 스택 대체 ///
    },
    onError: (error: AxiosError) => {
      return error;
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
      //비번 변경 성공했으면 알림창 띄우고 확인 버튼 누르면 /login 페이지 이동되게 해도 좋을 것 같음
      navigate(`/login`, { replace: true }); //히스토리 스택 대체
    },
    onError: (error: AxiosError) => {
      return error;
    },
  });

  return { mutateResetPassword, isError, isPending, isSuccess };
};
