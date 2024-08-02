import ColorChip from "@components/ColorChip";
import styled from "styled-components";

interface ColorBarProps {
  size?: "s" | "m";
  onClick?: (color: string) => void;
}

function ColorBar({ size = "s", onClick }: ColorBarProps) {
  const colorBarList = [
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

  const onSelectedClick = (color: string) => {
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
