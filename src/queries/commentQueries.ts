import { getCommentsByBoardId } from "@api/boardApi";
import { createComment, deleteComment, updateComment } from "@api/commentApi";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

export interface CommentUser {
  id: number;
  nickname: string;
  image: string;
}

export interface Comment {
  id: number;
  user: CommentUser;
  boardId: number;
  createdAt: Date | string;
  updatedAt: Date | string;
  contents: string;
  commentsLike: boolean;
}

//////////////////////////////////////////////////

// interface useCommentsByBoardIdResult {
//   comments: Comment[] | undefined;
//   isPendingComments: boolean;
//   isErrorComments: boolean;
//   isSuccessComments: boolean;
// }

export const useCommentsByBoardId = (boardId: number) => {
  const {
    data: comments,
    isPending: isPendingComments,
    isError: isErrorComments,
    isSuccess: isSuccessComments,
  } = useQuery<Comment[]>({
    queryKey: ["comments", boardId], //댓글 리스트, 하나의 보드가 가지는 댓글 리스트인 경우
    queryFn: () => getCommentsByBoardId(boardId),
    enabled: !!boardId, // id가 있을 때만 쿼리를 실행
  });

  return { comments, isPendingComments, isErrorComments, isSuccessComments };
};

//////////////////////////////////////////////////////////////
//댓글 생성
export const useCreateComment = () => {
  const queryClient = useQueryClient();

  const {
    mutate: mutateCreateComment,
    isPending,
    isError,
    isSuccess,
  } = useMutation({
    mutationFn: createComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments"] });
    },
    onError: (error: AxiosError) => {
      return error;
    },
  });

  return { mutateCreateComment, isPending, isError, isSuccess };
};

//////////////////////////////////////////////////////////////

export const useDeleteComment = () => {
  const queryClient = useQueryClient();

  const {
    mutate: mutateDeleteComment,
    isPending,
    isError,
    isSuccess,
  } = useMutation({
    mutationFn: deleteComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments"] });
    },
    onError: (error: AxiosError) => {
      return error;
    },
  });

  return { mutateDeleteComment, isPending, isError, isSuccess };
};

//////////////////////////////////////////////////////////////

export const useUpdateComment = () => {
  const queryClient = useQueryClient();

  const {
    mutate: mutateUpdateComment,
    isPending,
    isError,
    isSuccess,
  } = useMutation({
    mutationFn: updateComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments"] }); // 댓글 수정 > 댓글 하나만 겟하는게 없으므로 전체 리스트
    },
    onError: (error: AxiosError) => {
      return error;
    },
  });

  return { mutateUpdateComment, isPending, isError, isSuccess };
};
