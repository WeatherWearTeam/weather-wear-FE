import api from "@api/api";

// 전체 Boards 리소스 조회
export const getBoards = async () => {
  const response = await api.get(`/boards`);
  return response.data;
};

// Board 리소스 생성
// FormData를 사용하는 경우 타입도 폼 데이터
export const createBoard = async (newBoardFormData: FormData) => {
  const response = await api.post(`/boards`, newBoardFormData, {
    headers: {
      "Content-Type": "multipart/form-data", // FormData를 사용하는 경우
    },
  });
  return response.data;
};
