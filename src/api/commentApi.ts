import api from "@api/api";

// POST Comment 생성
export interface CreateCommentRequest {
  boardId: number;
  contents: string;
}
// id는 서버에서 받아옴
export const createComment = async (newComment: CreateCommentRequest) => {
  const response = await api.post(
    `/api/boards/${newComment.boardId}/comments`,
    { contents: newComment.contents } //객체로..json 보내는것을 잊지 말자..^^
  );
  return response.data;
};

// DELETE Comment 지우기
export const deleteComment = async (commentId: number) => {
  await api.delete(`/api/boards/comments/${commentId}`);
};

export interface UpdatedCommentRequest {
  commentId: number;
  contents: string;
}
// PUT Comment 업데이트하기
export const updateComment = async (updatedComment: UpdatedCommentRequest) => {
  const response = await api.put(
    `/api/boards/comments/${updatedComment.commentId}`,
    { contents: updatedComment.contents }
  );
  return response.data;
};
