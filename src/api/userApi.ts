////////////////////////////////////////////////////////////

import api from "@api/api";
import axios, { AxiosError } from "axios";

// withCredentials false인 엔드포인트 리스트(퍼블릭 엔드포인트)
// const noCredentialsEndpoints = [
// { url: "/api/users", method: "post" }, //회원 가입
// { url: "/api/boards", method: "get" }, //트렌드
// { url: /^\/api\/boards\/\d+$/, method: "get" }, //게시물 상세
// { url: /^\/api\/boards\/\d+\/comments$/, method: "get" }, //게시물 댓글
// { url: "/api/weathers", method: "get" }, //날씨
// { url: /^\/api\/users\/\d+\/boards$/, method: "get" }, // 유저 아이디별 boards => 프로필 만들 경우
// ];

// multipart/form-data 적용할 엔드포인트 리스트
// const multipartEndpoints = ["/boards", "/clothes", "/users"];

//회원가입
export interface SignUpUserRequest {
  email: string;
  nickname: string;
  password: string;
  passwordCheck: string;
  gender: string;
  birthday: string;
}

export const signUpUser = async (newUser: SignUpUserRequest) => {
  const response = await api.post(`/api/users`, newUser, {
    withCredentials: false, //퍼블릭 페이지: 자격 증명 포함하지 않음
  });
  return response.data;
};

////////////////////////////////////////////////////////////
//유저 삭제

export const deleteUser = async () => {
  //회원 탈퇴시 보통은 myId 넣는데 이미 설정되어 있다고 하니 프론트에선 할 필요 없음
  const response = await api.delete(`/api/users`);
  return response.data;
};

////////////////////////////////////////////////////////////
//유저 업데이트

export const updateUser = async (formData: FormData) => {
  try {
    const response = await api.put(`/api/users`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

////////////////////////////////////////////////////////////
//유저 업데이트: 비밀번호만
export interface UpdatePasswordRequest {
  currentPassword: string;
  newPassword: string;
  newPasswordCheck: string;
}

export const updatePassword = async (passwords: UpdatePasswordRequest) => {
  try {
    const response = await api.put(`/api/users/password`, passwords);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// 로그인한 유저 프로필 조회
export const getMe = async () => {
  try {
    const response = await api.get("/api/users/me");
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error("Server responded with a status:", error.response?.status);
      console.error("Response data:", error.response?.data);
    } else {
      console.error("Error message:", (error as Error).message);
    }
    throw error;
  }
};
///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////

//일단 만들어는 두자~
//특정 사용자 프로필 조회
export const getUserById = async (userId: number) => {
  const response = await api.get(`/api/users/${userId}`);
  return response.data;
};

//특정 사용자의 프로필 페이지 > ootd 보드 보여주기
export const getBoardsByUserId = async (userId: number) => {
  const response = await api.get(`/api/users/${userId}/boards`);
  return response.data;
};
///////////////////////////////////////////////////////////////
