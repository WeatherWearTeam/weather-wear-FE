import api from "@api/api";

//회원가입
export interface SignUpUserRequest {
  email: string;
  nickname: string;
  password: string;
  passwordCheck: string;
  gender: string;
  birthday: string;
}

//유저 생성
export const signUpUser = async (newUser: SignUpUserRequest) => {
  const response = await api.post(`users`, newUser, {
    withCredentials: false, //퍼블릭 페이지: 자격 증명 포함하지 않음
  });
  return response.data;
};

//유저 삭제
export const deleteUser = async () => {
  //회원 탈퇴시 보통은 myId 넣는데 이미 설정되어 있다고 하니 프론트에선 할 필요 없음
  const response = await api.delete(`users`);
  return response.data;
};

////////////////////////////////////////////////////////////
//유저 업데이트
export const updateUser = async (formData: FormData) => {
  const response = await api.put(`users`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

////////////////////////////////////////////////////////////
//유저 업데이트: 비밀번호만
export interface UpdatePasswordRequest {
  currentPassword: string;
  newPassword: string;
  newPasswordCheck: string;
}

export const updatePassword = async (passwords: UpdatePasswordRequest) => {
  const response = await api.put(`users/password`, passwords);
  return response.data;
};

// 로그인한 유저 프로필 조회
export const getMe = async () => {
  const response = await api.get("users/me");
  return response.data;
};
///////////////////////////////////////////////////////////////

//일단 만들어는 두자~
//특정 사용자 프로필 조회
export const getUserById = async (userId: number) => {
  const response = await api.get(`users/${userId}`);
  return response.data;
};

//특정 사용자의 프로필 페이지 > ootd 보드 보여주기
export const getBoardsByUserId = async (userId: number) => {
  const response = await api.get(`users/${userId}/boards`);
  return response.data;
};
