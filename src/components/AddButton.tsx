import styled from "styled-components";
import Icon from "./Icon";
import { plusIcon } from "@shared/icons";

interface AddButtonProps {
  onClick: () => void;
}

export default function AddButton({ onClick }: AddButtonProps) {
  return (
    <PostAddButton onClick={onClick}>
      <Icon icon={plusIcon} />
    </PostAddButton>
  );
}

const PostAddButton = styled.button`
  position: fixed;
  bottom: 3rem;
  right: 3rem;
  width: 4rem;
  height: 4rem;
  background-color: ${({ theme }) => theme.colors.black};
  border: 1px solid ${({ theme }) => theme.colors.black};
  border-radius: 50%;
  color: ${({ theme }) => theme.colors.white};
  font-size: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: background-color 0.1s linear;

  &:hover,
  &:focus {
    background-color: ${({ theme }) => theme.colors.white};
    color: ${({ theme }) => theme.colors.black};
  }
`;
