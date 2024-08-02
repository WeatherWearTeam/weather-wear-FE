import styled from "styled-components";

interface ColorChipProps {
  color: string;
  size?: "s" | "m";
  onClick?: () => void;
}

function ColorChip({ color, size = "s", onClick }: ColorChipProps) {
  return <Color color={color} $size={size} onClick={onClick} />;
}

export default ColorChip;

interface ColorProps {
  color: string;
  $size: "s" | "m";
}

const Color = styled.div<ColorProps>`
  width: ${({ $size }) => ($size === "s" ? "1rem" : "1.5rem")};
  height: ${({ $size }) => ($size === "s" ? "1rem" : "1.5rem")};
  background-color: ${({ color, theme }) => theme.colors[color]};
  border: ${({ theme }) => theme.borders.buttonBorder};
`;
