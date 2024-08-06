
import { ClothesColorType } from "@store/clothesTagStore";
import ColorChip from "@components/ColorChip";
import styled from "styled-components";

interface ColorBarProps {
  size?: "s" | "m";
  onClick?: (color: ClothesColorType) => void;
  selectedColor?: ClothesColorType;
}

function ColorBar({ size = "s", onClick, selectedColor }: ColorBarProps) {
  const colorBarList: ClothesColorType[] = [
    "white",
    "gray",
    "black",
    "red",
    "yellow",
    "sand",
    "beige",
    "brown",
    "khaki",
    "green",
    "cyan",
    "blue",
    "indigo",
    "purple",
    "pink",
  ];

  const onSelectedClick = (color: ClothesColorType) => {
    onClick && onClick(color);
  };
  
  return (
    <ColorContainer>
      {colorBarList.map((color, index) => (
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
