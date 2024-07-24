import ColorBar from "@components/ColorBar";
import styled from "styled-components";

export default function ColorPickBar() {
  return (
    <Container>
      색상
      <ColorBar size="m" />
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
