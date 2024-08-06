
import { ClothesColorType } from "@store/clothesTagStore";
import styled from "styled-components";

interface ColorChipProps {
  color: ClothesColorType;
  size?: "s" | "m";
  isSelected?: boolean; // 선택 여부를 나타내는 prop 추가
  onClick?: () => void;
}

function ColorChip({ color, size = "s", isSelected, onClick }: ColorChipProps) {
  return <Color color={color} $size={size} isSelected={isSelected} onClick={onClick} />;
}

export default ColorChip;

interface ColorProps {
  color: ClothesColorType;
  $size: "s" | "m";
  isSelected?: boolean; // 선택 여부를 나타내는 prop 추가
}

const Color = styled.div<ColorProps>`
  width: ${({ $size }) => ($size === "s" ? "1rem" : "1.5rem")};
  height: ${({ $size }) => ($size === "s" ? "1rem" : "1.5rem")};
  background-color: ${({ color }) => color};
  border: 1px solid ${({ theme }) => theme.colors.borderGray};
  transition: border 0.1s ease-out;
  cursor: pointer;

  // 선택된 색상에 대한 스타일 추가
  ${({ isSelected, theme }) =>
    isSelected &&
    `
      border: 2px solid ${theme.colors.black};
    `}

  &:hover,
  &:focus {
    border: 2px solid ${({ theme }) => theme.colors.black};
  }
`;
