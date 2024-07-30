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
  background: linear-gradient(
    to top,
    #ffff,
    #ffd54f 30%,
    #ff6600 100%
  ); /* 뜨거운 날씨를 표현하는 그라디언트 */
  z-index: 1; /* 배경의 z-index 설정 */
`;

// Main component
export default function Hot() {
  return <Body />;
}
