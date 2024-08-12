import Icon from "@components/Icon";
import { ellipsisIcon } from "@shared/icons";
import styled from "styled-components";
import useDropdownPosition from "@hooks/useDropdownPosition";
import useModal from "@hooks/useModal";
import ModalPortal from "@components/Modal/ModalPortal";
import DropdownLayout from "@components/Modal/DropdownLayout";
import Dropdown from "@components/Modal/Dropdown";
import { useDeleteComment } from "@queries/commentQueries";
// import useDeleteComment from "@hooks/useDeleteComment";

interface CommentEditIconProps {
  onEditStart: () => void;
  commentId: number;
}
export default function CommentEditIcon({
  onEditStart,
  commentId,
}: CommentEditIconProps) {
  const { openModal, closeModal, isVisible } = useModal();
  const { dropdownPosition, divRef } = useDropdownPosition(isVisible);

  const { mutateDeleteComment } = useDeleteComment();

  // //모달 열고 난 뒤 수정/삭제 클릭 했을 때 실행 되는 함수
  const handleEditComment = () => {
    onEditStart(); //모달 메뉴 중 수정 클럭 시 에디팅 시작
    closeModal(); //그리고 메뉴 모달은 꺼짐
  };

  const handleDeleteComment = (id: number) => {
    mutateDeleteComment(id);
    alert("정말 삭제하시겠습니까?");
    closeModal();
  };

  return (
    <Wrapper>
      <StEditIcon onClick={openModal} ref={divRef}>
        <Icon icon={ellipsisIcon} />
      </StEditIcon>
      {isVisible && (
        <ModalPortal>
          <DropdownLayout
            onClose={closeModal}
            dropdownPosition={{ ...dropdownPosition }}
          >
            <Dropdown
              onEdit={handleEditComment}
              onDelete={() => handleDeleteComment(commentId)}
            />
          </DropdownLayout>
        </ModalPortal>
      )}
    </Wrapper>
  );
}

export const Wrapper = styled.div`
  /* position: absolute; */
  /* right: 0; */
  /* top: 1rem; */
  width: 2rem;
  height: 2rem;
`;
export const StEditIcon = styled.div`
  position: relative;
  right: 0;
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  transition: background-color 0.25s;
  cursor: pointer;

  &:hover,
  &:focus,
  &:focus-visible {
    background-color: ${({ theme }) => theme.colors.borderLightGray};
  }
`;
