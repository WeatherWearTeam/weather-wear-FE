// import { useAppDispatch, useAppSelector } from "@/hooks/rtkHooks";
// import AlertText from "@components/AlertText";
import Button from "@components/Button";
import { Comment } from "@components/Comment/Comments";
// import { clearAlert, setAlert } from "@redux/slices/alertSlice";
import { useEffect, useState } from "react";
import styled from "styled-components";

interface CommentForm {
  user_id: string;
  board_id: string;
  commentId?: string;
  preComment?: string;
  isEditing?: boolean;
  onEditEnd?: () => void;
  formId: string;
  // isPending: boolean;
  // isError: boolean;
  onCreateComment?: (newComment: Omit<Comment, "id">) => void;
  onEditComment?: (updatedComment: Comment) => void;
}
export default function CommentForm(
  { user_id }: board_id,
  commentId,
  preComment,
  isEditing,
  onEditEnd,
  formId,
  // isPending,
  // isError,
  onCreateComment,
  onEditComment,
  CommentForm
) {
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
      return console.log("댓글을 1글자 이상 입력해 주세요!");
    }

    // const newComment: Omit<Comment, "id"> = {
    //   user_id,
    //   board_id,
    //   comment,
    // };

    if (!isEditing) {
      console.log("새로운 댓글 생성 비동기 처리");
      // onCreateComment?.(newComment);
    } else {
      console.log("기존 댓글 수정 비동기 처리");

      //   //업데이트
      //   const updatedComment = {
      //     id: commentId!,
      //     user_id,
      //     board_id,
      //     comment,
      //   };
      //   onEditComment?.(updatedComment);
      onEditEnd!(); // 그러고 나서 에디팅 종료 함수 실행
      // }

      setComment("");
    }
  };

  useEffect(() => {
    if (isEditing && preComment) {
      setComment(preComment);
    }
  }, [isEditing, preComment]);

  return (
    <Form onSubmit={handleSubmit}>
      <Avatar>{/* <AvatarImg alt={`avatar`} /> */}</Avatar>

      <FormContainer>
        <TextareaWrapper>
          <Textarea
            onChange={changeComment}
            value={comment}
            placeholder="댓글을 입력하세요. (최대 200글자)"
            maxLength={200}
            minLength={1}
          />
          {/* <AlertText>{alertMessage}</AlertText>
          {isError && (
            <AlertText>{"오류가 발생했습니다. 다시 시도해 주세요!"}</AlertText>
          )} */}
          <UserIdText>{user_id}</UserIdText>
        </TextareaWrapper>
        <ButtonWrapper>
          <Button
            type="submit"
            //  disabled={isPending}
          >
            등록
          </Button>
          {isEditing ? (
            <Button
              type="button"
              onClick={onEditEnd}
              // disabled={isPending}
            >
              취소
            </Button>
          ) : null}
        </ButtonWrapper>
      </FormContainer>
    </Form>
  );
}

export const Form = styled.form`
  display: flex;
  flex-direction: row;
  width: 100%;
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
  border: 1px solid ${({ theme }) => theme.colors.gray};
  resize: none;
  outline: none;
  &:hover,
  &:focus,
  &:focus-visible {
    border: 1px solid ${({ theme }) => theme.colors.black};
  }
`;

export const UserIdText = styled.span`
  position: absolute;
  font-weight: 600;
  font-size: small;
  left: 1rem;
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
