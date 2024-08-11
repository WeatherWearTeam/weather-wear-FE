import styled from "styled-components";

// Styled components
const Body = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  margin: 0;
  overflow: hidden;
  background: linear-gradient(to top, #ffffff 0%, #d6f2ff 15%, #a1c4fd 100%);

  z-index: 1; /* 배경의 z-index 설정 */
`;

// Main component
export default function Sunny() {
  return <Body />;
}
