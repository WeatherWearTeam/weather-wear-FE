import styled from "styled-components";

function ColorBar() {
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
        <ColorChip key={index} color={color}></ColorChip>
      ))}
    </ColorContainer>
  );
}

export default ColorBar;

const ColorContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.3rem;
`;

const ColorChip = styled.div<{ color: string }>`
  width: 1rem;
  height: 1rem;
  background-color: ${({ color, theme }) => theme.colors[color]};
  border: ${({ theme }) => theme.borders.buttonBorder};
`;
