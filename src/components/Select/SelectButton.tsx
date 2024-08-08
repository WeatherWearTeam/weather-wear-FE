import Icon from "@components/Icon";
import { arrowDownIcon } from "@shared/icons";
import styled from "styled-components";

interface SelectButtonProps {
  openModal: () => void;
  selectedOption: string;
  divRef?: React.RefObject<HTMLDivElement>;
}

export default function SelectButton({
  openModal,
  divRef,
  selectedOption,
}: SelectButtonProps) {
  return (
    <StSelectButton onClick={openModal} ref={divRef}>
      {selectedOption}
      {arrowDownIcon}
    </StSelectButton>
  );
}

const StSelectButton = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 5rem;
  outline: none;
  font-size: small;
  padding: 1.5rem 1.5rem;
  border: ${({ theme }) => theme.borders.containerBorder};
  transition: border linear 0.25s;

  &:hover,
  &:focus {
    border: 1px solid ${({ theme }) => theme.colors.BLACK};
  }

  svg {
    width: 2rem;
    height: 2rem;
    transition: transform linear 0.25s;

    &:hover,
    &:focus {
      transform: rotate(180deg);
    }
  }
`;
