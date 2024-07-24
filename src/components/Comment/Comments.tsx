import CommentForm from "@components/Comment/CommentForm";
import CommentList from "@components/Comment/CommentList";
import styled from "styled-components";

//✅ 데이터 연결시 타입 확인 필요
export interface Comment_like {
  id: string;
  user_id: string;
  comment_id: string;
}

//✅ 데이터 연결시 타입 확인 필요
export interface Comment extends Comment_like {
  id: string;
  user_id: string;
  board_id: string;
  regist_date: string;
  update_date: string;
  contents: string;
  comment_like: Comment_like[];
}

interface CommentsProps {
  board_id: string;
  user_id: string;
}

export default function Comments({ board_id, user_id }: CommentsProps) {
  // const { createComment, isPending, isError } = useCreateComment();

  // const onCreateComment = (newComment: Omit<Comment, "id">) => {
  //   createComment(newComment);
  // };

  return (
    <>
      <CommentsContainer>
        {/*  */}
        <CommentListWrapper>
          <CommentList board_id={board_id} />
        </CommentListWrapper>
        {/*  */}
        <CommentForm
          user_id={user_id}
          board_id={board_id}
          formId={"createCommentForm"}
          // isPending={isPending}
          // isError={isError}
          // onCreateComment={onCreateComment}
        />
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
