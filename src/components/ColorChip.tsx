import styled from "styled-components";

interface ColorChipProps {
  color: string;
}

function ColorChip({ color }: ColorChipProps) {
  return <Color color={color} />;
}

export default ColorChip;

const Color = styled.div<{ color: string }>`
  width: 1rem;
  height: 1rem;
  background-color: ${({ color, theme }) => theme.colors[color]};
  border: ${({ theme }) => theme.borders.buttonBorder};
`;
