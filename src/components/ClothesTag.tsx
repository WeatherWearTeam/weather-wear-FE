import ColorChip from "@components/Color/ColorChip";

import styled, { css } from "styled-components";
import getKoreanType from "@utils/getKoreanType";
import { ClothesType } from "@shared/clothesTypeList";
import { ClothesColorType } from "@shared/colorTypeList";

interface ClothesTagProps {
  color: ClothesColorType;
  type: ClothesType;
}

function ClothesTag({ color, type }: ClothesTagProps) {
  return (
    <Container>
      <ColorChip color={color} />
      <ClothesTypeText>{getKoreanType(type)}</ClothesTypeText>
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

const ClothesTypeText = styled.p`
  font-size: small;
`;
