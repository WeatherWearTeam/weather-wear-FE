import ColorChip from "@components/Color/ColorChip";
import styled from "styled-components";
import colorTypeList, { ClothesColorType } from "@shared/colorTypeList";

interface ColorBarProps {
  size?: "s" | "m";
  onClick?: (color: ClothesColorType) => void;
  selectedColor?: ClothesColorType;
}

function ColorBar({ size = "s", onClick, selectedColor }: ColorBarProps) {
  const onSelectedClick = (color: ClothesColorType) => {
    onClick && onClick(color);
  };

  return (
    <ColorContainer>
      {colorTypeList.map((color, index) => (
        <ColorChip
          key={index}
          color={color}
          size={size}
          isSelected={color === selectedColor} // 선택된 색상 여부를 전달
          onClick={() => onSelectedClick(color)}
        />
      ))}
    </ColorContainer>
  );
}

export default ColorBar;

const ColorContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
`;
