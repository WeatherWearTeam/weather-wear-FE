interface DropdownProps {
  onDelete: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  onEdit: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

export default function Dropdown({ onDelete, onEdit }: DropdownProps) {
  return (
    <>
      <DropdownContentWrapper>
        <DropdownOptionList>
          <DropdownItem onClick={onEdit}>수정</DropdownItem>
          <DropdownItem onClick={onDelete}>삭제</DropdownItem>
        </DropdownOptionList>
      </DropdownContentWrapper>
    </>
  );
}

import styled from "styled-components";

export const DropdownContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const DropdownOptionList = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  background-color: white;
  border: ${({ theme }) => theme.borders.containerBorder};
  box-shadow: 0px 0px 5px ${({ theme }) => theme.colors.borderLightGray};
  min-width: 5rem;
  border-radius: 8px;
  cursor: pointer;
`;

export const DropdownItem = styled.div`
  width: 100%;
  padding: 0.5rem;
  font-size: small;

  &:hover {
    background-color: ${({ theme }) => theme.colors.borderLightGray};
  }

  &:first-child {
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
  }

  &:last-child {
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
  }
`;
