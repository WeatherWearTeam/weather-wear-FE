import CommentForm from "@components/Comment/CommentForm";
import CommentList from "@components/Comment/CommentList";
import {
  useCommentsByBoardId,
  useCreateComment,
} from "@queries/commentQueries";
import useAuth from "@queries/useAuth";
import { useMe } from "@queries/userQueries";
import styled from "styled-components";

interface CommentsProps {
  boardId: number;
}

export default function Comments({ boardId }: CommentsProps) {
  const {
    mutateCreateComment,
    isPending,
    isError,
    //  isSuccess
  } = useCreateComment();

  //comment 생성
  const handleCreateComment = (newComment: {
    boardId: number;
    contents: string;
  }) => {
    mutateCreateComment(newComment);
  };

  //////////🌈🌈🌈이거 셋 병렬처리 ////////////////////////////////////////////////////////////////
  //boardId 별 comments 조회
  const {
    comments,
    //  isErrorComments,
    //   isPendingComments,
    isSuccessComments,
  } = useCommentsByBoardId(boardId);

  const { isLoggedIn } = useAuth();
  const { me } = useMe(isLoggedIn);

  return (
    <>
      <CommentsContainer>
        <CommentListWrapper>
          <CommentList
            myId={me?.id as number}
            boardId={boardId}
            comments={comments!}
            isSuccessComments={isSuccessComments}
          />
        </CommentListWrapper>
        {isLoggedIn && (
          <CommentForm
            myId={me?.id as number}
            myImage={me?.image as string}
            myNickname={me?.nickname as string}
            boardId={boardId}
            formId={"createCommentForm"}
            isPending={isPending}
            isError={isError}
            onCreateComment={handleCreateComment}
          />
        )}
      </CommentsContainer>
    </>
  );
}

export const CommentsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 2rem;
`;

export const CommentListWrapper = styled.div`
  margin-bottom: 2rem;
`;
