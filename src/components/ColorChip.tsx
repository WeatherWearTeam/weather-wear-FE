import { ClothesColorType } from "@store/clothesTagStore";
import styled from "styled-components";

interface ColorChipProps {
  color: ClothesColorType;
  size?: "s" | "m";
  onClick?: () => void;
}

function ColorChip({ color, size = "s", onClick }: ColorChipProps) {
  return <Color color={color} $size={size} onClick={onClick} />;
}

export default ColorChip;

interface ColorProps {
  color: ClothesColorType;
  $size: "s" | "m";
}

const Color = styled.div<ColorProps>`
  width: ${({ $size }) => ($size === "s" ? "1rem" : "1.5rem")};
  height: ${({ $size }) => ($size === "s" ? "1rem" : "1.5rem")};
  background-color: ${({ color, theme }) => theme.colors[color]};
  border: 1px solid ${({ theme }) => theme.colors.borderGray};
  transition: border 0.1s ease-out;
  cursor: pointer;

  &:hover,
  &:focus {
    border: 2px solid ${({ theme }) => theme.colors.black};
  }
`;
