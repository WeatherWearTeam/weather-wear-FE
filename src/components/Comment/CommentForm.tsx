// import { useAppDispatch, useAppSelector } from "@hooks/rtkHooks";
// import AlertText from "@components/AlertText";
import { CreateCommentRequest, UpdatedCommentRequest } from "@api/commentApi";
import Avatar from "@components/Avatar";
import Button from "@components/Button";
import { Comment } from "@queries/commentQueries";
// import { clearAlert, setAlert } from "@redux/slices/alertSlice";
import { useEffect, useState } from "react";
import styled from "styled-components";

interface CommentFormProps {
  myId: number;
  myImage: string;
  myNickname: string;
  boardId: number;
  onCreateComment?: (newComment: CreateCommentRequest) => void;
  ///////data///////////
  commentId?: number;
  preComment?: string;
  isEditing?: boolean;
  onEditEnd?: () => void;
  onEditComment?: (updatedComment: UpdatedCommentRequest) => void;
  /////////////////////
  formId: string;
  isPending: boolean;
  isError: boolean;
  /////////////////////
}

const CommentForm: React.FC<CommentFormProps> = ({
  // { myId }: boardId,
  myId,
  myImage,
  myNickname,
  boardId,
  onCreateComment,
  commentId,
  preComment,
  isEditing,
  onEditEnd,
  onEditComment,
  formId,
  isPending,
  isError,
}) => {
  // console.log(image);
  // const dispatch = useAppDispatch();
  // const alertMessage = useAppSelector((state) => state.alert[formId]);

  const [comment, setComment] = useState("");

  const changeComment = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    // if (alertMessage) {
    //   dispatch(clearAlert(formId));
    // }

    setComment(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log("댓글 작성");

    if (!comment.trim()) {
      //   dispatch(
      //     setAlert({
      //       formId: formId,
      //       message: "댓글을 1글자 이상 적어 주세요.",
      //     })
      //   );
      //   return;
      return alert("댓글을 한 글자 이상 입력해 주세요!");
    }

    const newComment = {
      boardId,
      contents: comment,
    };

    if (!isEditing) {
      console.log("새로운 댓글 생성 비동기 처리");
      console.log(newComment);
      onCreateComment?.(newComment);
    } else {
      console.log("기존 댓글 수정 비동기 처리");
      //업데이트
      const updatedComment = {
        commentId: commentId!,
        contents: comment,
      };
      console.log(updatedComment);
      onEditComment?.(updatedComment);
      onEditEnd!(); // 그러고 나서 에디팅 종료 함수 실행
    }

    setComment("");
  };
  // };

  useEffect(() => {
    if (isEditing && preComment) {
      setComment(preComment);
    }
  }, [isEditing, preComment]);

  return (
    <Form onSubmit={handleSubmit}>
      <AvatarWrapper>
        {myImage ? <Avatar image={myImage} size="m" /> : null}
      </AvatarWrapper>

      <FormContainer>
        <TextareaWrapper>
          <Textarea
            onChange={changeComment}
            value={comment}
            placeholder="댓글을 입력하세요. (최대 200글자)"
            maxLength={200}
            minLength={1}
          />
          {/* <AlertText>{alertMessage}</AlertText> */}
          {/* {isError && (
            <AlertText>{"오류가 발생했습니다. 다시 시도해 주세요!"}</AlertText>
          )} */}
          <UserIdText>{myNickname}</UserIdText>
        </TextareaWrapper>
        <ButtonWrapper>
          <Button type="submit" disabled={isPending}>
            등록
          </Button>
          {isEditing ? (
            <Button
              type="button"
              buttonType="secondary"
              onClick={onEditEnd}
              disabled={isPending}
            >
              취소
            </Button>
          ) : null}
        </ButtonWrapper>
      </FormContainer>
    </Form>
  );
};

export default CommentForm;

export const Form = styled.form`
  display: flex;
  flex-direction: row;
  width: 100%;
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

export const FormContainer = styled.div`
  margin-left: 5rem;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  width: 100%;
  gap: 1rem;
  box-sizing: border-box;

  button {
    max-width: 5rem;
  }
`;

export const TextareaWrapper = styled.div`
  width: 100%;
  position: relative;
`;

export const Textarea = styled.textarea`
  width: 100%;
  /* height: 7rem; */
  overflow: hidden;
  height: 100%;
  padding: 3rem 1rem;
  border: 1px solid ${({ theme }) => theme.colors.GRAY};
  resize: none;
  outline: none;
  &:hover,
  &:focus,
  &:focus-visible {
    border: 1px solid ${({ theme }) => theme.colors.BLACK};
  }
`;

export const UserIdText = styled.span`
  position: absolute;
  font-weight: 600;
  font-size: small;
  left: 1.2rem;
  top: 1rem;
`;

export const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  /* justify-content: space-between; */
  gap: 1rem;
  button {
    width: 100%;
  }
`;
