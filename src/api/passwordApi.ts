import api from "@api/api";

//비밀번호 리셋 메일 발송

export interface FindCodeRequest {
  email: string;
}

export const createFindCode = async (email: FindCodeRequest) => {
  try {
    const response = await api.post(`/api/password/forgot`, email, {
      withCredentials: false, //퍼블릭 페이지: 자격 증명 포함하지 않음
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

//////////////////////////////////////////////////////////
//비밀번호 리셋 요청
export interface ResetPasswordRequest {
  code: string;
  newPassword: string;
  newPasswordCheck: string;
}

export const resetPassword = async (passwords: ResetPasswordRequest) => {
  try {
    console.log(passwords);
    const response = await api.post(`/api/password/reset`, passwords, {
      withCredentials: false, //퍼블릭 페이지: 자격 증명 포함하지 않음
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
