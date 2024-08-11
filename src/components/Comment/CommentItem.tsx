// import useEditComment from "@hooks/useEditComment";
// import useUser from "@hooks/useUser";
import { getTimesAgo } from "@utils/getTime";
import CommentForm from "@components/Comment/CommentForm";
import { Comment, useUpdateComment } from "@queries/commentQueries";

interface CommentItemProps {
  comment: Comment;
  isEditing: boolean;
  onEditStart: () => void;
  onEditEnd: () => void;
  myId: number;
}
export default function CommentItem({
  comment,
  isEditing,
  onEditStart,
  onEditEnd,
  myId,
}: CommentItemProps) {
  // const { id: myId } = useUser();
  const { mutateUpdateComment, isPending, isError, isSuccess } =
    useUpdateComment();

  const handleEditComment = (updatedComment: UpdatedCommentRequest) => {
    mutateUpdateComment(updatedComment);
    console.log("댓글 수정 비동기 요청 보내기");
  };

  return (
    <>
      {!isEditing && (
        <CommentContainer>
          <AvatarWrapper>
            <Avatar image={comment.user.image} size="m" />
          </AvatarWrapper>
          <TextContainer>
            <TextareaWrapper>
              <TextUserId>
                {comment.user.nickname} · {getTimesAgo(comment.createdAt)}
              </TextUserId>
              <TextContent>{comment.contents}</TextContent>
            </TextareaWrapper>
          </TextContainer>
          {comment.user.id === myId && (
            <CommentEditIcon onEditStart={onEditStart} commentId={comment.id} />
          )}
          {/* 모달 메뉴 열고 수정 선택해야 에디팅 시작하기 때문에 더 내려주기 */}
        </CommentContainer>
      )}
      {isEditing && (
        <CommentContainer>
          <CommentForm
            myId={comment.user.id}
            myImage={comment.user.image as string}
            myNickname={comment.user.nickname as string}
            boardId={comment.boardId}
            /////////////////////////////////
            formId={"editCommentForm"}
            isPending={isPending}
            isError={isError}
            commentId={comment.id}
            /////////////////////////////////
            onEditComment={handleEditComment}
            preComment={comment.contents} //기존 댓글
            /////////////////////////////////
            isEditing={isEditing}
            onEditEnd={onEditEnd}
          />
        </CommentContainer>
      )}
    </>
  );
}

import styled from "styled-components";
import Avatar from "@components/Avatar";
import { UpdatedCommentRequest } from "@api/commentApi";
import CommentEditIcon from "@components/Comment/CommentEditIcon";

export const CommentContainer = styled.div`
  font-size: small;
  display: flex;
  flex-direction: row;
  padding: 1.5rem 0;
  /* border-bottom: ${({ theme }) => theme.borders.containerBorder}; */
`;

export const AvatarWrapper = styled.div`
  position: absolute;
  margin-right: 1rem;
  box-sizing: border-box;
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.GRAY};
`;

// export const AvatarImg = styled.img`
//   width: 4rem;
//   height: 4rem;
//   border-radius: 50%;
//   object-fit: cover;
// `;

export const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-left: 5rem;
  width: 100%;
  gap: 1rem;
  box-sizing: border-box;

  button {
    max-width: 5rem;
  }
`;

export const TextareaWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;
export const TextUserId = styled.span`
  font-size: small;
`;

export const TextContent = styled.div`
  font-size: small;
  white-space: pre-line;
`;
