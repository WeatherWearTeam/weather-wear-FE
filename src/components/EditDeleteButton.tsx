import Icon from "@components/Icon";
import { ellipsisIcon } from "@shared/icons";
import styled from "styled-components";
import useDropdownPosition from "@hooks/useDropdownPosition";
import useModal from "@hooks/useModal";
import ModalPortal from "@components/Modal/ModalPortal";
import DropdownLayout from "@components/Modal/DropdownLayout";
import Dropdown from "@components/Modal/Dropdown";
import { useNavigate } from "react-router-dom";

interface EditDeleteButtonProps {
  id: number;
  editPath: string;
  onMutateDelete: (id: number) => void;
}
export default function EditDeleteButton({
  id,
  editPath,
  onMutateDelete,
}: EditDeleteButtonProps) {
  const { openModal, closeModal, isVisible } = useModal();
  const { dropdownPosition, divRef } = useDropdownPosition(isVisible);
  const navigate = useNavigate();

  // 수정 클릭 했을 때 실행 되는 함수
  const handleEdit = () => {
    console.log("수정");
    navigate(editPath);
    closeModal();
  };

  //삭제 클릭 했을 때 실행되는 함수
  const handleDelete = () => {
    alert("정말 삭제하시겠습니까?");
    console.log("삭제할 boardId", id);
    onMutateDelete(id);
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
            <Dropdown onEdit={handleEdit} onDelete={handleDelete} />
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
