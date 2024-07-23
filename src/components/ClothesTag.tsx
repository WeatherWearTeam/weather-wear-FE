import ColorChip from "@components/ColorChip";
import styled from "styled-components";
interface ClothesTagProps {
  color: string;
  type: string;
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
  justify-content: center;
  align-items: center;
  gap: 1rem;
  border-radius: 10rem;
  width: 9rem;
  padding: 0.3rem 0.5rem;
  border: ${({ theme }) => theme.borders.buttonBorder};
`;

const ClothesType = styled.p`
  font-size: small;
`;
