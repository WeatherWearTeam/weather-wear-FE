// import useEditComment from "@/hooks/useEditComment";
// import useUser from "@/hooks/useUser";
import CommentForm from "@components/Comment/CommentForm";
import { Comment } from "@components/Comment/Comments";
import EditIcon from "@components/EditIcon";

interface CommentItemProps {
  id: string;
  board_id: string;
  user_id: string;
  contents: string;
  isEditing: boolean;
  onEditStart: () => void;
  onEditEnd: () => void;
}
export default function CommentItem({
  id,
  board_id,
  user_id,
  contents,
  isEditing,
  onEditStart,
  onEditEnd,
}: CommentItemProps) {
  // const { id: myId } = useUser();
  // const { editMutate, isPending, isError } = useEditComment();

  const onEditComment = (updatedComment: Comment) => {
    // editMutate(updatedComment);
    console.log("댓글 수정 비동기 요청 보내기");
  };

  return (
    <>
      {!isEditing && (
        <CommentContainer>
          <Avatar>{/* <AvatarImg alt={`avatar`} /> */}</Avatar>
          <TextContainer>
            <TextareaWrapper>
              <TextUserId>
                {user_id} · {`1시간 전`}
              </TextUserId>
              <TextContent>{contents}</TextContent>
            </TextareaWrapper>
          </TextContainer>
          {/* {user_id === myId && ( */}
          <EditIcon onEditStart={onEditStart} commentId={id} />
          {/* )} */}
          {/* 모달 메뉴 열고 수정 선택해야 에디팅 시작하기 때문에 더 내려주기 */}
        </CommentContainer>
      )}
      {isEditing && (
        <CommentContainer>
          <CommentForm
            user_id={user_id}
            board_id={board_id}
            id={id}
            preComment={contents}
            formId={"editCommentForm"}
            onEditComment={onEditComment}
            isEditing={isEditing}
            onEditEnd={onEditEnd}
            // isPending={isPending}
            // isError={isError}
          />
        </CommentContainer>
      )}
    </>
  );
}

import styled from "styled-components";

export const CommentContainer = styled.div`
  font-size: small;
  display: flex;
  flex-direction: row;
  padding: 1.5rem 0;
  /* border-bottom: ${({ theme }) => theme.borders.containerBorder}; */
`;

export const Avatar = styled.div`
  position: absolute;
  margin-right: 1rem;
  box-sizing: border-box;
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.gray};
`;

export const AvatarImg = styled.img`
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  object-fit: cover;
`;

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
