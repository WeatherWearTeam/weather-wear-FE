import styled from "styled-components";
import Icon from "./Icon";
import { plusIcon } from "@shared/icons";

interface AddButtonProps {
  onClick: () => void;
}

export default function AddButton({ onClick }: AddButtonProps) {
  return (
    <BoardAddButton onClick={onClick}>
      <Icon icon={plusIcon} />
    </BoardAddButton>
  );
}

const BoardAddButton = styled.button`
  position: fixed;
  bottom: 6rem;
  right: 7.5rem;
  width: 5rem;
  height: 5rem;
  background-color: ${({ theme }) => theme.colors.BLACK};
  border: 1px solid ${({ theme }) => theme.colors.BLACK};
  border-radius: 50%;
  color: ${({ theme }) => theme.colors.WHITE};
  font-size: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: background-color 0.1s linear;

  &:hover,
  &:focus {
    background-color: ${({ theme }) => theme.colors.WHITE};
    color: ${({ theme }) => theme.colors.BLACK};
  }
`;
