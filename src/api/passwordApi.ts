import api from "@api/api";

export interface FindCodeRequest {
  email: string;
}

//비밀번호 리셋 메일 발송
export const createFindCode = async (email: FindCodeRequest) => {
  const response = await api.post(`password/forgot`, email, {
    withCredentials: false, //퍼블릭 페이지: 자격 증명 포함하지 않음
  });
  return response.data;
};

//////////////////////////////////////////////////////////
//비밀번호 리셋 요청
export interface ResetPasswordRequest {
  code: string;
  newPassword: string;
  newPasswordCheck: string;
}

export const resetPassword = async (passwords: ResetPasswordRequest) => {
  const response = await api.post(`password/reset`, passwords, {
    withCredentials: false, //퍼블릭 페이지: 자격 증명 포함하지 않음
  });
  return response.data;
};
