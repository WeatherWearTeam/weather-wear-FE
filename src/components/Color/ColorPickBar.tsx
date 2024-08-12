import ColorBar from "@components/Color/ColorBar";
import { ClothesColorType } from "@shared/colorTypeList";
import styled from "styled-components";

interface ColorPickBarProps {
  onClick?: (color: ClothesColorType) => void;
  selectedColor: ClothesColorType | null;
}

export default function ColorPickBar({
  onClick,
  selectedColor,
}: ColorPickBarProps) {
  return (
    <Container>
      색상
      <ColorBar size="m" onClick={onClick} selectedColor={selectedColor} />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 5rem;
  outline: none;
  font-size: small;
  padding: 1.5rem 1.5rem;
  border: ${({ theme }) => theme.borders.containerBorder};
`;
