import { ClothesColorType } from "@store/clothesTagStore";
import ColorChip from "@components/ColorChip";
import styled from "styled-components";

interface ColorBarProps {
  size?: "s" | "m";
  onClick?: (color: ClothesColorType) => void;
}

function ColorBar({ size = "s", onClick }: ColorBarProps) {
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
          onClick={() => onSelectedClick(color)}
        ></ColorChip>
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
