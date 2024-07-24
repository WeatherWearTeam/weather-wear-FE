import ColorChip from "@components/ColorChip";
import styled from "styled-components";

interface ColorBarProps {
  size?: "s" | "m";
}

function ColorBar({ size = "s" }: ColorBarProps) {
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
  return (
    <ColorContainer>
      {colorBarList.map((color, index) => (
        <ColorChip key={index} color={color} size={size}></ColorChip>
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
