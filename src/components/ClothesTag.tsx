import ColorChip from "@components/Color/ColorChip";
import { ClothesColorType, ClothesKoreanType } from "@store/clothesTagStore";
import styled, { css } from "styled-components";

interface ClothesTagProps {
  color: ClothesColorType;
  type: ClothesKoreanType;
}

function ClothesTag({ color, type }: ClothesTagProps) {
  return (
    <Container>
      <ColorChip color={color} />
      <ClothesType>{type}</ClothesType>
    </Container>
  );
}

export default ClothesTag;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 1rem;
  border-radius: 10rem;
  /* width: 9rem; */
  padding: 0.3rem 1rem;
  border: ${({ theme }) => theme.borders.buttonBorder};
  background-color: ${({ theme }) => css`
    ${theme.colors.WHITE}99; //투명도 60%
  `};
`;

const ClothesType = styled.p`
  font-size: small;
`;
