import api from "@api/api";

//OOTD 게시글 올리기
export const addBoard = async (newBoard: Omit<BOARD, "id">) => {
  const response = await api.post(`/board`, newBoard);
  return response.data;
};
